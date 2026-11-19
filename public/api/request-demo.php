<?php
// Demo request handler. Deployed to cPanel with the static site (see .github/workflows/deploy.yml).
// Emails the submission to the Sales inbox using the server's own mail transport (no password needed).
// Nothing is stored in a database. Rate-limit data is a hashed IP in a temp file that expires in an hour.
// Field rules mirror src/lib/demo-request.ts; keep them in step.

declare(strict_types=1);

const MAIL_TO = 'sales@datorix.ai';
const MAIL_FROM = 'demo@datorix.ai';
const ALLOWED_ORIGINS = ['https://datorix.ai', 'https://www.datorix.ai'];
const DATABASE_OPTIONS = ['Oracle', 'MySQL', 'PostgreSQL', 'SQL Server', 'ClickHouse', 'Other'];
const RATE_LIMIT = 5;          // submissions
const RATE_WINDOW = 3600;      // per this many seconds, per IP
const MIN_FILL_MS = 2000;      // faster than this is a bot

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function oneLine(mixed $value, int $max): string
{
    $s = is_string($value) ? $value : '';
    $s = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

function multiLine(mixed $value, int $max): string
{
    $s = is_string($value) ? $value : '';
    $s = str_replace("\r\n", "\n", $s);
    $s = preg_replace('/[^\P{C}\n]+/u', '', $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

function rateLimited(string $ip): bool
{
    $file = sys_get_temp_dir() . '/datorix-demo-' . hash('sha256', $ip) . '.json';
    $now = time();
    $fh = @fopen($file, 'c+');
    if ($fh === false) {
        return false; // fail open: never lose a lead because the temp dir is unwritable
    }
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $hits = array_values(array_filter(
        is_string($raw) && $raw !== '' ? (json_decode($raw, true) ?: []) : [],
        static fn($t) => is_int($t) && $t > $now - RATE_WINDOW
    ));
    $limited = count($hits) >= RATE_LIMIT;
    if (!$limited) {
        $hits[] = $now;
    }
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);
    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false]);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    respond(403, ['ok' => false]);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($data)) {
    respond(400, ['ok' => false]);
}

// Bots fill the hidden field. Pretend success so they learn nothing.
if (oneLine($data['website'] ?? '', 200) !== '') {
    respond(200, ['ok' => true]);
}

$elapsed = $data['elapsedMs'] ?? null;
if (!is_numeric($elapsed) || (float)$elapsed < MIN_FILL_MS) {
    respond(400, ['ok' => false]);
}

$name = oneLine($data['name'] ?? '', 100);
$email = oneLine($data['email'] ?? '', 254);
$company = oneLine($data['company'] ?? '', 120);
$jobTitle = oneLine($data['jobTitle'] ?? '', 100);
$message = multiLine($data['message'] ?? '', 2000);
$policyVersion = oneLine($data['policyVersion'] ?? '', 20);
$consent = ($data['consent'] ?? false) === true;

$databases = [];
if (is_array($data['databases'] ?? null)) {
    foreach ($data['databases'] as $db) {
        if (is_string($db) && in_array($db, DATABASE_OPTIONS, true) && !in_array($db, $databases, true)) {
            $databases[] = $db;
        }
    }
}

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Enter your full name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Enter a valid work email address.';
if (mb_strlen($company) < 2) $errors['company'] = 'Enter your company name.';
if (mb_strlen($jobTitle) < 2) $errors['jobTitle'] = 'Enter your job title.';
if (!$consent) $errors['consent'] = 'Please confirm you agree to us contacting you about your request.';
if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (rateLimited($ip)) {
    respond(429, ['ok' => false]);
}

$subject = mb_encode_mimeheader("[Demo request] {$name}, {$company}", 'UTF-8', 'B', "\r\n");
$replyName = mb_encode_mimeheader(str_replace(['"', '\\'], '', $name), 'UTF-8', 'B', "\r\n");

$body = implode("\n", [
    'New demo request from the Datorix website.',
    '',
    "Name:       {$name}",
    "Email:      {$email}",
    "Company:    {$company}",
    "Job title:  {$jobTitle}",
    'Databases:  ' . ($databases ? implode(', ', $databases) : 'not stated'),
    '',
    'Message:',
    $message !== '' ? $message : '(none)',
    '',
    '--',
    'Consent: given by the prospect on ' . gmdate('Y-m-d H:i') . ' UTC to be contacted about this request.',
    'Privacy Policy version accepted: ' . ($policyVersion !== '' ? $policyVersion : 'unknown'),
    'Delete this email after 12 months, as stated in the Privacy Policy.',
    '',
]);

$headers = [
    'From' => 'Datorix Website <' . MAIL_FROM . '>',
    'Reply-To' => "{$replyName} <{$email}>",
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
    'X-Mailer' => 'Datorix website',
];

$sent = mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);
if (!$sent) {
    error_log('Datorix demo request: mail() failed');
    respond(500, ['ok' => false]);
}

respond(200, ['ok' => true]);
