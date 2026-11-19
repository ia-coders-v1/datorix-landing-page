import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { EULA_VERSION, GOVERNING_LAW, LEGAL_ADDRESS, LEGAL_NAME, PRIVACY_CONTACT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "End User License Agreement",
  description: "The terms that govern your use of the Datorix software.",
  alternates: { canonical: "/eula/" },
};

export default function EulaPage() {
  return (
    <LegalPage title="End User License Agreement" updated={EULA_VERSION}>
      <p>
        This End User License Agreement (&quot;EULA&quot;) is between {LEGAL_NAME} (&quot;Datorix&quot;), {LEGAL_ADDRESS},
        and the organization or person that installs or uses the Datorix software (&quot;you&quot;). You accept this EULA
        when you install the software, activate a trial, or otherwise start using it. Requesting a demo on our website
        does not accept this EULA and does not give you a licence. If you do not agree, do not install or use the software.
      </p>
      <p>
        If you accept on behalf of an organization, you confirm that you have authority to bind it. A separate signed
        agreement between you and Datorix, if one exists, prevails over this EULA where they conflict.
      </p>

      <h2>1. Licence</h2>
      <p>
        Subject to this EULA and any order or subscription you have with us, Datorix grants you a limited,
        non-exclusive, non-transferable, non-sublicensable, revocable licence to install and use the software, and its
        documentation, for your own internal business purposes during the term of your subscription or trial.
      </p>

      <h2>2. Restrictions</h2>
      <p>You may not, and may not let anyone else:</p>
      <ul>
        <li>copy, modify or create derivative works of the software, except as the law allows despite this restriction;</li>
        <li>reverse engineer the software in any way described in section 3;</li>
        <li>sell, rent, lease, sublicense or provide the software to a third party as a service;</li>
        <li>remove or alter any proprietary notice;</li>
        <li>use the software to break the law, or to access or monitor systems or data you have no right to access;</li>
        <li>circumvent any licence key, usage limit or other technical control.</li>
      </ul>

      <h2>3. Reverse engineering policy</h2>
      <p>
        <strong>3.1 Prohibited.</strong> The software contains trade secrets and confidential information of Datorix.
        Unless section 3.3 allows it, you
        may not, and may not let anyone else:
      </p>
      <ul>
        <li>decompile, disassemble, decrypt or otherwise try to obtain the source code, object code structure, algorithms, detection rules or models of the software;</li>
        <li>deobfuscate, unpack or analyse the software, its binaries, containers or network protocols to work out how they are built;</li>
        <li>extract, copy or reuse the software&apos;s rule sets, policies, schemas or other proprietary content;</li>
        <li>circumvent, disable or tamper with licence checks, usage limits, encryption or other technical protections;</li>
        <li>use any of the above to build, train or improve a competing product or service, or to help someone else do so.</li>
      </ul>
      <p>
        <strong>3.2 Security research.</strong> We welcome reports of security vulnerabilities. If you find one, tell us
        at <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a> and give us reasonable time to fix it
        before you disclose it publicly. Do not access, change or destroy data that is not yours, and do not disrupt
        systems that you do not own while you test. Testing your own installation, within this EULA, is allowed.
      </p>
      <p>
        <strong>3.3 What the law allows.</strong> Where mandatory law gives you a right to decompile the software, for
        example to make it work with another program, you may do so only to the extent the law requires. First ask us
        in writing for the information you need, and give us a reasonable period to supply it. Keep what you learn
        confidential, and use it only for that purpose.
      </p>
      <p>
        <strong>3.4 If you breach this section.</strong> Datorix may end your licence at once, without the 30-day
        period in section 7, and may seek an injunction and other remedies the law allows.
      </p>

      <h2>4. Your data and your systems</h2>
      <p>
        You keep all rights in the databases and data you connect to the software. You are responsible for having the
        right to monitor, replicate and back up that data, for the policies and settings you configure, and for the
        accuracy of what you enter. Datorix does not claim ownership of your data and accesses it only as needed to
        provide support you request, under your direction.
      </p>

      <h2>5. Ownership</h2>
      <p>
        The software and all intellectual property in it belong to Datorix and its licensors. This EULA gives you a
        right to use the software and no ownership of it. If you give us feedback, we may use it without obligation to
        you.
      </p>

      <h2>6. Support and updates</h2>
      <p>
        Support, updates and service levels, if any, are those stated in your order or subscription. We may update the
        software from time to time, and the update is covered by this EULA unless it comes with its own terms.
      </p>

      <h2>7. Term and termination</h2>
      <p>
        This EULA applies from the moment you accept it until it ends. It ends automatically if your subscription or
        trial ends, or if you breach it and do not fix the breach within 30 days of our notice. You may end it at any
        time by uninstalling the software. When it ends, you must stop using the software and delete all copies.
        Sections 2, 3, 5 and 8 to 11 survive termination.
      </p>

      <h2>8. Warranty disclaimer</h2>
      <p>
        To the extent the law allows, the software is provided &quot;as is&quot; and &quot;as available&quot;. Datorix gives no
        warranty that it will be uninterrupted or error-free, or that it will detect or block every threat or suit your
        particular purpose, and disclaims all implied warranties, including merchantability, fitness for a particular
        purpose and non-infringement. Any warranty in a signed agreement between us applies in addition.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent the law allows, Datorix is not liable for indirect, incidental, special or consequential loss,
        for loss of profit, revenue, data or goodwill, or for business interruption. Its total liability under this EULA
        is limited to the fees you paid for the software in the 12 months before the event that gave rise to the claim,
        or, if you paid no fees, to a nominal amount. Nothing in this EULA limits a liability that the law does not
        allow to be limited.
      </p>

      <h2>10. Confidentiality and security</h2>
      <p>
        Each party will protect the other&apos;s non-public information with reasonable care and use it only for this
        EULA. You are responsible for protecting the credentials and licence keys issued to you.
      </p>

      <h2>11. Governing law and disputes</h2>
      <p>
        This EULA is governed by {GOVERNING_LAW}, without regard to its conflict of laws rules. The parties will try
        first to settle any dispute in good faith. A dispute that is not settled will be brought before the competent
        courts of that country, unless a signed agreement between us says otherwise.
      </p>

      <h2>12. General</h2>
      <p>
        You may not assign this EULA without our written consent. If a provision is unenforceable, the rest remains in
        effect. A failure to enforce a right is not a waiver of it. We may change this EULA for future versions of the
        software and will post the new version here.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this EULA: <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
