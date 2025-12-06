"use client";

import { clearUserSession } from "@/app/login/slice";
import { useAppSelector } from "@/src/store/hooks";
import { Menu, ShoppingCart, User, X } from "lucide-react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../utils/Logo";
import LinksPrimary from "./LinksPrimary";

export default function NavbarPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("navbar");
  const dispatch = useDispatch();

  // ✅ Detectar si el usuario está logueado (si existe accessToken)
  const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);
  console.log("usuario registrado",isLoggedIn)

  const handleLogout = () => {
    dispatch(clearUserSession());
    setMenuOpen(false); // cerrar menú móvil después del logout
  };

  return (
    <nav className="bg-[#0a0a0a] text-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Logo size={40} />

        {/* Links desktop */}
        <LinksPrimary />

        {/* Icons */}
        <div className="flex items-center gap-5">

          <Link href="/cartOrders">
            <ShoppingCart className="w-5 h-5 hover:text-cyan-400 cursor-pointer" />
          </Link>

          <Link href="/userSetting">
            <User className="w-5 h-5 hover:text-cyan-400 cursor-pointer" />
          </Link>

          {/* Botón de menú móvil */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-gray-700">
          <div className="flex flex-col items-center py-4 space-y-4">

            {/* Logo */}
            <Logo size={35} />
            
  
         
             <Link
    href="/flocho-privacy"
    className="hover:text-cyan-400 text-lg"
    onClick={() => setMenuOpen(false)}
  >
    {t("links.privacy")}
  </Link>
           

            {/* Links condicionales */}

            {isLoggedIn ? (
              <>
               <Link
      href="/cartOrders"
      className="hover:text-cyan-400 text-lg"
      onClick={() => setMenuOpen(false)}
    >
      {t("links.orders")}
    </Link>
               <Link
      href="/shippingAddress"
      className="hover:text-cyan-400 text-lg"
      onClick={() => setMenuOpen(false)}
    >
      {t("links.shippingAddress")}
    </Link>
              <button
              onClick={handleLogout}
              className="hover:text-cyan-400 text-lg"
              >
                {t("links.logout")}
              </button>
            </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-cyan-400 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("links.login")}
                </Link>

                <Link
                  href="/register"
                  className="hover:text-cyan-400 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("links.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
