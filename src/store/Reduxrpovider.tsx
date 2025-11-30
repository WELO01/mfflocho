// app/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
 // Ajusta el path según tu estructura

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
