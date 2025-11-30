/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useRegisterUserMutation } from "./registerApi";

export default function Register() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const errorRef = useRef<HTMLDivElement | null>(null);

  // Control para evitar doble POST
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Un solo ojo para los dos inputs de contraseña
  const [showPasswords, setShowPasswords] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptSMS: false,
  });

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const scrollToError = () => {
    setTimeout(() => {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  // VALIDACIONES DEL FORMULARIO
  const validate = () => {
    if (!/^[a-zA-Z0-9_ ]{3,}$/.test(form.name))
      return "Username must be at least 3 characters and contain only letters or numbers.";

    if (!/\S+@\S+\.\S+/.test(form.email))
      return "Invalid email format.";

    if (!/^\+?[0-9]{7,15}$/.test(form.phoneNumber))
      return "Invalid phone number.";

    if (form.password.length < 6)
      return "Password must be at least 6 characters.";

    if (!/[A-Z]/.test(form.password))
      return "Password must include at least one uppercase letter.";

    if (!/[0-9]/.test(form.password))
      return "Password must include at least one number.";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";

    if (!form.acceptTerms)
      return "You must accept the Terms & Conditions.";

    if (!form.acceptSMS)
      return "You must accept receiving SMS notifications.";

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSubmitted) return;
    setHasSubmitted(true);
    setFeedback(null);

    // Validación manual
    const validationError = validate();
    if (validationError) {
      setFeedback({ type: "error", message: validationError });
      setHasSubmitted(false);
      scrollToError();
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
        acceptedTerms: true,
        acceptedSMS: true,
        acceptedAt: new Date().toISOString(),
      };

      await registerUser(payload).unwrap();

      setFeedback({
        type: "success",
        message: "Account created successfully!",
      });

      scrollToError();

      setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      console.error("❌ Register error:", err);

      const backendMessage =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Something went wrong.";

      setFeedback({
        type: "error",
        message: backendMessage,
      });

      scrollToError();
      setHasSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-black/70 border border-cyan-400/40 p-10 
        rounded-3xl shadow-[0_0_45px_#00ffff99] backdrop-blur-sm"
      >
        <h2 className="text-center text-3xl text-white font-bold mb-8">
          Create Account
        </h2>

        {/* CAMPOS DE TEXTO */}
        {[
          { label: "Username", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phoneNumber", type: "text" },
        ].map((input) => (
          <div className="mb-4" key={input.name}>
            <label className="block text-white mb-1">{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              value={(form as any)[input.name]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-400/40 
              text-white focus:outline-none focus:border-cyan-300"
            />
          </div>
        ))}

        {/* PASSWORD */}
        <div className="mb-4 relative">
          <label className="block text-white mb-1">Password</label>

          <input
            type={showPasswords ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-400/40 
            text-white focus:outline-none focus:border-cyan-300 pr-12"
          />

          {/* OJO ÚNICO */}
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="absolute right-3 top-10 transform -translate-y-1/2 text-cyan-300 hover:text-cyan-100"
          >
            {showPasswords ? (
              // eye-off
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                  d="M6.228 6.228l11.547 11.547M15.54 15.54A3 3 0 019.88 9.88m4.24 4.24A3 3 0 009.88 9.88M3 12s3.5-7 9-7c2.165 0 4.071.775 5.657 2.06M21 12s-3.5 7-9 7" />
              </svg>
            ) : (
              // eye
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4 relative">
          <label className="block text-white mb-1">Confirm Password</label>

          <input
            type={showPasswords ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-400/40 
            text-white focus:outline-none focus:border-cyan-300 pr-12"
          />
        </div>

        {/* TERMS */}
        <label className="flex gap-3 text-white text-sm mt-2 mb-3 items-start">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleChange}
            className="w-4 h-4 accent-cyan-400 cursor-pointer"
          />
          <span>
            I agree to the{" "}
            <a href="/policies/terms" className="text-cyan-400 underline" target="_blank">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/policies/privacy-policy" className="text-cyan-400 underline" target="_blank">
              Privacy Policy
            </a>.
          </span>
        </label>

        {/* SMS CONSENT */}
        <label className="flex gap-3 text-white text-sm mb-6 items-start">
          <input
            type="checkbox"
            name="acceptSMS"
            checked={form.acceptSMS}
            onChange={handleChange}
            className="w-4 h-4 accent-cyan-400 cursor-pointer"
          />
          <span>
            I agree to receive SMS updates for account verification,
            shipping notifications, and important alerts.
          </span>
        </label>

        {/* BOTÓN */}
        <button
          disabled={isLoading || hasSubmitted}
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
          font-semibold transition-all disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Create Account"}
        </button>

        {/* FEEDBACK */}
        {feedback && (
          <div
            ref={errorRef}
            className={`mt-4 px-4 py-2 rounded-lg text-center ${
              feedback.type === "success"
                ? "bg-green-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </form>
    </div>
  );
}
