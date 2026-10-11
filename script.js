/* ===== EDIT THIS BLOCK FIRST =====
   Replace placeholders only after the owner gives permission and accurate details. */
const CONFIG = {
  brand: "Hearth & Honey",
  phoneDisplay: "+91 00000 00000",
  phoneLink: "+910000000000",
  whatsapp: "910000000000",
  whatsappMessage: "Hello, I would like to ask about a table",
  mapsQuery: "Your Cafe Address Here",
  // Opening hours used for the "Open now" line. Day 0 = Sunday ... 6 = Saturday. Times are 24-hour.
  hours: { 0: [8, 20], 1: [7.5, 21], 2: [7.5, 21], 3: [7.5, 21], 4: [7.5, 21], 5: [7.5, 21], 6: [8, 22] }
};

(function () {
  "use strict";

  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = CONFIG.brand; });
  document.querySelectorAll("[data-tel]").forEach(function (el) { el.href = "tel:" + CONFIG.phoneLink; });
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.whatsappMessage);
  });
  document.querySelectorAll("[data-maps]").forEach(function (el) {
    el.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapsQuery);
  });

  /* mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }
  toggle.addEventListener("click", function () { setNav(!nav.classList.contains("open")); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });

  /* menu tabs */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.toggle("on", t === tab); t.setAttribute("aria-selected", String(t === tab)); });
      panels.forEach(function (p) { p.hidden = p.dataset.panel !== tab.dataset.tab; });
    });
  });

  /* open-now + highlight today's hours (uses the visitor's own clock) */
  var now = new Date();
  var day = now.getDay();
  var hr = now.getHours() + now.getMinutes() / 60;
  var h = CONFIG.hours[day];
  var el = document.getElementById("openNow");
  if (el && h) {
    el.textContent = (hr >= h[0] && hr < h[1]) ? "We're open right now (demo hours)." : "We're closed right now (demo hours).";
  }
  document.querySelectorAll("#hours li").forEach(function (li) {
    if (li.dataset.day.split(",").indexOf(String(day)) > -1) li.classList.add("today");
  });

  /* lightbox */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lastFocus = null;
  function closeLb() { lb.hidden = true; if (lastFocus) lastFocus.focus(); }
  document.querySelectorAll(".g").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lastFocus = btn;
      lbImg.src = btn.dataset.full;
      lbImg.alt = btn.querySelector("img").alt;
      lb.hidden = false;
      lb.querySelector(".lb-close").focus();
    });
  });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-close")) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  /* reveal on scroll */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  } else { items.forEach(function (i) { i.classList.add("in"); }); }

  /* image fallback */
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () { img.style.opacity = "0"; });
  });
})();
