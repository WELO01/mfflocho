/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function RefreshTester() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendPost = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log("📤 Enviando POST vacío a /auth/hola");

      const response = await fetch("http://localhost:3001/auth/hola", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
        // ⛔ NO body
      });

      const data = await response.json();

      if (!response.ok) {
        setResult({
          error: true,
          message: data.message || "Error desconocido",
        });
      } else {
        setResult({
          error: false,
          message: "SUCCESS",
          data,
        });
      }
    } catch (err: any) {
      setResult({ error: true, message: err?.message ?? String(err) });
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        borderRadius: 12,
        border: "1px solid #ccc",
        fontFamily: "sans-serif",
      }}
    >
      <h2>📡 Simple POST Tester</h2>

      <button
        onClick={sendPost}
        disabled={loading}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          background: loading ? "#888" : "#28a745",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 20,
        }}
      >
        {loading ? "Enviando..." : "Enviar POST vacío"}
      </button>

      {result && (
        <div
          style={{
            padding: 15,
            borderRadius: 8,
            background: result.error ? "#ffe6e6" : "#e6ffe6",
            color: result.error ? "#b30000" : "#006600",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>{result.error ? "❌ Error" : "✅ Success"}</strong>
          <br />
          {result.message}

          {result.data && (
            <pre style={{ marginTop: 10, fontSize: 14 }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
