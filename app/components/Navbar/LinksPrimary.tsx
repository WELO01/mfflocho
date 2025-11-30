"use client";
import { clearUserSession } from "@/app/login/slice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLink {
  label: string;
  href: string;
  showWhenLoggedIn?: boolean;
  showWhenLoggedOut?: boolean;
}

export default function LinksPrimary() {
  const t = useTranslations("navbar");
  const dispatch = useAppDispatch();

  // ✅ Comprueba si hay token en el estado global
  const isLoggedIn = useAppSelector((state) => !!state.auth?.accessToken);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null; // evitar errores de hidratación en Next.js

  const handleLogout = () => {
    dispatch(clearUserSession());
    // Si quieres también puedes limpiar token del localStorage
    localStorage.removeItem("token");
  };

  const links: NavLink[] = [
   { label: t("links.home"), href: "/", showWhenLoggedIn: true, showWhenLoggedOut: true },
   { label: t("links.privacy"), href: "/flocho-privacy", showWhenLoggedIn: true, showWhenLoggedOut: true },
   // { label: t("links.products"), href: "/products", showWhenLoggedIn: true, showWhenLoggedOut: true },
   // { label: t("links.categories"), href: "/categories", showWhenLoggedIn: true, showWhenLoggedOut: true },
   // { label: t("links.offers"), href: "/offers", showWhenLoggedIn: true, showWhenLoggedOut: true },
   
   { label: t("links.orders"), href: "/cartOrders", showWhenLoggedIn: true },
   { label: t("links.shippingAddress"), href: "/shippingAddress", showWhenLoggedIn: true },
    { label: t("links.register"), href: "/register", showWhenLoggedOut: true },
    { label: t("links.login"), href: "/login", showWhenLoggedOut: true },
  ];

  const filteredLinks = links.filter((link) =>
    isLoggedIn ? link.showWhenLoggedIn : link.showWhenLoggedOut
  );

  return (
    <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
      {filteredLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="hover:text-cyan-400 transition-colors">
            {link.label}
          </Link>
        </li>
      ))}

      {/* ✅ Solo mostrar logout si está logueado */}
      {isLoggedIn && (
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-cyan-400 transition-colors"
          >
            {t("links.logout")}
          </button>
        </li>
      )}
    </ul>
  );
}
