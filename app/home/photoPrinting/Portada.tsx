import Image from "next/image";


export default function PortadaPage() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1200&q=60"
          alt="Photo Printing Service"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 drop-shadow-lg">
            Premium Photo Printing
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-4 max-w-2xl">
            Bring your memories to life with exceptional photo prints.
          </p>
        </div>
      </div>
  );
}