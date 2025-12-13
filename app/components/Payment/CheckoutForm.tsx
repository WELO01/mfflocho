/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useState } from "react";
import flochoLogo from "../assets/flochologo.svg";

interface CheckoutFormProps {
  amount: number; // centavos (ej: 150 = $1.50)
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [showPayment, setShowPayment] = useState(true);
  const [loading, setLoading] = useState(false);

  const formattedAmount = (amount / 100).toFixed(2);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  setLoading(true);
  setMessage("");

  const result = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/payment/success`,
    },
    redirect: "if_required", // ✅ ESTE es el cambio clave para que exista paymentIntent en el tipo
  });

  setLoading(false);

  if (result.error) {
    setMessage(result.error.message ?? "Payment failed");
    return;
  }

  // ✅ paymentIntent puede venir cuando no hubo redirect
  if (result.paymentIntent?.status === "succeeded") {
    setOpenSuccessModal(true);
    setTimeout(() => {
      setOpenSuccessModal(false);
      setShowPayment(false);
    }, 3000);
  } else {
    // En muchos métodos (wallets/3DS) puede haber redirect o status diferente.
    // Tu confirmación real debe venir por webhook / return_url.
  }
};



  return (
    <>
      {showPayment && (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          {/* LOGO */}
          <div style={{ marginBottom: 20 }}>
            <Image
              src={flochoLogo}
              alt="Flocho Logo"
              width={80}
              height={80}
              style={{ filter: "drop-shadow(0 0 5px #00ffff)" }}
            />
          </div>

          {/* TOTAL */}
          <h2
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 14,
              color: "#00ffff",
            }}
          >
            Total: ${formattedAmount}
          </h2>

          {/* STRIPE PAYMENT ELEMENT */}
          <div style={{ marginTop: 20 }}>
            <PaymentElement
              options={{
                layout: "tabs", // 👈 recomendado (limpio y moderno)
              }}
            />
          </div>

          {/* PAY BUTTON */}
          <button
            disabled={!stripe || loading}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              background: "black",
              color: "white",
              borderRadius: 8,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              border: "2px solid #00ffff",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Processing..." : `Pay Now $${formattedAmount}`}
          </button>

          {message && (
            <p style={{ color: "red", marginTop: 12 }}>{message}</p>
          )}
        </form>
      )}

      {/* SUCCESS MODAL */}
      {openSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: 40,
              width: "90%",
              maxWidth: 420,
              borderRadius: 16,
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            <Image
              src={flochoLogo}
              alt="Flocho Logo"
              width={70}
              height={70}
              style={{
                margin: "0 auto 20px",
                filter: "drop-shadow(0 0 6px #00ffff)",
              }}
            />

            <div
              style={{
                width: 80,
                height: 80,
                margin: "0 auto 20px",
                borderRadius: "50%",
                background: "#00ffff20",
                border: "3px solid #00ffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00ffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h2 style={{ fontSize: 26, marginBottom: 10 }}>
              Payment Successful
            </h2>

            <p style={{ fontSize: 16, opacity: 0.8 }}>
              Thank you for your payment.  
              <br />
              Your order is being processed 🔥
            </p>
          </div>
        </div>
      )}
    </>
  );
}
