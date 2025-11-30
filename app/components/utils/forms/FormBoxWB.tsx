"use client";
import { formConfig } from "./FormConfig";
import FormWB from "./FormWB";
import { FormBoxWBProps } from "./interfaces/FormBoxWB";

export default function FormBoxWB({
  title,
  children,
  className = "",
  color,
  glowIntensity,
  backgroundType,
  backgroundGradient,
  showPattern,
  textColor,
  inputs = [],
  buttonText = "Enviar",
  buttonClassName = "",
  formClassName = "",
  inputClassName = "inputWB",
  buttonTextColor = "",

  onSubmitForm,
}: FormBoxWBProps) {
  /** ✅ Fallback a la configuración global si no se pasan props */
  const effectiveColor = color || formConfig.theme.color;
  const effectiveTextColor = textColor || formConfig.theme.textColor;
  const effectiveGlow = glowIntensity ?? formConfig.theme.glowIntensity;
  const effectiveBackgroundType = backgroundType || formConfig.theme.backgroundType;
  const effectiveBackgroundGradient =
    backgroundGradient || formConfig.theme.backgroundGradient;
  const effectiveShowPattern = showPattern ?? formConfig.theme.showPattern;

  // ✅ Fallbacks del botón
  const effectiveButtonBackground = formConfig.theme.buttonBackground || effectiveColor;
  const effectiveButtonTextColor =
    buttonTextColor || formConfig.theme.buttonTextColor || "#000";

  const glow = `${effectiveColor}${Math.floor(effectiveGlow * 255)
    .toString(16)
    .padStart(2, "0")}`;

  const background =
    effectiveBackgroundType === "gradient"
      ? `linear-gradient(to bottom, ${effectiveBackgroundGradient.from}, ${effectiveBackgroundGradient.to})`
      : effectiveBackgroundType === "solid"
      ? effectiveBackgroundGradient.from
      : "transparent";

  return (
    <div
      className={`relative overflow-hidden ${formConfig.layout.padding} ${formConfig.layout.borderRadius} border transition-all duration-300 ${className}`}
      style={{
        borderColor: effectiveColor,
        background,
        color: effectiveTextColor,
        boxShadow: `0 0 25px ${glow}`,
        fontFamily: formConfig.typography.fontFamily,
      }}
      
    >
      
   
      {/* 🌌 Patrón decorativo opcional */}
      {effectiveShowPattern && (
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      )}

      {/* 🏷️ Título */}
      <h1
        className={`${formConfig.typography.titleSize} font-bold mb-6 text-center tracking-wide`}
        style={{ color: effectiveTextColor }}
      >
        {title}
      </h1>

      {/* 🧩 Formulario dinámico */}
      <FormWB
        title={title}
        inputs={inputs}
        buttonText={buttonText}
        buttonClassName={buttonClassName}
        formClassName={formClassName || `p-6 ${formConfig.layout.gap}`}
        inputClassName={inputClassName}
        buttonTextColor={effectiveButtonTextColor}
        onSubmitForm={onSubmitForm}
        color={effectiveButtonBackground} // color del botón y glow principal
        textColor={effectiveTextColor}
        glowIntensity={effectiveGlow}
      />

      {/* 🧠 Contenido adicional (opcional) */}
      {children && (
        <div className={`${formConfig.layout.gap} mt-6`}>{children}</div>
      )}
    </div>
  );
}
