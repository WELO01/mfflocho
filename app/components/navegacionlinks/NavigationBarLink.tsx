"use client";
import {
  Menu,
  Wrench,
  X
} from "lucide-react";
import { useState } from "react";


const links = [
 //{ name: "Inicio", href: "/", icon: Home },
 // { name: "Productos", href: "/productos", icon: ShoppingBag },
  { name: "Services", href: "/", icon: Wrench },
 // { name: "Promociones", href: "/promos", icon: Percent },
];

export default function NavigationBarLinks() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-500 text-black shadow-lg font-semibold tracking-wide">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
      

        {/* Botón del menú */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md bg-cyan-900/40 hover:bg-cyan-900 transition sm:hidden"
          aria-label="Abrir o cerrar menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Links */}
      <div
        className={`${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } sm:max-h-none sm:opacity-100 overflow-hidden sm:overflow-visible transition-all duration-500 ease-in-out`}
      >
        <div className="flex sm:flex-row flex-col sm:items-center sm:justify-center gap-2 sm:gap-4 px-4 pb-3 sm:pb-0 sm:px-6 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-cyan-700">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-md text-base sm:text-sm font-semibold hover:bg-cyan-800/50 hover:scale-105 active:scale-95 transition"
              >
                <Icon className="h-5 w-5 opacity-90" />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
