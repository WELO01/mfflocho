/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseQueryWithReauth } from "@/src/store/basequery"; // 👈 IMPORTANTE
import { createApi } from "@reduxjs/toolkit/query/react";

// 🧩 Tipos de datos que coinciden con tu backend
export interface UserPreference {
  language: "EN" | "ES" | "FR" | "PT";
}

export interface UserProfile {
  name: string;
  email: string;
  phoneNumber?: string | null;
  userPreferences?: UserPreference | null;
}

export interface UpdateUserDto {
  name?: string;
  phoneNumber?: string;
  language?: "EN" | "ES" | "FR" | "PT";
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm?: string; // por si lo usas
}

// ⚙️ API de usuario
export const UserApi = createApi({
  reducerPath: "UserApi",

  // 👇 AHORA USAMOS EL BASE QUERY CON REAUTH
  baseQuery: baseQueryWithReauth,

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // 👤 Obtener perfil del usuario autenticado
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // ✏️ Actualizar perfil
    updateUserProfile: builder.mutation<UserProfile, UpdateUserDto>({
      query: (body) => ({
        url: "/user/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // 🔒 Cambiar contraseña
    changePassword: builder.mutation<{ message: string }, ChangePasswordDto>({
      query: (body) => ({
        url: "/user/change-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = UserApi;
