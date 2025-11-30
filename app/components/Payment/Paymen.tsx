/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

interface PaymentProps {
  clientSecret: string;  // viene del backend
  amount: number;        // en centavos: 2000 = $20
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment({ clientSecret, amount }: PaymentProps) {

  const appearance = {
    theme: "stripe",
  };

  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h2>Complete your payment</h2>

      {/* Mostrar monto */}
      <p style={{ fontWeight: "bold", fontSize: 18 }}>
        Total: ${(amount / 100).toFixed(2)}
      </p>

      {/* Solo renderiza cuando exista clientSecret */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
}
