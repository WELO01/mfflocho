// app/policies/page.tsx
import Link from "next/link";

const links = [
  { href: "/flocho-privacy/privacy-policy", label: "Privacy Policy" },
  { href: "/flocho-privacy/about-us", label: "About Us" },
  { href: "/flocho-privacy/shipping-policy", label: "Shipping Policy" },
  { href: "/flocho-privacy/terms", label: "Terms & Conditions" },
  { href: "/flocho-privacy/cookies", label: "Cookie Policy" },
];

export default function PoliciesHome() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Welcome to our Policy Center</h2>
      <p className="text-zinc-300 mb-8">
        Learn more about how Flocho works. Select any policy to continue.
      </p>

      <div className="grid gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block bg-black border border-cyan-400/40 hover:border-cyan-400 rounded-xl p-5 transition"
          >
            <span className="text-xl text-white">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
