/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Añade aquí cualquier otra variable de entorno VITE_ que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}