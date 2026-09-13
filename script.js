/* =========================================================
   OMOR FARUK — LOGO DESIGNER PORTFOLIO
   Vanilla JavaScript
   ========================================================= */

/* =========================================================
   1. SITE CONFIG — edit numbers here, nowhere else.
   These values automatically populate every place they're used.
   ========================================================= */
const SITE_CONFIG = {
  completedProjects: 793,
  currentProjects: 5
};

/* =========================================================
   2. PORTFOLIO DATA — add / remove / edit projects here.
   ========================================================= */
const PORTFOLIO_PROJECTS = [
  //{ image: "assets/logos/logo-01.png", date: "14/03/2024", price: 180 },//
  { image: "assets/logos/logo-01.png", date: "01/06/2022", price: 130 },
  { image: "assets/logos/logo-02.jpg", date: "03/06/2022", price: 75 },
  { image: "assets/logos/logo-03.png", date: "07/06/2022", price: 98 },
  { image: "assets/logos/logo-04.png", date: "08/06/2022", price: 130 },
  { image: "assets/logos/logo-05.png", date: "15/06/2022", price: 70 },
  { image: "assets/logos/logo-06.png", date: "17/06/2022", price: 67 },
  { image: "assets/logos/logo-07.png", date: "18/06/2022", price: 200 },
  { image: "assets/logos/logo-08.png", date: "25/06/2022", price: 165 },
  { image: "assets/logos/logo-09.png", date: "26/06/2022", price: 85 },
  { image: "assets/logos/logo-10.png", date: "27/06/2022", price: 350 },
  { image: "assets/logos/logo-11.png", date: "02/07/2022", price: 180 },
  { image: "assets/logos/logo-12.png", date: "05/07/2022", price: 150 },
  { image: "assets/logos/logo-13.png", date: "09/07/2022", price: 50 },
  { image: "assets/logos/logo-14.png", date: "10/07/2022", price: 100 },
  { image: "assets/logos/logo-15.png", date: "11/07/2022", price: 80 },
  { image: "assets/logos/logo-16.png", date: "15/07/2022", price: 80 },
  { image: "assets/logos/logo-17.png", date: "19/07/2022", price: 55 },
  { image: "assets/logos/logo-18.png", date: "19/07/2022", price: 125 },
  { image: "assets/logos/logo-19.png", date: "23/07/2022", price: 200 },
  { image: "assets/logos/logo-20.png", date: "26/07/2022", price: 40 },
  //{ image: "assets/logos/logo-08.svg", date: "12/05/2020", price: 95 }//
];

/* =========================================================
   3. SERVICES — "What I Do" cards
   ========================================================= */
const SERVICES = [
  "Logo Design",
  "Logo Concept Development",
  "Minimalist Logo",
  "Modern Logo",
  "Luxury Logo",
  "Mascot Logo",
  "Typography Logo",
  "Brand Mark",
  "Monogram Logo",
  "Abstract Logo"
];

/* =========================================================
   4. SPECIALTY TICKER PHRASES
   ========================================================= */
const SPECIALTIES = [
  "Logo Design",
  "Logo Concept Development",
  "Minimalist Logo",
  "Modern Logo",
  "Luxury Logo",
  "Mascot Logo",
  "Typography Logo",
  "Brand Mark"
];

/* =========================================================
   5. PROCESS STEPS — "How I Work"
   ========================================================= */
const PROCESS_STEPS = [
  { num: "01", title: "Understand", text: "Understand the brand, business and design requirements." },
  { num: "02", title: "Research", text: "Research the industry, competitors, target audience and visual direction before creating the concept." },
  { num: "03", title: "Concept", text: "Develop suitable logo concepts and visual directions." },
  { num: "04", title: "Sketch & Explore", text: "Explore different ideas, shapes, typography and visual possibilities before selecting the strongest direction." },
  { num: "05", title: "Refinement", text: "Refine the selected concept based on feedback and improve the details." },
  { num: "06", title: "Finalization", text: "Prepare the approved logo carefully and make sure it works across different sizes and applications." },
  { num: "07", title: "Final Delivery", text: "Deliver the final logo files in professional formats." }
];

/* =========================================================
   INIT — each function checks for its own elements, so this
   single script.js safely runs on every page of the site.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initSpecialtyTicker();
  initStats();
  initServices();
  initPortfolioGrid();
  initLightbox();
  initProcess();
  initNav();
  initCursorGlow();
  initScrollReveal();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* =========================================================
   LIVE CLOCK — updates every second
   ========================================================= */
function initClock() {
  const timeEl = document.getElementById("clockTime");
  const periodEl = document.getElementById("clockPeriod");
  const dateEl = document.getElementById("clockDate");
  if (!timeEl || !periodEl || !dateEl) return;

  function tick() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    timeEl.childNodes[0].nodeValue = `${String(hours).padStart(2, "0")}:${minutes}:${seconds} `;
    periodEl.textContent = period;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    dateEl.textContent = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* =========================================================
   ANIMATED SPECIALTY TEXT — typing / fade loop
   ========================================================= */
function initSpecialtyTicker() {
  const el = document.getElementById("specialtyWord");
  if (!el) return;

  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const HOLD_AFTER_TYPE = 1500;
  const PAUSE_BEFORE_NEXT = 1500;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step() {
    const phrase = SPECIALTIES[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(step, HOLD_AFTER_TYPE);
        return;
      }
      setTimeout(step, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % SPECIALTIES.length;
        setTimeout(step, PAUSE_BEFORE_NEXT);
        return;
      }
      setTimeout(step, DELETE_SPEED);
    }
  }

  el.textContent = "";
  setTimeout(step, 400);
}

/* =========================================================
   HERO STATS — count up from config
   ========================================================= */
function initStats() {
  const completedEl = document.getElementById("statCompleted");
  const currentEl = document.getElementById("statCurrent");
  if (completedEl) animateCount(completedEl, SITE_CONFIG.completedProjects);
  if (currentEl) animateCount(currentEl, SITE_CONFIG.currentProjects);
}

function animateCount(el, target) {
  const duration = 1200;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* =========================================================
   SERVICES GRID
   ========================================================= */
function initServices() {
  const grid = document.getElementById("serviceGrid");
  if (!grid) return;
  const icon = `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L12 16.9l-5.5 2.7 1.4-6.1L3.2 9.3l6.2-.6L12 3z" stroke-linejoin="round"/></svg>`;

  grid.innerHTML = SERVICES.map((name, i) => `
    <div class="glass service-card reveal" style="transition-delay:${(i % 4) * 0.05}s">
      ${icon}
      <h3>${name}</h3>
    </div>
  `).join("");
}

/* =========================================================
   PORTFOLIO GRID (portfolio.html) — box layout, click to enlarge
   ========================================================= */
function initPortfolioGrid() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_PROJECTS.map((project, i) => `
    <div class="glass portfolio-card reveal"
         style="transition-delay:${(i % 6) * 0.06}s"
         data-image="${project.image}"
         data-date="${project.date}"
         data-price="${project.price}">
      <div class="portfolio-card-img">
        <img src="${project.image}" alt="Logo project created ${project.date}" loading="lazy">
      </div>
      <div class="portfolio-card-meta">
        <span class="portfolio-card-date">Created: ${project.date}</span>
        <span class="portfolio-card-price">$${project.price}</span>
      </div>
    </div>
  `).join("");
}

/* =========================================================
   LIGHTBOX — click a portfolio box to view the logo full size
   ========================================================= */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = document.getElementById("lightboxImg");
  const dateEl = document.getElementById("lightboxDate");
  const priceEl = document.getElementById("lightboxPrice");
  const closeBtn = document.getElementById("lightboxClose");

  function open(card) {
    img.src = card.dataset.image;
    img.alt = "Logo project created " + card.dataset.date;
    dateEl.textContent = "Created: " + card.dataset.date;
    priceEl.textContent = "$" + card.dataset.price;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".portfolio-card");
    if (card) open(card);
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* =========================================================
   PROCESS STEPS
   ========================================================= */
function initProcess() {
  const list = document.getElementById("processList");
  if (!list) return;
  list.innerHTML = PROCESS_STEPS.map((step, i) => `
    <div class="glass process-step reveal" style="transition-delay:${(i % 4) * 0.04}s">
      <span class="process-num">${step.num}</span>
      <div>
        <h3>${step.title}</h3>
        <p>${step.text}</p>
      </div>
    </div>
  `).join("");
}

/* =========================================================
   NAVIGATION — mobile menu + scroll-spy active state
   ========================================================= */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // scroll-spy only applies to in-page hash links (e.g. "index.html#about")
  // on a page that actually has those sections — harmless no-op elsewhere.
  const navLinkEls = document.querySelectorAll(".nav-link");
  const hashLinks = Array.from(navLinkEls).filter((link) => link.getAttribute("href").includes("#"));

  const sectionMap = hashLinks
    .map((link) => {
      const hash = link.getAttribute("href").split("#")[1];
      const section = hash ? document.getElementById(hash) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sectionMap.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sectionMap.find((item) => item.section === entry.target);
          if (!match) return;
          navLinkEls.forEach((link) => link.classList.remove("active"));
          match.link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sectionMap.forEach(({ section }) => spy.observe(section));
}

/* =========================================================
   CURSOR GLOW — soft light that follows the pointer
   ========================================================= */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    glow.classList.add("active");
  });

  document.addEventListener("mouseleave", () => glow.classList.remove("active"));
}

/* =========================================================
   SCROLL REVEAL — fade/slide-up on entry
   ========================================================= */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  // re-query since service/portfolio/process cards are injected dynamically
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}