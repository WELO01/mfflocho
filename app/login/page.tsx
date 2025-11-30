/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Lock, LogIn, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Closer from "../components/utils/Closer";
import { ApiErrorResponse } from "./Interface";
import { useLoginUserMutation } from "./LoginApi";
import { setCredentials } from "./slice";

// 📌 Función para validar email o teléfono
const validateInput = (input: string): boolean => {
  if (!input) return false;

  if (input.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  const cleaned = input.replace(/[\s()-]/g, "");
  const phoneRegex = /^[0-9]{10,15}$/;

  return phoneRegex.test(cleaned);
};

// 📌 Detectar datos del dispositivo
const getDeviceInfo = () => {
  return {
    deviceName: navigator.userAgent,
    deviceType: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
    os: navigator.platform,
    browser: navigator.userAgent,
  };
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const t = useTranslations("login");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setErrorMessage("");

    // ⚠️ Validaciones
    if (!validateInput(email)) {
      setErrorMessage(t("error_invalid_email_or_phone"));
      return;
    }

    if (!password.trim()) {
      setErrorMessage(t("error_empty_password"));
      return;
    }

    // 📱 Obtener info del dispositivo
    const deviceInfo = getDeviceInfo();

    // 📝 Preparar payload para el backend
    const payload: any = {
      password,
      ...deviceInfo, // deviceName, deviceType, os, browser
    };

    // Detectar si es email o teléfono
    if (email.includes("@")) {
      payload.email = email;
    } else {
      payload.phoneNumber = email.replace(/[\s()-]/g, "");
    }

    try {
      console.log("payload",payload)
      const result = await loginUser(payload).unwrap();
      console.log("✅ Login success:", result);

      // Guardar sesión global
      console.log("🔥 Guardando tokens: ", result.accessToken, result.refreshToken);
      dispatch(
        setCredentials({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          sessionId:result.sessionId,
          userName: result.user.name,
          userEmail: result.user.email,
          userPreferences: { language: "en" },
        })
      );

      router.push("/home");
    } catch (err: unknown) {
      const apiError = (err as { data?: ApiErrorResponse })?.data;
      setErrorMessage(apiError?.message || t("error_invalid"));
    }
  };

  // Detectar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <Closer to="/" color="#00ffff" showLogo />

      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/grid-bg.svg')] bg-cover bg-center opacity-30" />
      <div className="absolute bottom-0 right-0 w-[120%] h-[70%] bg-white rotate-[10deg] translate-y-16" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-cyan-400 text-3xl md:text-4xl font-bold mb-8">
          {t("title")}
        </h1>

        {/* Formulario circular */}
        <div className="bg-white rounded-full p-10 shadow-[0_0_50px_5px_rgba(0,255,255,0.5)] w-80 h-80 flex flex-col justify-center items-center relative">
          {/* Campo email/phone */}
          <div className="flex items-center gap-2 mb-4 w-full">
            <Mail className="text-cyan-500 w-5 h-5" />
            <input
              type="text"
              placeholder={t("email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded-md w-full px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 
              placeholder-black/70"
            />
          </div>

          {/* Campo password */}
          <div className="flex items-center gap-2 mb-6 w-full">
            <Lock className="text-cyan-500 w-5 h-5" />
            <input
              type="password"
              placeholder={t("password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-md w-full px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 
              placeholder-black/70"
            />
          </div>

          {/* Botón */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="bg-cyan-500 text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 hover:bg-cyan-400 transition-all"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? t("loading") : t("button")}
          </button>

          {/* Error */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
          )}
        </div>

        {/* Ayuda */}
        <p className="text-gray-300 text-sm mt-8">
          {t("help_text")}{" "}
          <span className="text-cyan-400 cursor-pointer hover:underline">
            {t("help_link")}
          </span>
        </p>
      </div>
    </div>
  );
}




 {/* Login externo 
          <div className="flex gap-4 mt-5 text-gray-600">
            <button className="hover:text-cyan-500 transition" title="Login con Google">
              <Globe size={20} />
            </button>
            <button className="hover:text-cyan-500 transition" title="Login con Apple">
              <Apple size={22} />
            </button>
          </div>*/}