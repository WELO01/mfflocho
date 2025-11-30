"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPreferences {
  language: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  sessionId: string | null; // ← NUEVO

  userName: string | null;
  userEmail: string | null;
  userPreferences: UserPreferences | null;
}

// ------------------------------
// SAFE PARSE
// ------------------------------
const safeParse = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

// ------------------------------
// INITIAL STATE
// ------------------------------
const initialState: AuthState = {
  accessToken:
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null,

  refreshToken:
    typeof window !== "undefined"
      ? localStorage.getItem("refreshToken")
      : null,

  sessionId:
    typeof window !== "undefined"
      ? localStorage.getItem("sessionId")
      : null, // ← NUEVO

  userName:
    typeof window !== "undefined"
      ? localStorage.getItem("userName")
      : null,

  userEmail:
    typeof window !== "undefined"
      ? localStorage.getItem("userEmail")
      : null,

  userPreferences:
    typeof window !== "undefined"
      ? safeParse(localStorage.getItem("userPreferences"))
      : null,
};

// ------------------------------
// SLICE
// ------------------------------
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // --------------------------------------
    // SET CREDENTIALS (LOGIN o REFRESH)
    // --------------------------------------
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        sessionId?: string | null;
        userName?: string | null;
        userEmail?: string | null;
        userPreferences?: UserPreferences | null;
      }>
    ) => {
      const {
        accessToken,
        refreshToken,
        sessionId,
        userName,
        userEmail,
        userPreferences,
      } = action.payload;

      // Token updates
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Save sessionId
      if (sessionId !== undefined) {
        state.sessionId = sessionId;
        if (typeof window !== "undefined") {
          localStorage.setItem("sessionId", sessionId || "");
        }
      }

      // Username
      if (userName !== undefined) {
        state.userName = userName;
        if (typeof window !== "undefined") {
          localStorage.setItem("userName", userName || "");
        }
      }

      // Email
      if (userEmail !== undefined) {
        state.userEmail = userEmail;
        if (typeof window !== "undefined") {
          localStorage.setItem("userEmail", userEmail || "");
        }
      }

      // Preferences
      if (userPreferences !== undefined) {
        state.userPreferences = userPreferences;
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "userPreferences",
            JSON.stringify(userPreferences || {})
          );
        }
      }
    },

    // --------------------------------------
    // CLEAR SESSION (LOGOUT)
    // --------------------------------------
    clearUserSession: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      state.sessionId = null;

      state.userName = null;
      state.userEmail = null;
      state.userPreferences = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPreferences");
      }
    },
  },
});

// Export Actions & Reducer
export const { setCredentials, clearUserSession } = authSlice.actions;
export default authSlice.reducer;
