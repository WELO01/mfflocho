"use client";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { InputsProps } from "./interfaces/inputsInterfaces";

export default function InputsWB({
  inputs,
  className = "",
  inputClassName = "",
  onChange,
  values = {},
  errors = {},
  color = "#00ffff",
  textColor = "#ffffff",
  glowIntensity = 0.3,
}: InputsProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [confirmValues, setConfirmValues] = useState<Record<string, string>>({});

  // 🧠 Traductores
  const t = useTranslations("register.inputs");
  const v = useTranslations();

  const toggleVisibility = (name: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const glow = `${color}${Math.floor(glowIntensity * 255)
    .toString(16)
    .padStart(2, "0")}`;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {inputs.map((input) => {
        const hasError = !!errors[input.name];
        const isPassword = input.type === "password";
        const confirmField = input.confirm;
        const showPass = visiblePasswords[input.name];

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>, isConfirm = false) => {
          if (isConfirm) {
            setConfirmValues((prev) => ({ ...prev, [input.name]: e.target.value }));
          } else {
            onChange?.(e);
          }
        };

        const passwordMismatch =
          confirmField &&
          confirmValues[input.name] &&
          values[input.name] &&
          confirmValues[input.name] !== values[input.name];

        // ✅ Traduce el error si es una clave conocida
        let errorMessage = errors[input.name];
        if (errorMessage?.startsWith("validator.")) {
          const key = errorMessage; // ej: validator.passwordWeak
          errorMessage = v(key); // traduce con el namespace validator
        }

        return (
          <div key={input.name} className="flex flex-col gap-3">
            <div className="relative">
              <input
                id={input.name}
                name={input.name}
                type={showPass && isPassword ? "text" : input.type || "text"}
                placeholder={input.placeholder || input.label}
                required={input.required}
                className={`inputWB ${inputClassName} pr-10`}
                value={values[input.name] || ""}
                onChange={(e) => handleChange(e)}
                style={{
                  background: "transparent",
                  border: `1px solid ${
                    hasError ? "rgba(255,0,0,0.6)" : `${color}55`
                  }`,
                  color: textColor,
                  boxShadow: hasError
                    ? "0 0 12px rgba(255,0,0,0.4)"
                    : `0 0 12px ${glow}`,
                }}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => toggleVisibility(input.name)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>

            {/* ⚠️ Mensaje de error traducido */}
            {hasError && (
                <p
    className="text-xs mt-1 leading-snug"
    style={{
      color: "rgba(255,80,80,0.9)",
      maxWidth: "260px", // 🟢 ajusta el valor que quieras
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflowWrap: "break-word",
    }}
  >
    {errorMessage}
  </p>

            )}

            {/* Campo de confirmación */}
            {confirmField && (
              <div className="relative mt-5">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder={t("confirmPassword")}
                  className={`inputWB ${inputClassName} pr-10`}
                  value={confirmValues[input.name] || ""}
                  onChange={(e) => handleChange(e, true)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${
                      passwordMismatch ? "rgba(255,0,0,0.6)" : `${color}55`
                    }`,
                    color: textColor,
                    boxShadow: passwordMismatch
                      ? "0 0 12px rgba(255,0,0,0.4)"
                      : `0 0 12px ${glow}`,
                  }}
                />

                {passwordMismatch && (
                  <p className="text-xs mt-1" style={{ color: "rgba(255,80,80,0.9)" }}>
                    {t("passwordMismatch")}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
