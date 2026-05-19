import { supabase } from "./supabase.js";

const confirmBtn = document.querySelector(".confirm-btn");
const nameInput = document.querySelector("#name");
const companyInput = document.querySelector("#company");
const locationInput = document.querySelector("#location");

confirmBtn.addEventListener("click", async () => {
  const registrationData = {
    selected_date: localStorage.getItem("selectedEventDate"),
    event_title: localStorage.getItem("selectedEventTitle"),
    name: nameInput.value.trim(),
    company: companyInput.value.trim(),
    location: locationInput.value.trim(),
    roles: ["example"]
  };

  const { error } = await supabase
    .from("event_registrations")
    .insert([registrationData]);

  if (error) {
    console.error(error);
    alert("Registratie mislukt.");
    return;
  }

  window.location.href = "confirmation.html";
});