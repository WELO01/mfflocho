"use client";
import { useMemo, useState } from "react";
import InputsWB from "./InputWB";
import { validators } from "./functions/validator";

import { useTranslations } from "next-intl";
import { translateErrors } from "./functions/translateErrors";
import { FormWBProps } from "./interfaces/FormInterface";

// Ajusta color (igual que ya tenías)
const adjustColor = (hex: string, amount: number): string => {
  let color = hex.replace("#", "");
  if (color.length === 3) color = color.split("").map((c) => c + c).join("");
  const num = parseInt(color, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `rgb(${r}, ${g}, ${b})`;
};

export default function FormWB({
  inputs,
  className = "",
  inputClassName = "",
  buttonText = "Submit",
  buttonClassName = "",
  formClassName = "flex flex-col gap-6",
  onSubmitForm,
  color = "#00ffff",
  textColor = "#ffffff",
  glowIntensity = 0.4,
  buttonTextColor = "#000",
  /** 🆕 función traductora opcional (por ejemplo useTranslations()) */
  translate, // (key: string) => string
}: FormWBProps & { translate?: (key: string) => string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
 const t = useTranslations('register');
  

  const glow = useMemo(() => {
    return `${color}${Math.floor(glowIntensity * 255)
      .toString(16)
      .padStart(2, "0")}`;
  }, [color, glowIntensity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Devuelve CLAVES i18n (no textos)
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    inputs.forEach((input) => {
      const value = formData[input.name]?.trim() || "";

      if (input.required && !value) {
        newErrors[input.name] = "validators.required"; // clave
        return;
      }
      if (input.validate) {
        for (const rule of input.validate) {
          const validator = validators[rule];
          if (validator && !validator(value)) {
            newErrors[input.name] = validator.message; // clave del validador
            break;
          }
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (onSubmitForm) await onSubmitForm(formData);
    } finally {
      setLoading(false);
    }
  };

  // Colores derivados para animación
  const hoverColor = adjustColor(color, -30);
  const pulseColor = adjustColor(color, 40);

  // 🧠 Traduce aquí SOLO para mostrar
  
  const displayErrors = translateErrors(errors, translate);
 

  return (
    <form
      onSubmit={handleSubmit}
      className={`${formClassName} ${className}`}
      style={{ color: textColor }}
    >
      <InputsWB
        inputs={inputs}
        className={className}
        inputClassName={inputClassName}
        onChange={handleChange}
        values={formData}        
        errors={displayErrors}        /* 👈 ya viene traducido */
        color={color}
        textColor={textColor}
        glowIntensity={glowIntensity}
      />

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`relative font-semibold px-10 py-3 rounded-lg transition-all duration-300 ${buttonClassName}`}
          style={{
            backgroundColor: color,
            color: buttonTextColor,
            boxShadow: `0 0 12px ${glow}, 0 0 24px ${glow}`,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            animation: "pulseGlow 2s infinite alternate",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              hoverColor;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = color;
          }}
        >
      {loading ? (t("button.submitting")) : (t("button.submitted"))}
        </button>
      </div>

      <style jsx>{`
        @keyframes pulseGlow {
          from { box-shadow: 0 0 8px ${color}, 0 0 16px ${pulseColor}; }
          to   { box-shadow: 0 0 20px ${color}, 0 0 35px ${pulseColor}; }
        }
      `}</style>
    </form>
  );
}
