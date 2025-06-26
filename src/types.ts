// src/types.ts

export interface FormData {
  name: string; // Nombre del negocio
  ownerName: string; // Nombre del dueño
  email: string;
  phone: string;
  address: string; // Dirección del negocio
  category: string;
  description: string; // Descripción del negocio
  website: string; // Opcional, pero tipo string
  agreeToTerms: boolean;
  images: File[];
}

export interface FormErrors {
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  description: string;
  agreeToTerms: string;
  // 'website' no está aquí porque no hay validación de error para él
}

// src/types.ts

// ... (Mantén tus interfaces FormData y FormErrors existentes) ...

export interface Entrepreneurship {
  id: string;
  name: string;
  category: string;
  description: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  hours?: string;
  products: string[];
  images: string[]; // <-- NOTA: aquí es string[] porque son las URLs públicas
}