"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 🎯 DTO: los únicos valores permitidos para crear una orden
export interface CreatePhotoPrintingOrderDto {
  title: string;
  unitPrice: number;
  quantity?: number;
  width?: number;
  height?: number;
  sizeLabel?: string;
  paperType?: string;
  finishType?: string;
  colorProfile?: string;
  notes?: string;
  images: File[]; // Archivos reales
}
export interface CreatePhotoOrderResponse {
  message: string;
  order: string; // o number si lo cambias
  clientSecret: string;
  amount: number;
}



// 🧩 Función auxiliar para convertir DTO → FormData
function buildPhotoOrderFormData(data: CreatePhotoPrintingOrderDto): FormData {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("unitPrice", data.unitPrice.toString());

  if (data.quantity) formData.append("quantity", data.quantity.toString());
  if (data.width) formData.append("width", data.width.toString());
  if (data.height) formData.append("height", data.height.toString());
  if (data.sizeLabel) formData.append("sizeLabel", data.sizeLabel);
  if (data.paperType) formData.append("paperType", data.paperType);
  if (data.finishType) formData.append("finishType", data.finishType);
  if (data.colorProfile) formData.append("colorProfile", data.colorProfile);
  if (data.notes) formData.append("notes", data.notes);

  // Solo se aceptan archivos del tipo File[]
  data.images.forEach((file) => {
    if (!(file instanceof File)) {
      throw new Error("❌ Invalid image file type.");
    }
    formData.append("files", file);
  });

  return formData;
}

export const PhotoPrintingApi = createApi({
  reducerPath: "PhotoPrintingApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"}/orders/photoPrinting`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 🧾 Crear orden de impresión segura
    createPhotoOrder: builder.mutation<CreatePhotoOrderResponse, CreatePhotoPrintingOrderDto>({
      query: (orderData) => {
        const formData = buildPhotoOrderFormData(orderData);
        return {
          url: "",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useCreatePhotoOrderMutation } = PhotoPrintingApi;
