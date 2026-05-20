import { createClient } from "@supabase/supabase-js";
console.log("URL:", import.meta.env.VITE_SUPABASE_URL);

console.log("KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or key is missing. Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);


// als je deze code in een React component wilt gebruiken, kun je het volgende doen: 
// import { supabase } from ""./supabase.js";
