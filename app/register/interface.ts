// 🟢 Datos enviados al backend
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;

  // 🔥 Nuevo: datos del dispositivo
  deviceName?: string;
  deviceType?: string;
  os?: string;
  browser?: string;
}


// 🟢 Datos recibidos desde el backend
export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}
