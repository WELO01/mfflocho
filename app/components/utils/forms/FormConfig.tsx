/**
 * 🎨 Configuración global de estilos para los formularios WB
 * Cualquier valor que no se pase como prop en FormBoxWB tomará este por defecto.
 */

export const formConfig = {
  // 🖌️ Tema visual base
  theme: {
    color: "#00fff",            // color principal (borde, glow)
    buttonBackground: "#00fff", // color por defecto del botón
    buttonTextColor: "#ffffff",  // color del texto del botón
    textColor: "#ffffff",        // color del texto general
    glowIntensity: 0.45,         // intensidad del brillo (0 a 1)
    backgroundType: "gradient" as const,
    backgroundGradient: {
      from: "#0a0a0f",
      to: "#14141a",
    },
    showPattern: true,           // muestra el patrón decorativo
  },

  // 🧱 Tipografía base
  typography: {
    titleSize: "text-3xl",       // tamaño del título
    labelSize: "text-sm",        // tamaño de los labels
    inputTextSize: "text-base",  // tamaño del texto de inputs
    fontFamily: "sans-serif",    // familia tipográfica general
  },

  // ⚙️ Comportamiento global
  layout: {
    borderRadius: "rounded-3xl", // radios de las cajas
    padding: "p-10",             // padding principal del contenedor
    gap: "space-y-4",            // separación entre elementos
  },
};
