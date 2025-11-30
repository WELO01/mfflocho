import { InputConfig } from "./inputsInterfaces";

/**
 * 🧱 FormBoxWBProps
 * Interfaz principal del contenedor de formularios estilizado (FormBoxWB).
 * Combina control visual, configuración temática y todas las opciones del formulario.
 */
export interface FormBoxWBProps {
  /** --- 🎨 Configuración visual / temática --- */

  /** Título principal del formulario */
  title: string;
    /** Función de traducción para internacionalización */
   translate?: (key: string) => string;
  /** Contenido adicional debajo del formulario (botones sociales, enlaces, etc.) */
  children?: React.ReactNode;

  /** Clases CSS adicionales para el contenedor */
  className?: string;

  /** Color principal del tema (bordes, botón, glow) */
  color?: string;

  /** Color del texto */
  textColor?: string;

  /** Intensidad del brillo (entre 0 y 1) */
  glowIntensity?: number;
 /** Color del texto del botón */
  buttonTextColor ?: string;

  /** Tipo de fondo disponible */
  backgroundType?: "gradient" | "solid" | "pattern";

  /** Colores del degradado o fondo sólido */
  backgroundGradient?: {
    from: string;
    to: string;
  };

  /** Muestra o no el patrón de puntos decorativo */
  showPattern?: boolean;

  /** --- ⚙️ Configuración del formulario interno (FormWB) --- */

  /** Lista de campos a renderizar dinámicamente */
  inputs: InputConfig[];

  /** Texto del botón principal */
  buttonText?: string;

  /** Clases CSS personalizadas para el botón */
  buttonClassName?: string;

  /** Clases CSS personalizadas para el formulario */
  formClassName?: string;

  /** Clases CSS personalizadas para los inputs */
  inputClassName?: string;

  /** Función ejecutada al enviar el formulario */
  onSubmitForm?: (data: Record<string, string>) => Promise<void>;
}
