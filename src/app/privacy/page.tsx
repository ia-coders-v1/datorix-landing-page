import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import {
  LEGAL_NAME,
  LEGAL_ADDRESS,
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_POLICY_VERSION,
  RETENTION_MONTHS,
  SALES_EMAIL,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Datorix collects, uses and protects the personal data you share when you request onboarding.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={PRIVACY_POLICY_VERSION}>
      <p>
        This policy explains what personal data {LEGAL_NAME} (&quot;Datorix&quot;, &quot;we&quot;) collects through
        datorix.ai, why we collect it, and the choices you have. It applies to visitors in the Asia-Pacific region and
        elsewhere, and we aim to meet the data protection laws that apply to us in the places we operate and serve.
      </p>

      <h2>Who is responsible for your data</h2>
      <p>
        {LEGAL_NAME}, {LEGAL_ADDRESS}. Questions about this policy or your data go to{" "}
        <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>.
      </p>

      <h2>What we collect</h2>
      <p>When you submit the onboarding request form, you give us:</p>
      <ul>
        <li>your full name, work email address, company and job title;</li>
        <li>optionally, the databases you use and a free-text message;</li>
        <li>the date and time you agreed to this policy, and the policy version you agreed to.</li>
      </ul>
      <p>
        To stop abuse, our server briefly processes your IP address. We keep only a one-way hash of it, for at most one
        hour, to limit how often the form can be submitted. We do not store the address itself.
      </p>
      <p>
        We do not use advertising or analytics cookies on this website, and we do not ask for sensitive personal data.
        Please do not include any in the message field.
      </p>

      <h2>Why we use it, and our basis</h2>
      <ul>
        <li>
          <strong>To respond to your onboarding request</strong> and arrange your onboarding. Basis: your consent, given by ticking
          the box on the form, and our need to act on your request.
        </li>
        <li>
          <strong>To prevent spam and abuse of the form.</strong> Basis: our legitimate interest in keeping the website
          secure.
        </li>
      </ul>
      <p>
        We use your details only for these purposes. We do not sell them, and we do not send you marketing
        email unless you separately ask for it.
      </p>

      <h2>Who receives it</h2>
      <p>
        Your request is sent by email to our sales team at {SALES_EMAIL}. It is not stored in any other system. Our
        website and email are hosted with a hosting provider that processes data on our behalf under its own security
        commitments. We disclose personal data to others only where the law requires it.
      </p>

      <h2>Transfers across borders</h2>
      <p>
        Datorix and its providers may handle your data in countries other than your own, including Malaysia and
        Bangladesh. Where we do, we take reasonable steps so that your data stays protected to the standard this policy
        describes.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep an onboarding request for up to {RETENTION_MONTHS} months after you send it, then delete it. If you become a
        customer, the details we hold for the contract are covered by our agreement with you and applicable law.
      </p>

      <h2>Security</h2>
      <p>
        The form is sent over an encrypted connection, access to the sales mailbox is limited to the team members who
        answer requests, and we collect only the fields needed to reply. No online service is perfectly secure, so we
        cannot guarantee absolute security.
      </p>

      <h2>Your rights</h2>
      <p>Subject to the law that applies to you, you may ask us to:</p>
      <ul>
        <li>tell you what personal data we hold about you and give you a copy;</li>
        <li>correct data that is wrong or out of date;</li>
        <li>delete your data or stop using it;</li>
        <li>withdraw your consent at any time, without affecting what we did before you withdrew it.</li>
      </ul>
      <p>
        Email <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a> to use any of these rights. We
        may need to confirm who you are first. If you are not satisfied with our answer, you may complain to the data
        protection authority in your country.
      </p>

      <h2>Children</h2>
      <p>This website is for business use and is not directed at children. We do not knowingly collect data from them.</p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will post the new version here and update the date above. The version you agreed
        to is recorded with your request.
      </p>
    </LegalPage>
  );
}
