"use client";

import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";


// 🎯 DTO: los datos necesarios
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
  images: File[];
}

export interface CreatePhotoOrderResponse {
  message: string;
  order: string;
  clientSecret: string;
  amount: number;
}

// 🧩 Convertir DTO → FormData
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

  // 🔥 Aquí usamos BASEQUERY REAUTH
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    createPhotoOrder: builder.mutation<
      CreatePhotoOrderResponse,
      CreatePhotoPrintingOrderDto
    >({
      query: (orderData) => {
        const formData = buildPhotoOrderFormData(orderData);

        return {
          url: "/orders/photoPrinting",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useCreatePhotoOrderMutation } = PhotoPrintingApi;
