/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import flochoLogo from "../assets/flochologo.svg"; // <-- IMPORTA TU LOGO

interface CheckoutFormProps {
  amount: number; // El monto viene en centavos desde Stripe backend
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // controla si Stripe Payment Window debe mostrarse
  const [showPayment, setShowPayment] = useState(true);

  // convertir centavos → dólares: 5000 → 50.00
  const formattedAmount = (amount / 100).toFixed(2);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Flocho Payment",
        amount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, amount]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed");
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setOpenSuccessModal(true);

      setTimeout(() => {
        setOpenSuccessModal(false);
        setShowPayment(false);
      }, 3500);
    }
  };

  return (
    <>
      {showPayment && (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          
          {/* LOGO FLOCHO */}
          <div style={{ marginBottom: 20 }}>
            <Image
              src={flochoLogo}
              alt="Flocho Logo"
              width={80}
              height={80}
              style={{
                filter: "drop-shadow(0 0 5px #00ffff)",
              }}
            />
          </div>

          {/* MONTO TOTAL A PAGAR */}
          <h2
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#00ffff",
            }}
          >
            Total: ${formattedAmount}
          </h2>

          {paymentRequest && (
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          )}

          <div style={{ marginTop: 20 }}>
            <PaymentElement />
          </div>

          <button
            disabled={!stripe}
            style={{
              marginTop: 20,
              padding: "12px 24px",
              background: "black",
              color: "white",
              borderRadius: 8,
              fontSize: 16,
              cursor: "pointer",
              border: "2px solid #00ffff",
              transition: "0.3s",
            }}
          >
            Pay Now ${formattedAmount}
          </button>

          {message && (
            <p style={{ color: "red", marginTop: 10 }}>{message}</p>
          )}
        </form>
      )}

      {/* ---------------- MODAL SUCCESS ---------------- */}
      {openSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
              padding: "40px",
              width: "90%",
              maxWidth: "420px",
              borderRadius: 16,
              textAlign: "center",
              color: "black",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
              position: "relative",
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
              Your order is being processed 🔥
            </p>
          </div>
        </div>
      )}
    </>
  );
}
