import { supabase } from "./src/supabase.js";

/* =========================
   LANGUAGE SYSTEM
========================= */

const translations = {

  nl: {
    news: "Nieuws",
    productions: "Actieve Producties",

    navHome: "Home",
    navMap: "Kaart",
    navStudios: "Studio's",
    navEvent: "Event",
  },

  en: {
    news: "News",
    productions: "Active Productions",

    navHome: "Home",
    navMap: "Map",
    navStudios: "Studios",
    navEvent: "Event",
  },

  fr: {
    news: "Actualités",
    productions: "Productions Actives",

    navHome: "Accueil",
    navMap: "Carte",
    navStudios: "Studios",
    navEvent: "Événement",
  },
};

let currentLanguage = "en";

const btnNl =
  document.getElementById("btn-nl");

const btnEn =
  document.getElementById("btn-en");

const btnFr =
  document.getElementById("btn-fr");

function setLanguage(lang) {

  currentLanguage = lang;

  const t = translations[lang];

  // SECTION TITLES
  document.getElementById(
    "newsTitle"
  ).textContent = t.news;

  document.getElementById(
    "productionsTitle"
  ).textContent = t.productions;

  // NAVIGATION
  document.getElementById(
    "navHome"
  ).textContent = t.navHome;

  document.getElementById(
    "navMap"
  ).textContent = t.navMap;

  document.getElementById(
    "navStudios"
  ).textContent = t.navStudios;

  document.getElementById(
    "navEvent"
  ).textContent = t.navEvent;

  // ACTIVE BUTTON
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });

  document
    .getElementById(`btn-${lang}`)
    .classList.add("active");

  // SAVE LANGUAGE
  localStorage.setItem(
    "language",
    lang
  );
}

// BUTTON EVENTS
btnNl.addEventListener("click", () => {
  setLanguage("nl");
});

btnEn.addEventListener("click", () => {
  setLanguage("en");
});

btnFr.addEventListener("click", () => {
  setLanguage("fr");
});

/* =========================
   HERO CAROUSEL
========================= */

const carousel =
  document.getElementById("carousel");

const dotsContainer =
  document.getElementById("carouselDots");

let currentSlide = 0;

let slides = [];

async function loadCarousel() {

  const { data, error } = await supabase
    .from("hero_carousel")
    .select("*")
    .eq("active", true)
    .order("sort_order", {
      ascending: true,
    });

  console.log(
    "CAROUSEL DATA:",
    data
  );

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

    const item =
      document.createElement("div");

    item.className = `carousel-item ${
      index === 0 ? "active" : ""
    }`;

    item.style.backgroundImage =
      `url(${slide.image_url})`;

    item.innerHTML = `
      <div class="carousel-overlay">

        <span class="carousel-badge">
          ${slide.badge || ""}
        </span>

        <h1>
          ${slide.title}
        </h1>

        <p>
          ${slide.subtitle || ""}
        </p>

      </div>
    `;

    carousel.appendChild(item);

    // DOTS
    const dot =
      document.createElement("div");

    dot.className = `dot ${
      index === 0 ? "active" : ""
    }`;

    dotsContainer.appendChild(dot);
  });
}

function startCarousel() {

  if (slides.length <= 1) return;

  setInterval(() => {

    const items =
      document.querySelectorAll(
        ".carousel-item"
      );

    const dots =
      document.querySelectorAll(
        ".dot"
      );

    if (!items.length || !dots.length)
      return;

    // REMOVE ACTIVE
    if (items[currentSlide]) {
      items[currentSlide]
        .classList
        .remove("active");
    }

    if (dots[currentSlide]) {
      dots[currentSlide]
        .classList
        .remove("active");
    }

    currentSlide++;

    // RESET
    if (currentSlide >= items.length) {
      currentSlide = 0;
    }

    // ADD ACTIVE
    if (items[currentSlide]) {
      items[currentSlide]
        .classList
        .add("active");
    }

    if (dots[currentSlide]) {
      dots[currentSlide]
        .classList
        .add("active");
    }

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

  console.log(
    "NEWS DATA:",
    data
  );

  if (error) {
    console.error(error);
    return;
  }

  const container =
    document.getElementById(
      "newsContainer"
    );

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

        </div>

        <h3 class="titleH">
          ${news.title}
        </h3>

        <p>
          ${news.description}
        </p>

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

  console.log(
    "PRODUCTIONS DATA:",
    data
  );

  if (error) {
    console.error(error);
    return;
  }

  const list =
    document.getElementById(
      "productionList"
    );

  list.innerHTML = "";

  data.forEach((production) => {

    list.innerHTML += `
      <div class="production-card">

        <img
          src="${production.image_url}"
          class="production-image"
          alt="${production.title}"
        />

        <div class="production-info">

          <h3>
            ${production.title}
          </h3>

          <p>
            ${production.studio}
          </p>

          <span>

            ${production.start_time}
            -
            ${production.end_time}

          </span>

        </div>

      </div>
    `;
  });
}

/* =========================
   INIT LANGUAGE
========================= */

const savedLanguage =
  localStorage.getItem("language");

if (savedLanguage) {
  setLanguage(savedLanguage);
} else {
  setLanguage("en");
}

/* =========================
   INIT APP
========================= */

loadCarousel();

loadNews();

loadProductions();