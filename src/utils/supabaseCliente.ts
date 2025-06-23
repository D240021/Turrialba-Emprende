// utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

console.log("Supabase URL cargada:", supabaseUrl);
console.log("Supabase Key (primeros 10 chars) cargada:", supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'Clave no encontrada');

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Missing Supabase URL or Key in environment variables. Check your .env.local file.");
  throw new Error("Missing Supabase URL or Key. Please check your .env.local file and ensure your Vite development server is restarted.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);