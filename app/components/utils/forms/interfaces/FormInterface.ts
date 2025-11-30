import { InputConfig } from "./inputsInterfaces";

export interface FormWBProps {
  /** --- Configuración visual --- */
  title: string;
  children?: React.ReactNode;
  className?: string;
  color?: string;
  textColor?: string;
  glowIntensity?: number;
  backgroundType?: "gradient" | "solid" | "pattern";
  backgroundGradient?: { from: string; to: string };
  showPattern?: boolean;
  buttonTextColor : string;

  /** --- Props heredadas de FormWB --- */
  inputs: InputConfig[];
  buttonText?: string;
  buttonClassName?: string;
  formClassName?: string;
  inputClassName?: string;
  onSubmitForm?: (data: Record<string, string>) => Promise<void>;
}
