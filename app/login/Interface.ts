
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  sessionId:string;
  user: {    
    name: string;
    email: string;
    phoneNumber?: string | null;
    
  };
}


export interface LoginRequest {
  email?: string;
  phoneNumber?: string;

  password: string;

  // 📱 Datos del dispositivo
  deviceName?: string;
  deviceType?: string;
  os?: string;
  browser?: string;
}

export interface UserPreferences {
    language: string;
   
}

export interface ApiErrorResponse {
  statusCode: number;     // Código HTTP (por ejemplo, 400, 401, 500)
  message: string;        // Mensaje legible: "Invalid credentials"
  error: string;          // Tipo de error: "Unauthorized", "Bad Request", etc.
}
