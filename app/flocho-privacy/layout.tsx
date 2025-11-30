import NavbarPage from "../components/Navbar/NavbarPage";

// app/policies/layout.tsx
export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
   <NavbarPage/>
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 text-cyan-400">Flocho · Policies</h1>

        <div className="bg-zinc-900/60 rounded-2xl p-10 shadow-xl border border-cyan-400/20">
          {children}
        </div>
      </div>
    </div>
    </div>
  );
}
