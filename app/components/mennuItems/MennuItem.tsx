// components/FloatingMenuButton.tsx
"use client";
import {
    BadgePercent,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Package2,
    PlusCircle,
    Shirt,
    ShoppingBasket,
    Truck,
    Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export type MenuItem = {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
};

// Puedes reemplazar este objeto o pasarlo vía props
export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { label: "Inicio", href: "/", icon: LayoutDashboard },
  {
    label: "Servicios",
    icon: Wrench,
    children: [
      { label: "DTF", href: "/servicios/dtf", icon: PlusCircle },
      { label: "Sublimación", href: "/servicios/sublimacion", icon: PlusCircle },
      { label: "Vinil & Heat Press", href: "/servicios/vinil", icon: PlusCircle },
      { label: "Bordado", href: "/servicios/bordado", icon: PlusCircle },
    ],
  },
  {
    label: "Productos",
    icon: Package2,
    children: [
      { label: "T‑Shirts", href: "/productos/tshirts", icon: Shirt },
      { label: "Hoodies", href: "/productos/hoodies", icon: Shirt },
      { label: "Tumblers", href: "/productos/tumblers", icon: ShoppingBasket },
      { label: "Promos", href: "/productos/promos", icon: BadgePercent },
    ],
  },
  { label: "Envíos", href: "/envios", icon: Truck },
];

/**
 * FloatingMenuButton
 * - Sólo el botón flotante + panel del menú (sin layout y sin children)
 * - Lo puedes pegar en cualquier página o layout existente
 */
export default function FloatingMenuButton({
  items = DEFAULT_MENU_ITEMS,
  side = "left",
  topOffset = 96, // px => equivale aprox a top-24
}: {
  items?: MenuItem[];
  side?: "left" | "right";
  topOffset?: number; // en px
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Cierra el panel al cambiar de ruta
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Posicionamiento lateral
  const sideClasses = useMemo(
    () => (side === "right" ? "right-4 items-end" : "left-4 items-start"),
    [side]
  );

  const panelSide = side === "right" ? "right-0" : "left-0";
  const chevron = side === "right" ? (
    open ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
  ) : open ? (
    <ChevronLeft className="h-5 w-5" />
  ) : (
    <ChevronRight className="h-5 w-5" />
  );

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 ${sideClasses}`}
      style={{ top: topOffset }}
    >
      {/* Botón flotante */}
      <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full shadow-lg border border-white/10 bg-neutral-900/80 backdrop-blur px-3 py-2 text-white hover:bg-neutral-800 transition"
      >
        {chevron}
      </button>

      {/* Panel del menú */}
      <aside
        className={`$${
          open ? "opacity-100 translate-x-0" : side === "right" ? "translate-x-4 opacity-0" : "-translate-x-4 opacity-0"
        } ${panelSide} w-72 max-w-[85vw] rounded-2xl border border-white/10 bg-neutral-950/90 text-white shadow-2xl backdrop-blur transition-all duration-300`}
        role="navigation"
        aria-label="Menú principal"
      >
        <div className="p-2">
          {items.map((item) => (
            <MenuNode
              key={item.label}
              item={item}
              expanded={expanded}
              setExpanded={setExpanded}
              activePath={pathname}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

function MenuNode({
  item,
  expanded,
  setExpanded,
  activePath,
}: {
  item: MenuItem;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  activePath: string;
}) {
  const Icon = item.icon;
  const isActive = item.href && activePath.startsWith(item.href);
  const hasChildren = !!item.children?.length;
  const id = item.label;
  const isExpanded = expanded === id;

  const commonClasses =
    "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500/40";

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        className={`${commonClasses} ${isActive ? "bg-white/10" : ""}`}
        title={item.label}
      >
        <Icon className="h-5 w-5 opacity-90" />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  return (
    <div className="w-full">
      <button
        className={`${commonClasses} ${isExpanded ? "bg-white/10" : ""}`}
        onClick={() => setExpanded(isExpanded ? null : id)}
        aria-expanded={isExpanded}
        aria-controls={`section-${id}`}
      >
        <Icon className="h-5 w-5 opacity-90" />
        <span className="flex-1 text-left truncate">{item.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M7 5l6 5-6 5V5z" />
        </svg>
      </button>

      <div
        id={`section-${id}`}
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          {item.children?.map((child) => (
            <Link
              key={child.label}
              href={child.href || "#"}
              className={`ml-8 mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 ${
                activePath.startsWith(child.href || "#") ? "bg-white/10" : ""
              }`}
            >
              {child.icon ? <child.icon className="h-4 w-4 opacity-80" /> : null}
              <span className="truncate">{child.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================= USO RÁPIDO =========================
// 1) Instala iconos: npm i lucide-react
// 2) Importa y pega el botón en cualquier página o layout existente
//    <FloatingMenuButton side="left" topOffset={96} />
// 3) Para editar opciones, pasa tu propio arreglo "items" o edita DEFAULT_MENU_ITEMS
