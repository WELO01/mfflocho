"use client";

import { motion } from "framer-motion";
import { AlertCircle, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UploadImagesProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  maxFiles?: number;
  label?: string;
}

export default function UploadImages({
  images,
  setImages,
  maxFiles = 10,
  label = "Upload Photos",
}: UploadImagesProps) {
  const [error, setError] = useState<string | null>(null);

  // 🔒 Formatos y límites
  const validFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_FILE_SIZE_MB = 8; // Tamaño máximo por imagen
  const MIN_FILE_SIZE_KB = 20; // Tamaño mínimo (evita imágenes de baja calidad o vacías)

  // 🖼️ Manejar selección de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];

    for (const file of newFiles) {
      // Verificar formato
      if (!validFormats.includes(file.type)) {
        setError(`❌ ${file.name} has an unsupported format. Allowed: JPG, PNG, WEBP`);
        continue;
      }

      // Verificar tamaño
      const fileSizeMB = file.size / (1024 * 1024);
      const fileSizeKB = file.size / 1024;

      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`⚠️ ${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        continue;
      }

      if (fileSizeKB < MIN_FILE_SIZE_KB) {
        setError(`⚠️ ${file.name} seems too small (low quality).`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const updated = [...images, ...validFiles].slice(0, maxFiles);
    setImages(updated);
    setError(null); // Limpiar errores si todo está bien
  };

  // ❌ Eliminar una imagen
  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-6">
      <h2 className="text-2xl font-bold text-cyan-400">{label}</h2>

      {/* 🧩 Cuadrícula de previews */}
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-32 h-32 border border-cyan-600 rounded-lg overflow-hidden group"
          >
            <Image
              src={URL.createObjectURL(img)}
              alt={`Preview ${i}`}
              fill
              className="object-cover"
            />
            <button
              onClick={() => handleRemoveImage(i)}
              className="absolute top-1 right-1 bg-black/60 p-1 rounded-full hover:bg-red-500/80 transition"
              aria-label="Remove image"
            >
              <X size={14} color="#fff" />
            </button>
          </motion.div>
        ))}

        {/* 📤 Botón de subida */}
        {images.length < maxFiles && (
          <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-cyan-400 rounded-lg cursor-pointer hover:bg-cyan-900/30 transition relative overflow-hidden">
            <Upload className="w-6 h-6 text-cyan-400 mb-1" />
            <span className="text-xs text-cyan-300">Add Photos</span>
            <input
              type="file"
              multiple
              accept={validFormats.join(",")}
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* 🧮 Contador */}
      <p className="text-gray-400 text-sm">
        You can upload up to{" "}
        <span className="text-cyan-400 font-semibold">{maxFiles}</span> photos — upload fewer if you wish.
      </p>

      {images.length > 0 && (
        <p className="text-gray-400 text-sm">
          {images.length} / {maxFiles} photo(s) selected
        </p>
      )}

      {/* ⚠️ Mensaje de error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 text-sm mt-2"
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
}
