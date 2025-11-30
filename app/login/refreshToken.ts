/* eslint-disable @typescript-eslint/no-explicit-any */



export const refreshTokenRequest = async (refreshToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      }
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Error en refreshTokenRequest:", error);
    return null;
  }
};
