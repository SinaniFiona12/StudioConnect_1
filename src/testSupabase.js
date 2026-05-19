import { supabase } from "./supabase.js";

async function testEventRegistrationsTable() {
  console.log("Test gestart: event_registrations tabel checken...");

  const { data, error } = await supabase
    .from("event_registrations")
    .select("id, created_at, selected_date, event_title, name, company, location, roles")
    .limit(5);

  if (error) {
    console.error("Tabeltest mislukt:", error);

    if (error.code === "42P01") {
      console.error("De tabel bestaat niet of de naam is verkeerd.");
    }

    if (error.message?.includes("permission denied") || error.message?.includes("row-level security")) {
      console.error("De tabel bestaat waarschijnlijk, maar je hebt geen SELECT policy.");
    }

    return;
  }

  console.log("Tabel bestaat en is bereikbaar.");
  console.log("Aantal opgehaalde rijen:", data.length);
  console.log("Data:", data);
}

testEventRegistrationsTable();