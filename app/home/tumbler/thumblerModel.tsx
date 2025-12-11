"use client";

import { useState } from "react";
import { TumblerModel } from "./thumblersModelApi";

interface Props {
  title?: string;
  models: TumblerModel[];
  onSelect: (model: TumblerModel) => void;
}

export default function TumblerModelShowcase({
  title = "Modelos de Thumblers Disponibles",
  models,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_FLOCHO_API;

  const handleSelect = (model: TumblerModel) => {
    setSelected(model.id);
    onSelect(model);
  };
  console.log("TumblerModelShowcase models:", models);

  return (
    <section className="w-full py-8 px-4 bg-black text-white rounded-xl shadow-xl border border-cyan-500/30">
      {/* TITLE */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-cyan-400 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-gray-300 mt-1 text-sm sm:text-base">
          Elige el modelo perfecto para personalizar tu tumbler
        </p>
      </div>

      {/* HORIZONTAL SCROLL LIST */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-black/30">
        {models.map((model) => {
          const imageUrl =
            model.images?.filePath
              ? `${apiBase}${model.images.filePath}`
              : "/placeholder-tumbler.png";

          return (
            <div
              key={model.id}
              onClick={() => handleSelect(model)}
              className={`flex-shrink-0 w-40 sm:w-48 cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                selected === model.id
                  ? "border-cyan-400 bg-cyan-500/10 shadow-cyan-400/30 shadow-lg scale-105"
                  : "border-cyan-500/20 bg-black/40 hover:border-cyan-400 hover:scale-105"
              }`}
            >
              {/* IMAGE */}
              <div className="relative w-full h-44 sm:h-52 flex items-center justify-center bg-black">
                <img
                  src={imageUrl}
                  alt={model.name}
                  className="object-contain p-3 select-none w-full h-full"
                />
              </div>

              {/* NAME */}
              <div className="py-3 bg-black/60 text-center">
                <p className="font-bold tracking-wide text-cyan-300">
                  {model.name}
                </p>
              </div>

              {/* SELECTED TAG */}
              {selected === model.id && (
                <div className="text-center py-2 bg-cyan-500/10 text-cyan-400 font-semibold tracking-wide text-sm">
                  ✓ Seleccionado
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
