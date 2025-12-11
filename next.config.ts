import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        
        hostname: "images.unsplash.com",
      },
      
      
      {
        protocol: "https",
        hostname: "i.etsystatic.com", // por si usas tus imágenes anteriores
      },
      {
        protocol: "https",
        hostname: "flocho.servebeer.com", // si vas a servir tus propias imágenes
      },
    ],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);