import { supabase } from "./src/supabase.js";

/* =========================
   LANGUAGE SWITCHER
========================= */

const translations = {
  nl: {
    news: "Nieuws",
    productions: "Actieve Producties",
    home: "Home",
    map: "Map",
    studios: "Studio's",
    event: "Event",
  },

  en: {
    news: "News",
    productions: "Active Productions",
    home: "Home",
    map: "Map",
    studios: "Studios",
    event: "Event",
  },

  fr: {
    news: "Nouvelles",
    productions: "Productions Actives",
    home: "Accueil",
    map: "Carte",
    studios: "Studios",
    event: "Événement",
  },
};

function setLanguage(lang) {

  document.documentElement.lang = lang;

  document.getElementById("newsTitle").textContent =
    translations[lang].news;

  document.getElementById("productionsTitle").textContent =
    translations[lang].productions;

  document.getElementById("navHome").textContent =
    translations[lang].home;

  document.getElementById("navMap").textContent =
    translations[lang].map;

  document.getElementById("navStudios").textContent =
    translations[lang].studios;

  document.getElementById("navEvent").textContent =
    translations[lang].event;

  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });

  document
    .getElementById(`btn-${lang}`)
    .classList.add("active");

  localStorage.setItem("language", lang);
}

document
  .getElementById("btn-nl")
  .addEventListener("click", () => {
    setLanguage("nl");
  });

document
  .getElementById("btn-en")
  .addEventListener("click", () => {
    setLanguage("en");
  });

document
  .getElementById("btn-fr")
  .addEventListener("click", () => {
    setLanguage("fr");
  });

const savedLanguage =
  localStorage.getItem("language") || "en";

setLanguage(savedLanguage);

/* =========================
   HERO CAROUSEL
========================= */

const carousel = document.getElementById("carousel");
const dotsContainer = document.getElementById("carouselDots");

let currentSlide = 0;
let slides = [];

async function loadCarousel() {

  const { data, error } = await supabase
    .from("hero_carousel")
    .select("*")


    .eq("active", true)
    .order("sort_order", { ascending: true });

     console.log("CAROUSEL DATA:", data)

  if (error) {
    console.error(error);
    return;
  }

  slides = data;

  renderCarousel();

  startCarousel();
}

function renderCarousel() {

  carousel.innerHTML = "";
  dotsContainer.innerHTML = "";

  slides.forEach((slide, index) => {

    const item = document.createElement("div");

    item.className = `carousel-item ${
      index === 0 ? "active" : ""
    }`;

    item.style.backgroundImage = `url(${slide.image_url})`;

    item.innerHTML = `
      <div class="carousel-overlay">

        <span class="carousel-badge">
          ${slide.badge || ""}
        </span>

        <h1>${slide.title}</h1>

        <p>${slide.subtitle || ""}</p>

      </div>
    `;

    carousel.appendChild(item);

    const dot = document.createElement("div");

    dot.className = `dot ${
      index === 0 ? "active" : ""
    }`;

    dotsContainer.appendChild(dot);
  });
}

function startCarousel() {

  // stop als er minder dan 2 slides zijn
  if (slides.length <= 1) return;

  setInterval(() => {

    const items =
      document.querySelectorAll(".carousel-item");

    const dots =
      document.querySelectorAll(".dot");

    // extra safety check
    if (!items.length || !dots.length) return;

    items[currentSlide]?.classList.remove("active");

    dots[currentSlide]?.classList.remove("active");

    currentSlide++;

    if (currentSlide >= items.length) {
      currentSlide = 0;
    }

    items[currentSlide]?.classList.add("active");

    dots[currentSlide]?.classList.add("active");

  }, 4000);
}

/* =========================
   NEWS
========================= */

async function loadNews() {

  const { data, error } = await supabase
    .from("news")
    .select("*")



    .eq("active", true)
    .order("published_at", {
      ascending: false,
    });

    console.log("NEWS DATA:", data)

  if (error) {
    console.error(error);
    return;
  }

  const container =
    document.getElementById("newsContainer");

  container.innerHTML = "";

  data.forEach((news) => {

  container.innerHTML += `
    <div class="news-card">

     <div class="news-header">

  <img
    src="${news.icon_url}"
    class="news-icon"
    alt="${news.title}"
  />

  <span class="news-date">
    ${new Date(
      news.published_at
    ).toLocaleDateString()}
  </span>

</div >


      <h3 class="titleH">${news.title}</h3>

      <p>${news.description}</p>

    </div>
  `;
});
}

/* =========================
   PRODUCTIONS
========================= */

async function loadProductions() {

  const { data, error } = await supabase
    .from("productions")
    .select("*")
     .eq("active", true);

       console.log("PRODUCTIONS DATA:", data)

  if (error) {
    console.error(error);
    return;
  }

  const list =
    document.getElementById("productionList");

  list.innerHTML = "";

  data.forEach((production) => {

    list.innerHTML += `
      <div class="production-card">

        <img
          src="${production.image_url}"
          class="production-image"
        />

        <div class="production-info">

          <h3>${production.title}</h3>

          <p>${production.studio}</p>

          <span>
        ${String(production.start_time).slice(0,5)}
-
        ${String(production.end_time).slice(0,5)}
          </span>

        </div>

      </div>
    `;
  });
}

/* =========================
   INIT
========================= */

loadCarousel();

loadNews();

loadProductions();