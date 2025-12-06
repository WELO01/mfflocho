"use client";

import PaymentModal from "@/app/components/Payment/PaymentModal";
import UploadImages from "@/app/components/utils/uploadPhotos/UploadImages";
import { useState } from "react";
import PortadaPage from "./Portada";
import SendOrder from "./SendOrder";
import SizeSelection from "./SizeSelection";

export default function PhotoPrintingPage() {
  const [images, setImages] = useState<File[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  // Modal abierto o cerrado
  const [showPayment, setShowPayment] = useState(false);

  const photoSizes = [
    { name: "4x6", price: 1.5, desc: "Small" },
    { name: "5x7", price: 2.5, desc: "Medium" },
    { name: "8x10", price: 4.0, desc: "Large" },
    { name: "11x14", price: 6.5, desc: "XLarge" },
    { name: "13x19", price: 8.0, desc: "2XLarge" },
    { name: "16x20", price: 10.0, desc: "3XLarge" },
    { name: "17x22", price: 12.0, desc: "4XLarge" },
    { name: "17x36", price: 20.0, desc: "Poster" },
  ];

  const handleSelectSize = (size: { name: string; price: number }) => {
    setSelectedSize(size.name);
    setTotal(size.price * images.length);
  };
  

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white px-4 sm:px-0">
      <PortadaPage />

      {/* Upload */}
      <div className="mt-10">
        <UploadImages
          images={images}
          setImages={(imgs) => {
            setImages(imgs);
            if (selectedSize) {
              const price = photoSizes.find((s) => s.name === selectedSize)?.price || 0;
              setTotal(price * imgs.length);
            }
          }}
          maxFiles={35}
        />
      </div>

      {/* Size selection */}
     
        <div className="mt-10">
          <SizeSelection
            sizes={photoSizes}
            selectedSize={selectedSize}
            onSelect={handleSelectSize}
            onCustomSize={(w, h) => {
              const area = (w * h) / (4 * 6);
              const price = Math.max(2, area * 1.2);

              setSelectedSize(`${w}x${h}`);
              setTotal(price * images.length);
            }}
          />
        </div>
      

      {/* Summary */}
      {images.length > 0 && selectedSize && (
        <div className="mt-8 text-center">
          <p className="text-lg text-cyan-300">
            {images.length} photo(s) × {selectedSize} =
            <span className="font-bold text-cyan-400"> ${total.toFixed(2)}</span>
          </p>
        </div>
      )}

      {/* Send Order Button */}
      <div className="mt-10 flex justify-center">
        <SendOrder
          orderData={{
            title: "Photo Printing Order",
            unitPrice: total / (images.length || 1),
            quantity: images.length,
            sizeLabel: selectedSize || undefined,
            images,
          }}
          onSuccess={(secret, amt) => {
            setClientSecret(secret);
            setAmount(amt);
            setShowPayment(true);
          }}
        />
      </div>
   
      {/* Modal de Pago */}
      {showPayment && clientSecret && amount && (
        <PaymentModal
          clientSecret={clientSecret}
          amount={amount}
          onClose={() => setShowPayment(false)}
        />
      )}
    </section>
  );
}
