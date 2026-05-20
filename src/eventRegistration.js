import { supabase } from "./supabase.js";

const translations = {
  en: {
    goBack: "Go back",
    registrationTitle: "Event Registration",
    registrationSubtitle:
      "Tell us about yourself so we can connect you with the right people",
    yourName: "Your name",
    yourNamePlaceholder: "Enter your full name",
    workPlace: "Where do you work?",
    workPlacePlaceholder: "Company name or studio",
    email: "Email",
    emailPlaceholder: "Enter your email address",
    meetPeople: "Who would you like to meet?",
    rolesSubtitle: "Select all roles that interest you",
    confirmBtn: "CONFIRM REGISTRATION",
  },
  nl: {
    goBack: "Ga terug",
    registrationTitle: "Event Registratie",
    registrationSubtitle:
      "Vertel ons meer over jezelf zodat we je met de juiste mensen kunnen verbinden",
    yourName: "Jouw naam",
    yourNamePlaceholder: "Voer je volledige naam in",
    workPlace: "Waar werk je?",
    workPlacePlaceholder: "Bedrijfsnaam of studio",
    email: "E-mail",
    emailPlaceholder: "Vul je e-mailadres in",
    meetPeople: "Wie zou je graag ontmoeten?",
    rolesSubtitle: "Selecteer alle rollen die je interesseren",
    confirmBtn: "BEVESTIG REGISTRATIE",
  },
  fr: {
    goBack: "Retour",
    registrationTitle: "Inscription à l'événement",
    registrationSubtitle:
      "Parlez-nous de vous afin que nous puissions vous connecter aux bonnes personnes",
    yourName: "Votre nom",
    yourNamePlaceholder: "Entrez votre nom complet",
    workPlace: "Où travaillez-vous ?",
    workPlacePlaceholder: "Nom de l'entreprise ou studio",
    email: "E-mail",
    emailPlaceholder: "Entrez votre adresse e-mail",
    meetPeople: "Qui aimeriez-vous rencontrer ?",
    rolesSubtitle: "Sélectionnez tous les rôles qui vous intéressent",
    confirmBtn: "CONFIRMER L'INSCRIPTION",
  },
};

function setLanguage(language) {
  localStorage.setItem("language", language);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(`btn-${language}`).classList.add("active");

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.dataset.translate;
    element.textContent = translations[language][key];
  });

  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    const key = element.dataset.placeholder;
    element.placeholder = translations[language][key];
  });
}

document.getElementById("btn-nl").addEventListener("click", () => {
  setLanguage("nl");
});

document.getElementById("btn-en").addEventListener("click", () => {
  setLanguage("en");
});

document.getElementById("btn-fr").addEventListener("click", () => {
  setLanguage("fr");
});

setLanguage(localStorage.getItem("language") || "en");

const roles = [
  "Producer",
  "Developer",
  "Designer",
  "Sound Engineer",
  "Animator",
  "Director",
  "Project Manager",
  "Marketing Specialist",
  "Content Creator",
  "Photographer",
  "Video Editor",
  "Copywriter",
];

const rolesGrid = document.getElementById("rolesGrid");
const confirmBtn = document.getElementById("confirmBtn");
const nameInput = document.getElementById("nameInput");
const companyInput = document.getElementById("companyInput");
const emailInput = document.getElementById("emailInput");

let selectedRoles = [];

roles.forEach((role) => {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("role-btn");
  button.textContent = role;

  button.addEventListener("click", () => {
    button.classList.toggle("active");

    if (selectedRoles.includes(role)) {
      selectedRoles = selectedRoles.filter((item) => item !== role);
    } else {
      selectedRoles.push(role);
    }

    validateForm();
  });

  rolesGrid.appendChild(button);
});

function validateForm() {
  const hasName = nameInput.value.trim() !== "";
  const hasCompany = companyInput.value.trim() !== "";
  const hasEmail = emailInput.value.trim() !== "";
  const hasRoles = selectedRoles.length > 0;

  if (hasName && hasCompany && hasEmail && hasRoles) {
    confirmBtn.classList.add("active");
  } else {
    confirmBtn.classList.remove("active");
  }
}

nameInput.addEventListener("input", validateForm);
companyInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);

confirmBtn.addEventListener("click", async () => {
  if (!confirmBtn.classList.contains("active")) return;

  confirmBtn.disabled = true;

  const registrationData = {
    selected_date: localStorage.getItem("selectedEventDate"),
    event_title: localStorage.getItem("selectedEventTitle"),
    name: nameInput.value.trim(),
    company: companyInput.value.trim(),
    email: emailInput.value.trim(),
    roles: selectedRoles,
  };

  const { error } = await supabase
    .from("event_registrations")
    .insert([registrationData]);

  if (error) {
    alert("Registratie mislukt. Probeer later opnieuw.");
    confirmBtn.disabled = false;
    return;
  }

  localStorage.setItem("eventRegistration", JSON.stringify(registrationData));

  window.location.href = "confirmation.html";
});
