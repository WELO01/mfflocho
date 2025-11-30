"use client";

import { setCredentials } from "@/app/login/slice";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
  sessionId:string
  expiresIn?: number;
}

// 👇 Solo dominio/puerto y opcionalmente /api, pero SIN /auth
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;

    if (token) {
      // tú no usas Bearer
      headers.set("authorization", token);
    }

    return headers;
  },
});

type BaseQueryWithReauth = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

export const baseQueryWithReauth: BaseQueryWithReauth = async (
  args,
  api,
  extraOptions
) => {
  const requestUrl = typeof args === "string" ? args : args.url;

  // 🔍 Normalizamos args para poder ver qué estamos mandando
  const normalizedArgs: FetchArgs =
    typeof args === "string" ? { url: args, method: "GET" } : args;

  // LOG: lo que estás mandando en la petición original
  console.log("➡️ Petición SALIENTE (original)", {
    baseUrl,
    url: normalizedArgs.url,
    method: normalizedArgs.method ?? "GET",
    body: normalizedArgs.body,
  });

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("❌ 401 en petición original", {
      url: requestUrl,
      status: result.error.status,
      data: (result.error as FetchBaseQueryError).data,
    });

    // No refrescamos si es el propio login o refresh
    if (requestUrl === "/auth/login" || requestUrl === "/auth/refresh") {
      return result;
    }

    const state = api.getState() as RootState;
    const { refreshToken, sessionId } = state.auth || {};

    if (!refreshToken || !sessionId) {
      console.log("⚠️ No hay refreshToken o sessionId, no se puede refrescar.", {
        refreshToken,
        sessionId,
      });
      return result;
    }

    // LOG: lo que VAS A ENVIAR al endpoint de refresh
    console.log("🔁 Intentando REFRESH en /auth/refresh con payload:", {
      refreshToken,
      sessionId,
    });

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: {
          refreshToken,
          sessionId,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as RefreshResponse;
      console.log("✅ Refresh OK, respuesta del backend:", data);

      api.dispatch(
  setCredentials({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken ?? refreshToken,
    sessionId: data.sessionId,   // 👈 AGREGADO
  })
);

      // LOG: reintento de la petición original
      console.log("🔁 Reintentando petición original después del refresh", {
        originalUrl: requestUrl,
        originalArgs: normalizedArgs,
      });

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      
      ;
    }
  }

  return result;
};
