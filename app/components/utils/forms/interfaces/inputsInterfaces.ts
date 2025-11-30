
export interface InputConfig  {
  name: string;
  label?: string;
  type?: string;
  validate?: string[]
  placeholder?: string;
  required?: boolean;
   confirm?: boolean;
};


export interface InputsProps  {
  inputs: InputConfig[];
  className?: string; // clase extra para el contenedor
  inputClassName?: string; // para override puntual
  color?: string; // color principal del borde / glow
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values?: Record<string, string>;
  errors?: Record<string, string>;
  // nuevo flag opcional para campos de confirmación

  /** 🎨 tema visual dinámico */
  textColor?: string; // color del texto
  glowIntensity?: number;
  
};