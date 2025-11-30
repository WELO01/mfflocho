/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    PaymentElement,
    PaymentRequestButtonElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface CheckoutFormProps {
  amount: number;
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [message, setMessage] = useState("");

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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://flocho.com/payment/success",
      },
    });

    if (error) setMessage(error.message || "Payment failed");
  };

  return (
    <form onSubmit={handleSubmit}>
      {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )}

      <PaymentElement />

      <button
        disabled={!stripe}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 6,
        }}
      >
        Pay Now
      </button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
}
