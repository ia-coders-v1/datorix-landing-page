// Shared by the onboarding request form (client) and documented against
// public/api/onboarding.php, which re-validates everything server-side.

export const ONBOARDING_ENDPOINT = "/api/onboarding.php";

export const DATABASE_OPTIONS = ["Oracle", "MySQL", "PostgreSQL", "SQL Server", "ClickHouse", "Other"] as const;

export type OnboardingRequestInput = {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  databases: string[];
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof OnboardingRequestInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateOnboardingRequest(v: OnboardingRequestInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = v.name.trim();
  const company = v.company.trim();
  const jobTitle = v.jobTitle.trim();
  const email = v.email.trim();

  if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";

  if (!EMAIL_RE.test(email) || email.length > 254) errors.email = "Enter a valid work email address.";

  if (company.length < 2) errors.company = "Enter your company name.";
  else if (company.length > 120) errors.company = "Keep the company name under 120 characters.";

  if (jobTitle.length < 2) errors.jobTitle = "Enter your job title.";
  else if (jobTitle.length > 100) errors.jobTitle = "Keep the job title under 100 characters.";

  if (v.message.length > 2000) errors.message = "Keep your message under 2000 characters.";

  if (!v.consent) errors.consent = "Please confirm you agree to us contacting you about your request.";

  return errors;
}
