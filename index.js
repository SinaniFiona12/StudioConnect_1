import { supabase } from "./src/supabase.js";

async function testConnection() {
  const { data, error } = await supabase
    .from("news")
    .select("*");

  if (error) {
    console.error("ERROR:", error);
    return;
  }

  console.log("SUCCESS:", data);
}

testConnection();