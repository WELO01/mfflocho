"use client";

import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreatePhotoOrderMutation } from "./photPrintingApi";

export interface CreatePhotoPrintingOrderDto {
  title: string;
  sizeLabel?: string;
  width?: number;
  height?: number;
  unitPrice: number;
  quantity?: number;
  paperType?: string;
  finishType?: string;
  colorProfile?: string;
  notes?: string;
  images: File[];
}

interface SendOrderProps {
  orderData: CreatePhotoPrintingOrderDto;
  onSuccess?: (clientSecret: string, amount: number) => void; // ⭐ Cambiado aquí
}

export default function SendOrder({ orderData, onSuccess }: SendOrderProps) {
  const [createOrder, { isLoading, isError }] = useCreatePhotoOrderMutation();
  const [message, setMessage] = useState<string | null>(null);

  // --------------------------
  // 🔎 VALIDACIÓN BÁSICA
  // --------------------------
  const validateOrder = (data: CreatePhotoPrintingOrderDto) => {
    if (!data.title) return "Title is required.";
    if (!data.images || data.images.length === 0)
      return "At least one image is required.";
    if (!data.unitPrice || data.unitPrice <= 0)
      return "Unit price must be greater than 0.";
    return null;
  };

  // --------------------------
  // 🚀 ENVIAR ORDEN
  // --------------------------
  const handleSendOrder = async () => {
    const validationError = validateOrder(orderData);
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      setMessage("Uploading and creating your order...");

      const res = await createOrder(orderData).unwrap();

      console.log("Order Response:", res);

      // ⭐ Enviar datos de pago al componente padre
      onSuccess?.(res.clientSecret, res.amount);

      setMessage("✅ Order created successfully! Proceed to payment.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send order. Please try again.");
    }
  };

  // --------------------------
  // 🔄 FEEDBACK VISUAL
  // --------------------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isError) setMessage("❌ Error sending order.");
  }, [isError]);

  return (
    <motion.div
      className="text-center mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Mensaje de estado */}
      {message && (
        <p
          className={`mb-4 text-sm ${
            message.startsWith("✅")
              ? "text-cyan-400"
              : message.startsWith("❌")
              ? "text-red-400"
              : "text-gray-300"
          }`}
        >
          {message}
        </p>
      )}

      {/* Botón enviar */}
      <button
        onClick={handleSendOrder}
        disabled={isLoading}
        className={`px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 mx-auto transition shadow-lg ${
          isLoading
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-400 text-white hover:shadow-cyan-500/30"
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isLoading ? "Sending..." : "Send Order"}
      </button>
    </motion.div>
  );
}
