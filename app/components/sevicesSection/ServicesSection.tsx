"use client";

import { useGetServicesQuery } from "@/app/home/services/serviceApi";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

function imgUrl(path?: string) {
  if (!path) return "";
  // el backend sirve /images/... → prefijamos el host
  return `${BACKEND}${path}`;
}

export default function ServicesSection() {
  const { data: services, isLoading, error } = useGetServicesQuery();
  const t = useTranslations()
 

  if (error) {
    return (
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-red-600 font-semibold">
            {t('servicesSection.error')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-gradient-to-b from-cyan-100 to-white">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-cyan-700 mb-2 drop-shadow-sm">
          {t("servicesSection.OurServices")}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          {t("servicesSection.description")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 px-4 max-w-7xl mx-auto">
        {/* Skeletons mientras carga */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-200" />
              <div className="p-3 sm:p-4">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}

        {/* Cards reales */}
        {services?.map((service) => {
          const cover = imgUrl(service.images?.[0]?.filePath);
          const thumbs = service.images?.slice(0, 3) || [];
          const extra = Math.max((service.images?.length || 0) - 3, 0);

          return (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer transition-all"
            >
              <Link href={service.href || "#"} aria-label={service.title}>
                <div className="overflow-hidden">
                  {cover ? (
                    <motion.img
                      src={cover}
                      alt={service.title}
                      className="w-full h-36 sm:h-40 md:h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-36 sm:h-40 md:h-44 bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                </div>

                <div className="p-3 sm:p-4 text-center">
                  <h3 className="text-cyan-700 font-bold text-base sm:text-lg mb-1 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-tight line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Overlay suave al hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-600/20 transition-opacity duration-500" />

                {/* Tira de miniaturas (si hay más imágenes) */}
                {thumbs.length > 1 && (
                  <div className="absolute bottom-2 right-2 flex -space-x-1">
                    {thumbs.map((t, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`${service.id}-thumb-${idx}`}
                        src={imgUrl(t.filePath)}
                        alt={`${service.title} - ${idx + 1}`}
                        className="w-7 h-7 rounded-md border border-white object-cover shadow-sm"
                      />
                    ))}
                    {extra > 0 && (
                      <div className="w-7 h-7 rounded-md bg-white/80 text-[10px] font-semibold flex items-center justify-center border border-white shadow-sm">
                        +{extra}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
