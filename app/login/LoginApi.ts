import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "./Interface";

export interface RefreshRequest {
  token: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export const LoginApi = createApi({
  reducerPath: "LoginApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    // LOGIN  --> POST /auth/login
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",    // 👈 AQUÍ SE MANEJA LA RUTA
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // REFRESH TOKEN  --> POST /auth/refresh
    refreshToken: builder.mutation<RefreshResponse, RefreshRequest>({
      query: ({ token }) => ({
        url: "/auth/refresh",  // 👈 AQUÍ TAMBIÉN
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRefreshTokenMutation,
} = LoginApi;
