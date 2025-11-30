"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

interface CloserProps {
  to?: string;
  color?: string;
  size?: number;
  showLogo?: boolean;
}

export default function Closer({
  to,
  color = "#00ffff",
  size = 28,
  showLogo = true,
}: CloserProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push(to ?? "/");
  };

  return (
    <header className="absolute top-0 left-0 w-full h-20 flex justify-between items-center px-6 z-50">
      {/* Fondo moderno de puntitos */}
      <div className="absolute inset-0 bg-black bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

      {/* Logo */}
      {showLogo && (
        <div className="relative z-10">
          <Logo />
        </div>
      )}

      {/* Botón cerrar */}
      <button
        onClick={handleClose}
        aria-label="Cerrar"
        className="relative z-10 p-2 rounded-full border border-cyan-500/40 bg-black/60 backdrop-blur-md hover:bg-cyan-500/30 transition-all hover:scale-110 active:scale-95"
      >
        <X size={size} color={color} strokeWidth={2.5} />
      </button>
    </header>
  );
}
