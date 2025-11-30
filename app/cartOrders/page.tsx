"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CartPage from "./cart/Cart";
import OrdersPage from "./orders/Orders";

interface NavItem {
  label: string;
  key: string;
}

export default function CartOrderPage() {
  // 🔹 Definimos las rutas del navegador
  const navItems: NavItem[] = [
    { label: "Cart", key: "cart" },
    { label: "Orders", key: "orders" },
  ];

  // 🔹 Estado de la pestaña activa (por defecto "cart")
  const [active, setActive] = useState("cart");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white">
      {/* 🔹 Barra de navegación */}
      <nav className="flex justify-center border-b border-cyan-700/50 bg-cyan-400 backdrop-blur-md sticky top-0 z-20">
        <ul className="flex gap-10 py-4">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`relative cursor-pointer text-lg font-semibold transition-colors duration-200 ${
                active === item.key
                  ? "text-black"
                  : "text-white hover:text-black"
              }`}
            >
              {item.label}

              {/* 🔹 Subrayado animado solo en el activo */}
              {active === item.key && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* 🔹 Contenido dinámico según la ruta activa */}
      <div className="max-w-4xl mx-auto mt-10 px-6 text-center">
        {active === "cart" && (
         <CartPage/>
        )}

        {active === "orders" && (
          <OrdersPage/>
        )}
      </div>
    </div>
  );
}
