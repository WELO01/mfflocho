"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// 🎨 Objeto falso con imágenes random
const heroImages = [
  {
    id: 1,
    title: "Photo Printing",
    image: "https://img.freepik.com/premium-photo/person-holdi…-travel-photographs-desk_124865-113348.jpg?w=1480",
    description: "Descubre los nuevos estilos frescos y coloridos.",
  },



];

export default function HeroSectionPage() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // auto-slide cada 5s
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = heroImages[index];

  return (
   <section
  className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
>

      <AnimatePresence mode="wait">
        <motion.img
          key={current.id}
          src={current.image}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Texto */}
      <div className="absolute bottom-10 left-10 text-white space-y-3">
        <motion.h2
          key={current.title}
          className="text-3xl font-bold"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {current.title}
        </motion.h2>
        <p className="max-w-md text-sm md:text-base opacity-90">
          {current.description}
        </p>
      </div>

      {/* Controles */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
