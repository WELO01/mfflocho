"use client";

import { useState } from "react";
import { useCreateCustomMugMutation } from "./mug.api";
import MugModelShowcase, { MugModel } from "./MugModel";


export default function CustomMugCreatorPro() {
  const [finalImageUrl, setFinalImageUrl] = useState("");
  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [mugColor, setMugColor] = useState("white");
  const [size, setSize] = useState("11oz");
  const [selectedModel, setSelectedModel] = useState<MugModel | null>(null);

  const [createMug] = useCreateCustomMugMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!selectedModel) return alert("Selecciona un modelo de taza.");

    const price = size === "15oz" ? 15.99 : 12.99;

    await createMug({
      finalImageUrl: uploadedImage ?? finalImageUrl,
      customText: text,
      mugColor,
      size,
      price,
    });

    alert("Tu diseño ha sido enviado. ¡Pronto recibirás un diseño profesional 🎉!");
  };

  const mugModels: MugModel[] = [
    { id: "classic-white", name: "Taza Blanca", image: "/mugs/white.png" },
    { id: "black-matte", name: "Taza Negra Mate", image: "/mugs/black.png" },
    { id: "magic-color", name: "Taza Mágica", image: "/mugs/magic.png" },
    { id: "pink", name: "Taza Rosa", image: "/mugs/pink.png" },
    { id: "gold-premium", name: "Edición Premium Dorada", image: "/mugs/gold.png" },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-cyan-400 mb-4">
          Crea Tu Taza Personalizada
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Sube una imagen o describe tu idea. Nosotros te creamos un diseño profesional,
          limpio y listo para impresión.  
          <span className="text-cyan-400 font-semibold"> Flocho te da calidad premium 🔥</span>
        </p>

        {/* SELECTOR DE MODELOS */}
        <MugModelShowcase
          models={mugModels}
          title="Elige un Modelo"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSelect={(model: any) => setSelectedModel(model)}
        />

        {/* FORMULARIO */}
        <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-6 mt-8 shadow-lg">
          {/* Imagen subida */}
          <label className="block mb-3 font-semibold text-cyan-400">
            Sube una imagen para tu diseño
          </label>

          <div className="flex flex-col items-center gap-3 mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-gray-300"
            />

            {uploadedImage && (
              <img
                src={uploadedImage}
                className="w-40 h-40 object-cover rounded-lg border border-cyan-400/40 shadow-md"
                alt="uploaded preview"
              />
            )}
          </div>

          {/* Texto personalizado */}
          <label className="block mb-2 font-semibold text-cyan-400">
            Añade un texto (opcional)
          </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full rounded-lg mb-4 text-white"
            placeholder="Ejemplo: Mejor Papá, Feliz Cumpleaños…"
          />

          {/* Color */}
          <label className="font-semibold text-cyan-400">Color de la taza</label>
          <select
            value={mugColor}
            onChange={(e) => setMugColor(e.target.value)}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full rounded-lg my-2 text-white"
          >
            <option value="white">Blanca</option>
            <option value="black">Negra</option>
            <option value="pink">Rosada</option>
          </select>

          {/* Tamaño */}
          <label className="font-semibold text-cyan-400">Tamaño</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full rounded-lg my-2 text-white"
          >
            <option value="11oz">11oz</option>
            <option value="15oz">15oz</option>
          </select>

          {/* Botón de guardar */}
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg shadow-lg transition-all"
          >
            Enviar Diseño
          </button>
        </div>

        {/* Mensaje de confianza */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          En Flocho revisamos, limpiamos y optimizamos tu imagen para darte un resultado <br />
          <span className="text-cyan-400 font-semibold">profesional y nítido</span>.
        </p>
      </div>
    </div>
  );
}
