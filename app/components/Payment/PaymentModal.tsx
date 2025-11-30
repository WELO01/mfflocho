"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
  clientSecret: string;
  amount: number;
  onClose: () => void;
}

export default function PaymentModal({ clientSecret, amount, onClose }: Props) {
  if (!clientSecret) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        className="bg-[#0d1b24] rounded-xl p-6 w-full max-w-md shadow-xl relative"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-cyan-300 text-xl text-center font-bold mb-4">
          Complete Your Payment
        </h2>

        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "night" } }}
        >
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
