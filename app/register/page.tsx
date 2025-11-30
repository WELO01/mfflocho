

import { registerMeta } from "@/src/meta/Register";
import Closer from "../components/utils/Closer";
import Register from "./Register";


// Exporta los metadatos para Next.js
export const metadata = registerMeta;

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] relative overflow-hidden">
       <Closer to="/" color="#00ffff" showLogo />
      <Register />
    </div>
  );
}
