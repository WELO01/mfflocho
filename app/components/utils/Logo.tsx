'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: number; // puedes ajustar el tamaño si lo necesitas
}

export default function Logo({ size = 48 }: LogoProps) {
  return (
    <Link href="/" className="flex items-center justify-center group">
      <div
        className="flex items-center justify-center rounded-full bg-cyan-500 transition-transform duration-200 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/flochologo.svg" // tu archivo svg negro debe estar en /public/logo.svg
          alt="Flocho logo"
          width={size * 0.6}
          height={size * 0.6}
          className="object-contain"
        />
      </div>
    </Link>
  );
}
