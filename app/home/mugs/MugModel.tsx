"use client";

import Image from "next/image";
import { useState } from "react";

export interface MugModel {
  id: string;
  name: string;
  image: string;
}

interface Props {
  title?: string;
  models: MugModel[];
  onSelect: (model: MugModel) => void;
}

export default function MugModelShowcase({ title = "Modelos Disponibles", models, onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (model: MugModel) => {
    setSelected(model.id);
    onSelect(model);
  };

  return (
    <section className="w-full py-8 px-4 bg-black text-white rounded-xl shadow-xl border border-cyan-500/30">
      {/* TÍTULO */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-cyan-400 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-gray-300 mt-1 text-sm sm:text-base">
          Elige el modelo perfecto para personalizar tu taza
        </p>
      </div>

      {/* CONTENEDOR SCROLL HORIZONTAL */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-black/30">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => handleSelect(model)}
            className={`
              flex-shrink-0 w-40 sm:w-48 cursor-pointer rounded-2xl overflow-hidden
              border-2 transition-all duration-300
              ${
                selected === model.id
                  ? "border-cyan-400 bg-cyan-500/10 shadow-cyan-400/30 shadow-lg scale-105"
                  : "border-cyan-500/20 bg-black/40 hover:border-cyan-400 hover:scale-105"
              }
            `}
          >
            {/* IMAGEN */}
            <div className="relative w-full h-44 sm:h-52">
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-contain p-3 select-none"
              />
            </div>

            {/* NOMBRE */}
            <div className="py-3 bg-black/60 text-center">
              <p className="font-bold tracking-wide text-cyan-300">
                {model.name}
              </p>
            </div>

            {/* SELECCIONADO */}
            {selected === model.id && (
              <div className="text-center py-2 bg-cyan-500/10 text-cyan-400 font-semibold tracking-wide text-sm">
                ✓ Seleccionado
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
