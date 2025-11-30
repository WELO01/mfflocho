# 🧩 FormWB v1.0.0

🧩 Descripción completa — FormWB

FormWB es un componente de formulario modular, dinámico y reutilizable diseñado para React y Next.js.
Su objetivo principal es simplificar la creación de formularios que normalmente requerirían escribir múltiples líneas de código repetitivas (inputs, validaciones, estados, envíos, errores, etc.), permitiendo definirlos a partir de una simple configuración en formato de arreglo (inputs).

Está pensado para desarrollos escalables y mantenibles, donde se requiere consistencia visual, validación estandarizada y flexibilidad funcional, sin depender de librerías externas como Formik o React Hook Form.

⚙️ ¿Cómo funciona?

FormWB funciona como un contenedor inteligente que:

Recibe una lista de campos (inputs) con su configuración.

Genera automáticamente los inputs usando el componente InputsWB.

Maneja internamente el estado del formulario (formData y errors).

Ejecuta validaciones automáticas según las reglas definidas en validator.ts.

Muestra mensajes de error de forma visual y controlada.

Llama a una función externa (onSubmitForm) cuando el formulario es válido, delegando el envío o integración a APIs, bases de datos o estados globales.

🧱 Estructura interna del sistema
FormWB
 ├── InputsWB
 ├── validator.ts
 └── interfaces/inputsInterfaces.ts

🔹 FormWB.tsx

Controla:

El estado del formulario (formData, errors, loading)

La validación de los campos

El evento de envío (onSubmitForm)

El renderizado del botón y el control del estado de envío

🔹 InputsWB.tsx

Renderiza los campos dinámicamente a partir del arreglo de configuración, con soporte para:

Etiquetas (label)

Placeholder

Tipos (text, email, password, etc.)

Estados visuales de error

Clases personalizadas (inputClassName)

🔹 validator.ts

Define las reglas de validación reutilizables, como:

Email válido

Teléfono numérico

Contraseña segura

Y permite agregar tus propias reglas personalizadas

🔹 inputsInterfaces.ts

Define las interfaces TypeScript que estructuran cómo deben declararse los inputs y las props del formulario, asegurando consistencia tipada en todo el sistema.

🧠 Filosofía del diseño

FormWB está diseñado bajo los principios de:

1️⃣ Configuración sobre codificación

Cada formulario se define solo con una lista de objetos:

[
  { name: "email", label: "Correo", required: true, validate: ["email"] },
  { name: "password", label: "Contraseña", type: "password", required: true }
]


En lugar de escribir manualmente cada input, estado y validación.

2️⃣ Separación de responsabilidades

FormWB maneja la lógica y validación.

InputsWB maneja el renderizado visual.

validator.ts maneja las reglas de validación.

Esto permite actualizar o reemplazar una parte (por ejemplo, los estilos o las reglas) sin afectar el resto del sistema.

3️⃣ Extensibilidad

Puedes agregar:

Nuevos tipos de validaciones

Nuevos temas visuales (theme-black-neon, theme-red-neon, etc.)

O incluso reemplazar InputsWB por tu propia versión visual (por ejemplo, Material UI o Shadcn/UI) sin modificar FormWB.

4️⃣ Control completo del envío

El formulario no asume ningún destino: tú decides qué hacer con los datos:

Llamar una API (fetch, axios, etc.)

Actualizar un estado global (Redux, Zustand, Context)

Guardar localmente o validar offline

🧩 Ejemplo del flujo interno
[Usuario escribe datos] ➜
handleChange() ➜
formData = { email: "user@correo.com", password: "123456" }

[Usuario presiona enviar] ➜
validateForm() verifica cada input:
 - requerido
 - reglas de validación
 ➜ si hay errores: setErrors({ email: "Correo inválido" })
 ➜ si no hay errores: onSubmitForm(formData)

🧰 Propiedades principales
Prop	Tipo	Descripción
inputs	InputConfig[]	Arreglo de configuración de inputs.
onSubmitForm	(data: Record<string, string>) => Promise<void>	Función encargada de manejar el envío.
formClassName	string	Clases Tailwind adicionales para el formulario.
inputClassName	string	Clases aplicadas a cada input (para estilos dinámicos).
buttonText	string	Texto del botón.
buttonClassName	string	Estilo del botón (tema, color, etc.).
className	string	Clases aplicadas al contenedor de inputs.
🎨 Estilos y temas

FormWB es totalmente compatible con Tailwind CSS.
Puedes aplicar clases personalizadas o temas predefinidos para cambiar el aspecto visual de todos los inputs.

Ejemplo de tema:

.theme-black-neon .inputWB {
  @apply bg-transparent border-cyan-400/40 text-white shadow-[0_0_12px_rgba(0,255,255,0.12)];
}


Uso:

<div className="theme-black-neon">
  <FormWB ... />
</div>

💡 Casos de uso recomendados
Caso	Descripción
🧾 Formularios de contacto	Enviar mensajes a tu API o correo
🔑 Formularios de login / registro	Validar email y contraseña
⚙️ Formularios de configuración	Guardar preferencias del usuario
💳 Formularios de pago	Integrar con Stripe, PayPal, etc.
🧩 Ejemplo completo
import { FormWB } from "@tuusuario/formwb";

export default function RegisterForm() {
  const registerUser = async (data: Record<string, string>) => {
    console.log("Registrando usuario:", data);
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

 # return (
    <FormWB
      inputs={[
        { name: "name", label: "Nombre completo", required: true },
        { name: "email", label: "Correo", required: true, validate: ["email"] },
        { name: "password", label: "Contraseña", type: "password", required: true, validate: ["strongPassword"] },
      ]}
      buttonText="Crear cuenta"
      buttonClassName="bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg"
      formClassName="theme-black-neon p-6 rounded-2xl space-y-4"
      inputClassName="inputWB"
      onSubmitForm={registerUser}
    />
  );
}

🔁 Ventajas principales

✅ 100% reutilizable – un solo componente para todos tus formularios
✅ 100% configurable – define inputs, temas y validaciones desde un arreglo
✅ Desacoplado – puedes integrarlo con cualquier API o estado global
✅ Rápido de mantener – sin repetir código, sin dependencias externas
✅ Ligero – compilado en menos de 10 KB (sin dependencias pesadas)

🏁 En resumen

FormWB fue creado para ayudarte a:

Estandarizar la forma en que haces formularios

Mantener un diseño consistente (usando temas y clases)

Validar fácilmente sin escribir lógica repetida

Conectarlo con cualquier backend o flujo que necesites

En una sola línea:

⚙️ FormWB convierte tus ideas de formulario en componentes reutilizables, personalizables y listos para producción.

¿Quieres que te agregue una versión más corta de esta descripción para ponerla directamente en el README.md del paquete npm (2–3 párrafos optimiza

---

FormWB
 ├── InputsWB
 ├── validator.ts (validaciones base)
 └── interfaces/inputsInterfaces.ts

 import { FormWB } from "@tuusuario/formwb";

export default function ContactPage() {
  const sendContactForm = async (data: Record<string, string>) => {
    console.log("📤 Enviando datos...", data);
    await new Promise((r) => setTimeout(r, 1500));
    alert("Formulario enviado correctamente ✅");
  };

#  return (
    <div className="max-w-md mx-auto mt-10">
      <FormWB
        inputs={[
          { name: "name", label: "Nombre", required: true },
          { name: "email", label: "Correo", required: true, validate: ["email"] },
          { name: "message", label: "Mensaje", required: true },
        ]}
        inputClassName="inputWB"
        className="theme-black-neon"
        formClassName="theme-black-neon p-6 rounded-2xl space-y-4"
        buttonText="Enviar mensaje"
        buttonClassName="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg"
        onSubmitForm={sendContactForm}
      />
    </div>
  );
#}

| Prop              | Tipo                                              | Requerido | Descripción                                             |
| ----------------- | ------------------------------------------------- | --------- | ------------------------------------------------------- |
| `inputs`          | `InputConfig[]`                                   | ✅         | Lista de objetos que definen los campos del formulario. |
| `onSubmitForm`    | `(data: Record<string, string>) => Promise<void>` | ✅         | Función que maneja el envío del formulario.             |
| `formClassName`   | `string`                                          | ❌         | Clases Tailwind adicionales para el formulario.         |
| `inputClassName`  | `string`                                          | ❌         | Clases extra para cada input.                           |
| `buttonText`      | `string`                                          | ❌         | Texto del botón (por defecto `"Enviar"`).               |
| `buttonClassName` | `string`                                          | ❌         | Clases Tailwind para personalizar el botón.             |
| `className`       | `string`                                          | ❌         | Clases que se aplican al contenedor de los inputs.      |

InputConfig estructura

Cada campo del formulario se define como un objeto con esta forma:

interface InputConfig {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  validate?: string[]; // nombres de validadores (opcional)
}


Ejemplo:

{ name: "email", label: "Correo", required: true, validate: ["email"] }

✅ Validaciones disponibles

Definidas en validator.ts (puedes extenderlas fácilmente):

Nombre	Regla	Mensaje
email	Debe tener formato de correo	"Correo electrónico inválido"
phone	Solo números de 8 a 15 dígitos	"Número de teléfono inválido"
strongPassword	Mínimo 8 caracteres, 1 número, 1 mayúscula	"La contraseña debe tener 8 caracteres, un número y una mayúscula"

Agregar una nueva:

validators.username = Object.assign(
  (v) => /^[a-zA-Z0-9_]{4,16}$/.test(v),
  { message: "Usuario inválido (solo letras, números o _)" }
);

🎨 Estilos y temas

El formulario y los inputs son totalmente personalizables con Tailwind CSS.

Ejemplo de clases de tema:

.theme-black-neon .inputWB {
  @apply bg-transparent border-cyan-400/40 text-white shadow-[0_0_12px_rgba(0,255,255,0.12)];
}


En tu JSX:

<div className="theme-black-neon">
  <FormWB ... />
</div>

🧪 Demo interna (opcional)

Puedes probar el componente directamente creando un archivo:

📄 FormWB.demo.tsx

"use client";
import { FormWB } from "@tuusuario/formwb";

export default function FormWBDemo() {
  const handleSend = async (data: Record<string, string>) => {
    console.log("Datos enviados:", data);
    alert("✅ Enviado con éxito");
  };

#  return (
    <div className="max-w-md mx-auto mt-10">
      <FormWB
        inputs={[
          { name: "name", label: "Nombre", required: true },
          { name: "email", label: "Correo", required: true, validate: ["email"] },
          { name: "password", label: "Contraseña", type: "password", required: true, validate: ["strongPassword"] },
        ]}
        formClassName="theme-black-neon p-6 rounded-2xl space-y-4"
        buttonText="Probar formulario"
        onSubmitForm={handleSend}
      />
    </div>
  );
}


Ejecuta en tu app:

/demo/form

🧩 Ejemplo de estructura del paquete
formwb-package/
 ├── src/
 │   ├── FormWB.tsx
 │   ├── InputsWB.tsx
 │   ├── functions/validator.ts
 │   ├── interfaces/inputsInterfaces.ts
 │   └── index.ts
 ├── package.json
 ├── tsconfig.json
 ├── README.md
 └── docs/
     └── FormWB.md

🏷️ Versiones
Versión	Fecha	Cambios
1.0.0	2025-11-03	Publicación inicial con validaciones, props dinámicas y demo.
👤 Autor

@tuusuario
📦 npm: @tuusuario/formwb

📧 contacto: tuemail@dominio.com

🗓️ Licencia MIT

## 🚀 Instalación

```bash
npm install @tuusuario/formwb
