"use strict";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ===== Live clock (visitor's local time, 12-hour) ===== */
const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const d = new Date();
  const h = d.getHours();

  $("#hm").textContent =
    pad(h % 12 || 12) + ":" +
    pad(d.getMinutes()) + ":" +
    pad(d.getSeconds());

  $("#ap").textContent = h < 12 ? "AM" : "PM";
  $("#wd").textContent = DAYS[d.getDay()];

  $("#dt").textContent =
    d.getDate() + " " +
    MONTHS[d.getMonth()] + " " +
    d.getFullYear();
}

tick();
setInterval(tick, 1000);

$("#yr").textContent = new Date().getFullYear();


/* ===== Typing animation ===== */

const TITLES = [
  "Full Stack Web Developer",
  "Software Developer",
  "Software Engineer",
  "AI Automation Socialist"
];

let wi = 0;
let ci = 0;
let deleting = false;

const typeEl = $("#type");

(function type() {
  const w = TITLES[wi];

  typeEl.textContent = w.slice(0, ci);

  let delay = deleting ? 35 : 75;

  if (!deleting && ci === w.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && ci === 0) {
    deleting = false;
    wi = (wi + 1) % TITLES.length;
    delay = 350;
  } else {
    ci += deleting ? -1 : 1;
  }

  setTimeout(type, delay);
})();


/* ===== Navigation: mobile menu, active section, moving indicator ===== */

const nav = $("#nav");
const burger = $("#burger");
const menu = $("#menu");
const ind = $("#ind");

const links = [...$$("#menu a")];

let active = links[0];

function moveInd(a) {
  const r = a.getBoundingClientRect();
  const m = menu.getBoundingClientRect();

  ind.style.width = r.width + "px";
  ind.style.height = r.height + "px";

  ind.style.transform =
    `translate(${r.left - m.left}px, ${r.top - m.top}px)`;

  ind.style.opacity = 1;
}

function setActive(a) {
  if (a === active && ind.style.opacity === "1") return;

  active = a;

  links.forEach((l) => {
    l.classList.toggle("on", l === a);

    if (l === a) {
      l.setAttribute("aria-current", "true");
    } else {
      l.removeAttribute("aria-current");
    }
  });

  moveInd(a);
}

links.forEach((a) => {
  a.addEventListener("pointerenter", () => moveInd(a));

  a.addEventListener("focus", () => moveInd(a));

  a.addEventListener("click", closeMenu);
});

menu.addEventListener("pointerleave", () => moveInd(active));

menu.addEventListener("focusout", () => moveInd(active));

function closeMenu() {
  nav.classList.remove("o");
  burger.classList.remove("o");
  burger.setAttribute("aria-expanded", "false");
}

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("o");

  burger.classList.toggle("o", open);
  burger.setAttribute("aria-expanded", open);

  setTimeout(() => moveInd(active), 420);
});


/* ===== Active section detection ===== */

const sections = links.map((a) =>
  $(a.getAttribute("href"))
);

function onScroll() {
  const y = window.scrollY + 140;

  let cur = sections[0];

  sections.forEach((s) => {
    if (s.offsetTop <= y) {
      cur = s;
    }
  });

  if (
    window.innerHeight + window.scrollY >=
    document.body.scrollHeight - 4
  ) {
    cur = sections[sections.length - 1];
  }

  setActive(links[sections.indexOf(cur)]);
}

window.addEventListener("scroll", onScroll, {
  passive: true
});

window.addEventListener("resize", () => {
  moveInd(active);
});

window.addEventListener("load", () => {
  onScroll();
  moveInd(active);
});

moveInd(active);


/* ===== Scroll reveal ===== */

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      // Add when visible, remove when out of view, so it animates every time
      e.target.classList.toggle("in", e.isIntersecting);
    });
  },
  {
    threshold: 0.1
  }
);

$$(".rv").forEach((el) => io.observe(el));


/* ===== Mouse-following green glow ===== */

const glow = $("#glow");

if (!matchMedia("(hover: none) and (pointer: coarse)").matches) {

  let tx = innerWidth / 2;
  let ty = innerHeight / 2;

  let x = tx;
  let y = ty;

  let started = false;

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;

      tx = e.clientX;
      ty = e.clientY;

      if (!started) {
        started = true;

        x = tx;
        y = ty;

        glow.style.opacity = 1;

        requestAnimationFrame(loop);
      }
    },
    {
      passive: true
    }
  );

  document.documentElement.addEventListener(
    "mouseleave",
    () => {
      glow.style.opacity = 0;
    }
  );

  document.documentElement.addEventListener(
    "mouseenter",
    () => {
      if (started) {
        glow.style.opacity = 1;
      }
    }
  );

  function loop() {

    // Increased mouse-following speed
    x += (tx - x) * 0.72;
    y += (ty - y) * 0.72;

    glow.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;

    requestAnimationFrame(loop);
  }
}

/* ===== One skill logo falls from the top of the screen every 3 seconds ===== */

(function fallingLogos() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const srcs = [...new Set(
    [...$$(".tools .logo-box img")].map((i) => i.getAttribute("src"))
  )];

  if (!srcs.length) return;

  let n = 0;

  function drop() {
    if (document.hidden) return;

    const img = document.createElement("img");
    const size = innerWidth < 600 ? 44 : 56;
    const x = 12 + Math.random() * Math.max(0, innerWidth - size - 24);
    const spin = (Math.random() < 0.5 ? -1 : 1) * (540 + Math.random() * 360);

    img.className = "faller";
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    img.src = srcs[n++ % srcs.length];
    document.body.appendChild(img);

    const a = img.animate(
      [
        { transform: `translate(${x}px, ${-size - 20}px) rotate(0deg)` },
        { transform: `translate(${x}px, ${innerHeight + 20}px) rotate(${spin}deg)` }
      ],
      { duration: 4200, easing: "cubic-bezier(.45, .05, .8, .6)", fill: "forwards" }
    );

    a.onfinish = () => img.remove();
  }

  setTimeout(drop, 800);
  setInterval(drop, 3000);
})();
