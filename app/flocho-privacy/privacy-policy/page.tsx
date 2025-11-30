export default function PrivacyPolicy() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Privacy Policy</h2>

      {/* INTRODUCTION */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Introduction</h3>
      <p className="text-zinc-300 mb-4">
        This Privacy Policy explains how we collect, use, and protect your personal information when
        you visit our website or use our app. By using our services, you agree to the terms of this
        Privacy Policy.
      </p>

      {/* INFORMATION COLLECTION */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Information Collection</h3>
      <p className="text-zinc-300 mb-2">We collect the following types of information:</p>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          <strong className="text-cyan-400">Personal Information:</strong> Name, email address,
          phone number, physical address, payment details, and account credentials (e.g., username
          and password).
        </li>
        <li>
          <strong className="text-cyan-400">Usage Data:</strong> Interactions, preferences, and
          behavior on our website or app.
        </li>
        <li>
          <strong className="text-cyan-400">Device Information:</strong> IP address, browser type,
          operating system, and device identifiers.
        </li>
        <li>
          <strong className="text-cyan-400">Cookies & Tracking Technologies:</strong> Data collected
          through cookies, pixel tags, and similar tools.
        </li>
      </ul>

      {/* INFORMATION USE */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Information Use</h3>
      <p className="text-zinc-300 mb-2">We use your information for the following purposes:</p>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>To process orders, manage shipments, and provide customer support.</li>
        <li>
          To send notifications, updates, and promotional communications (with your consent).
        </li>
        <li>
          To send transactional SMS messages or phone calls for verification, order updates, and
          important service-related alerts.
        </li>
        <li>
          To ensure secure communication through trusted third-party providers such as Twilio for SMS
          and phone call services.
        </li>
        <li>To protect user accounts, detect fraud, and enhance security.</li>
        <li>To improve our website, app, and services using analytics and feedback.</li>
        <li>To comply with legal obligations and enforce our terms of service.</li>
      </ul>

      {/* DATA SHARING */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Data Sharing</h3>
      <p className="text-zinc-300 mb-2">We share your information only under these conditions:</p>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          With <strong className="text-cyan-400">payment processors</strong> (e.g., Stripe) to
          securely handle transactions.
        </li>
        <li>
          With <strong className="text-cyan-400">shipping companies</strong> to deliver your orders.
        </li>
        <li>
          With <strong className="text-cyan-400">SMS/phone service providers</strong> (e.g., Twilio)
          for essential communication.
        </li>
        <li>When required by law or to comply with legal requests.</li>
        <li>With your explicit consent for specific purposes.</li>
      </ul>

      {/* AGE RESTRICTION */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Age Restriction</h3>
      <p className="text-zinc-300 mb-4">
        Our services are intended for users aged 18 and older. We do not knowingly collect
        information from individuals under 16. If we become aware of such collection, we will delete
        the information promptly.
      </p>

      {/* DATA PROTECTION */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Data Protection</h3>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>We encrypt sensitive data during transmission and at rest.</li>
        <li>We restrict access to personal data to authorized personnel only.</li>
        <li>We regularly update our security protocols to prevent unauthorized access.</li>
      </ul>

      {/* SECURE PAYMENTS */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Secure Payments</h3>
      <p className="text-zinc-300 mb-4">
        All payments are securely processed through Stripe, which follows the highest industry
        security standards. We do not store your payment card information on our servers.
      </p>

      {/* USER RIGHTS */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">User Rights</h3>
      <p className="text-zinc-300 mb-2">You have the right to:</p>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>Access your personal data and request a copy.</li>
        <li>Correct inaccurate or incomplete information.</li>
        <li>Request data deletion, within legal limitations.</li>
        <li>Withdraw consent for marketing communications at any time.</li>
        <li>Request restriction of data processing in certain situations.</li>
      </ul>

      <p className="text-zinc-300 mb-4">
        To exercise these rights, contact us at{" "}
        <span className="text-cyan-400">support@flocho.com</span>.
      </p>

      {/* COOKIES */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Cookies & Tracking Technologies
      </h3>
      <p className="text-zinc-300 mb-4">
        We use cookies and similar tools to enhance your experience, analyze traffic, and provide
        personalized content. You can manage or disable cookies through your browser settings.
      </p>

      {/* SMS & PHONE COMMUNICATIONS */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">SMS & Phone Communications</h3>
      <p className="text-zinc-300 mb-4">
        By providing your phone number, you consent to receive SMS messages and phone calls for:
      </p>

      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>Order updates and confirmations.</li>
        <li>Account verification and password recovery.</li>
        <li>
          Promotional offers and marketing messages (if you have opted in). Reply “STOP” to opt out.
        </li>
      </ul>

      <p className="text-zinc-300 mb-4">
        We use trusted providers such as Twilio to deliver messages securely. We will never sell or
        share your phone number with unauthorized third parties.
      </p>

      {/* UPDATES */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Updates to This Policy</h3>
      <p className="text-zinc-300 mb-4">
        We may update this Privacy Policy regularly to reflect changes in our practices or legal
        requirements. Updates will be posted on this page.
      </p>

      {/* CONTACT */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Contact Us</h3>
      <p className="text-zinc-300 mb-2">
        If you have any questions or concerns about this Privacy Policy, contact us:
      </p>

      <ul className="text-zinc-300 ml-6 space-y-1 mb-4">
        <li>Email: <span className="text-cyan-400">contact@flocho.com</span></li>
        <li>Email: <span className="text-cyan-400">support@flocho.com</span></li>
      </ul>
    </div>
  );
}
