"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface PhotoSize {
  name: string;
  price: number;
  desc: string;
}

interface SizeSelectionProps {
  sizes: PhotoSize[];
  selectedSize: string | null;
  onSelect: (size: PhotoSize) => void;
  onCustomSize?: (width: number, height: number) => void;
}

export default function SizeSelection({
  sizes,
  selectedSize,
  onSelect,
  onCustomSize,
}: SizeSelectionProps) {
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  // ✅ solo sanitiza texto, sin convertir a número aquí
  const sanitizeNumber = (value: string) => {
    return value
      .replace(",", ".") // convierte coma a punto
      .replace(/[^0-9.]/g, "") // elimina caracteres no válidos
      .replace(/(\..*)\./g, "$1"); // evita dos puntos
  };

  const handleApplyCustom = () => {
    const width = parseFloat(customWidth);
    const height = parseFloat(customHeight);

    if (
      !isNaN(width) &&
      !isNaN(height) &&
      width > 0 &&
      height > 0 &&
      onCustomSize
    ) {
      onCustomSize(width, height);
    } else {
      alert("Please enter valid width and height values.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      {/* Título */}
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
        Choose Your Size
      </h2>

      {/* Lista de tamaños */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {sizes.map((size) => (
          <motion.div
            key={size.name}
            onClick={() => onSelect(size)}
            whileHover={{ scale: 1.05 }}
            className={`p-5 rounded-xl text-center cursor-pointer transition border-2 ${
              selectedSize === size.name
                ? "border-cyan-400 bg-cyan-800/30"
                : "border-cyan-600 bg-white/10 hover:bg-cyan-600/20"
            }`}
          >
            <h3 className="text-lg font-semibold text-cyan-300">
              {size.name} in
            </h3>
            <p className="text-white/90 text-sm">{size.desc}</p>
            <p className="text-cyan-400 font-bold mt-1">
              ${size.price.toFixed(2)}
            </p>
          </motion.div>
        ))}
      </div>

     {/* Custom size (por ahora deshabilitado hasta la próxima actualización) */}
     {/*  
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-cyan-400 mb-2">
          Or enter a custom size
        </h3>
        <div className="flex justify-center gap-3 flex-wrap">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Width (in)"
            value={customWidth}
            onChange={(e) => setCustomWidth(sanitizeNumber(e.target.value))}
            className="px-4 py-2 w-28 text-black rounded-md focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <input
            type="text"
            inputMode="decimal"
            placeholder="Height (in)"
            value={customHeight}
            onChange={(e) => setCustomHeight(sanitizeNumber(e.target.value))}
            className="px-4 py-2 w-28 text-black rounded-md focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <button
            onClick={handleApplyCustom}
            className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-md font-semibold text-white flex items-center gap-2 transition"
          >
            <Ruler className="w-4 h-4" /> Apply
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Max print size: 17” width × 100” length
        </p>
      </div>*/}
    </div>
  );
}
