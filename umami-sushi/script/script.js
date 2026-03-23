document.addEventListener("DOMContentLoaded", function () {
  // --- THEMA TOGGLE (DARK / LICHT) ---
  const themaKnop = document.getElementById("themaToggle");

  // Haal opgeslagen voorkeur op
  const opgeslagenThema = localStorage.getItem("thema");
  if (opgeslagenThema === "licht") {
    document.body.classList.add("licht-modus");
    if (themaKnop) themaKnop.textContent = "🌙";
  } else {
    if (themaKnop) themaKnop.textContent = "☀️";
  }

  if (themaKnop) {
    themaKnop.addEventListener("click", function () {
      const isLicht = document.body.classList.toggle("licht-modus");
      localStorage.setItem("thema", isLicht ? "licht" : "donker");
      themaKnop.textContent = isLicht ? "🌙" : "☀️";
    });
  }

  // --- HAMBURGER MENU ---
  const menu = document.getElementById("hamburgerMenu");
  const backdrop = document.getElementById("hamburgerBackdrop");
  const openBtn = document.getElementById("openMenu");
  const sluitBtn = document.getElementById("sluitMenu");

  function openMenu() {
    menu.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function sluitMenu() {
    menu.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openMenu);
  sluitBtn.addEventListener("click", sluitMenu);
  backdrop.addEventListener("click", sluitMenu);

  // --- MENU TABS (alleen op menu.html) ---
  const tabs = document.querySelectorAll(".menu-tab");
  const secties = document.querySelectorAll(".menu-categorie");

  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("actief"); });
        secties.forEach(function (s) { s.classList.remove("zichtbaar"); });
        tab.classList.add("actief");
        document.getElementById("tab-" + tab.dataset.tab).classList.add("zichtbaar");
      });
    });
  }
});