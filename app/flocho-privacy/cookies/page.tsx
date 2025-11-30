export default function CookiePolicy() {
  return (
    <>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Cookie Policy</h2>

      <p className="text-zinc-300 mb-4">
        This Cookie Policy explains what cookies are, how we use them, the types of cookies we use,
        and how you can manage your cookie preferences on our website. By continuing to use our
        website, you consent to our use of cookies as outlined in this policy.
      </p>

      {/* 1. What are cookies */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">1. What are cookies?</h3>
      <p className="text-zinc-300 mb-4">
        Cookies are small text files stored on your device (computer, mobile phone, tablet, etc.)
        when you visit a website. They allow websites to remember your preferences, improve
        functionality, and provide a better user experience. Cookies may be temporary (session
        cookies) or persistent (stored on your device until they expire or are deleted).
      </p>

      {/* 2. Types of cookies */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">2. Types of Cookies We Use</h3>
      <p className="text-zinc-300 mb-4">We use the following types of cookies:</p>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          <strong className="text-cyan-400">Essential Cookies:</strong> Necessary for the website to
          function properly. They enable basic features like page navigation and secure areas.
        </li>
        <li>
          <strong className="text-cyan-400">Performance and Analytics Cookies:</strong> Collect
          anonymous information about how visitors use our website and help us improve performance.
        </li>
        <li>
          <strong className="text-cyan-400">Functionality Cookies:</strong> Remember your preferences
          such as language and login details for a more personalized experience.
        </li>
        <li>
          <strong className="text-cyan-400">Advertising Cookies:</strong> Deliver targeted ads,
          limit ad repetition, and measure advertising effectiveness.
        </li>
        <li>
          <strong className="text-cyan-400">Third-Party Cookies:</strong> Set by external services
          such as analytics tools, social media plugins, or embedded content.
        </li>
      </ul>

      {/* 3. How we use cookies */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">3. How We Use Cookies</h3>
      <p className="text-zinc-300 mb-4">We use cookies for the following purposes:</p>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>To ensure our website functions as intended.</li>
        <li>To improve usability and performance.</li>
        <li>To personalize the user experience.</li>
        <li>To analyze traffic and visitor behavior.</li>
        <li>To deliver relevant advertising and measure performance.</li>
        <li>To enable third-party tools and embedded content.</li>
      </ul>

      {/* 4. Third-party cookies */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">4. Third-Party Cookies</h3>
      <p className="text-zinc-300 mb-4">
        Our website uses third-party services that may place cookies on your device. These include:
      </p>

      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          <strong className="text-cyan-400">Google Analytics:</strong> Tracks and analyzes site
          traffic. May collect your IP, browser type, and time spent on the site.
        </li>
        <li>
          <strong className="text-cyan-400">Social Media Plugins:</strong> Platforms like Facebook,
          Twitter, and Instagram may store cookies for sharing or profile interactions.
        </li>
        <li>
          <strong className="text-cyan-400">Advertising Partners:</strong> Ad networks may place
          cookies to display tailored ads and track browsing behavior across websites.
        </li>
      </ul>

      {/* 5. Manage cookies */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">5. How to Manage Your Cookies</h3>
      <p className="text-zinc-300 mb-4">
        You can manage or disable cookies in several ways:
      </p>

      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          <strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies.
        </li>
        <li>
          <strong>Cookie Banner:</strong> You can update your cookie preferences anytime via our
          cookie settings tool.
        </li>
        <li>
          <strong>Opt-Out Tools:</strong> Some services provide opt-outs, such as Google Analytics
          Opt-Out Browser Add-on.
        </li>
      </ul>

      <p className="text-zinc-300 mb-4">
        Note: Disabling certain cookies may affect website functionality and performance.
      </p>

      {/* 6. Legal basis */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">6. Legal Basis for Using Cookies</h3>
      <p className="text-zinc-300 mb-4">
        We process cookies based on your consent or when they are strictly necessary for our
        website to operate. By continuing to use our site, you consent to the use of cookies as
        described in this policy.
      </p>

      {/* 7. Updates */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        7. Updates to Our Cookie Policy
      </h3>
      <p className="text-zinc-300 mb-4">
        We may update this Cookie Policy to reflect changes in technology, legislation, or our
        business practices. Updates will appear on this page with the effective date.
      </p>

      {/* 8. Contact */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">8. Contact</h3>
      <p className="text-zinc-300 mb-2">
        If you have any questions about this Cookie Policy, contact us:
      </p>

      <ul className="text-zinc-300 ml-6 space-y-1 mb-4">
        <li>Email: <span className="text-cyan-400">contact@flocho.com</span></li>
        <li>Support: <span className="text-cyan-400">support@flocho.com</span></li>
        <li>Website: See our contact form</li>
      </ul>
    </>
  );
}
