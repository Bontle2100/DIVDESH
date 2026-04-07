// ===========================
// TOEGANKELIJKHEID SCRIPT
// Umami Sushi Leiden
// ===========================

(function () {
  const HTML = document.documentElement;
  const BODY = document.body;

  const STAP = 10;
  const MIN_SCHAAL = 80;
  const MAX_SCHAAL = 150;

  let huidigeFontSchaal = parseInt(localStorage.getItem("fontSchaal") || "100");
  let hoogContrastAan = localStorage.getItem("hoogContrast") === "aan";
  let lichtModusAan = localStorage.getItem("thema") === "licht";
  let animatiesUit = localStorage.getItem("animatiesUit") === "aan";

  // ─── Lettergrootte ───
  function pasFontToe(schaal) {
    HTML.style.fontSize = schaal + "%";
    localStorage.setItem("fontSchaal", schaal);
    const indicator = document.getElementById("fontSchaalIndicator");
    if (indicator) indicator.textContent = schaal + "%";
    const meter = document.getElementById("fontMeter");
    if (meter) meter.value = schaal;
  }

  pasFontToe(huidigeFontSchaal);

  // ─── Licht/donker modus ───
  function pasThemaToe(licht) {
    BODY.classList.toggle("licht-modus", licht);
    const knop = document.getElementById("themaToggleBalk");
    if (knop) {
      knop.setAttribute("aria-pressed", licht ? "true" : "false");
      knop.classList.toggle("actief", licht);
      const icon = knop.querySelector(".toegang-toggle-icon");
      const tekst = knop.querySelector(".toegang-toggle-tekst");
      if (icon) icon.textContent = licht ? "🌙" : "☀️";
      if (tekst) tekst.textContent = licht ? "Licht modus aan" : "Licht modus";
    }
    const floatingKnop = document.getElementById("themaToggle");
    if (floatingKnop) floatingKnop.textContent = licht ? "🌙" : "☀️";
  }

  pasThemaToe(lichtModusAan);

  // ─── Hoog contrast ───
  function pasContrastToe(aan) {
    BODY.classList.toggle("hoog-contrast", aan);
    const btn = document.getElementById("hoogContrast");
    if (btn) {
      btn.setAttribute("aria-pressed", aan ? "true" : "false");
      btn.classList.toggle("actief", aan);
      const tekst = btn.querySelector(".toegang-toggle-tekst");
      if (tekst) tekst.textContent = aan ? "Hoog contrast aan" : "Hoog contrast";
    }
    localStorage.setItem("hoogContrast", aan ? "aan" : "uit");
  }

  pasContrastToe(hoogContrastAan);

  // ─── Animaties ───
  function pasAnimatiesToe(uit) {
    BODY.classList.toggle("geen-animaties", uit);
    const btn = document.getElementById("animatiesToggle");
    if (btn) {
      btn.setAttribute("aria-pressed", uit ? "true" : "false");
      btn.classList.toggle("actief", uit);
      const tekst = btn.querySelector(".toegang-toggle-tekst");
      if (tekst) tekst.textContent = uit ? "Animaties uit aan" : "Animaties uit";
    }
    localStorage.setItem("animatiesUit", uit ? "aan" : "uit");
  }

  pasAnimatiesToe(animatiesUit);

  document.addEventListener("DOMContentLoaded", function () {
    const fab = document.getElementById("toegangToggle");
    const paneel = document.getElementById("toegangPaneel");
    const sluit = document.getElementById("toegangSluit");

    function openPaneel() {
      paneel.classList.add("open");
      paneel.setAttribute("aria-hidden", "false");
      fab.setAttribute("aria-expanded", "true");
      fab.classList.add("actief");
      if (sluit) sluit.focus();
    }

    function sluitPaneel() {
      paneel.classList.remove("open");
      paneel.setAttribute("aria-hidden", "true");
      fab.setAttribute("aria-expanded", "false");
      fab.classList.remove("actief");
      fab.focus();
    }

    if (fab) fab.addEventListener("click", openPaneel);
    if (sluit) sluit.addEventListener("click", sluitPaneel);

    document.addEventListener("click", function (e) {
      if (paneel && paneel.classList.contains("open")) {
        if (!paneel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
          sluitPaneel();
        }
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && paneel && paneel.classList.contains("open")) {
        sluitPaneel();
      }
    });

    const themaKnop = document.getElementById("themaToggleBalk");
    if (themaKnop) {
      themaKnop.addEventListener("click", function () {
        lichtModusAan = !lichtModusAan;
        localStorage.setItem("thema", lichtModusAan ? "licht" : "donker");
        pasThemaToe(lichtModusAan);
      });
    }

    const fontGroterBtn = document.getElementById("fontGroter");
    if (fontGroterBtn) {
      fontGroterBtn.addEventListener("click", function () {
        if (huidigeFontSchaal < MAX_SCHAAL) { huidigeFontSchaal += STAP; pasFontToe(huidigeFontSchaal); }
      });
    }

    const fontKleinerBtn = document.getElementById("fontKleiner");
    if (fontKleinerBtn) {
      fontKleinerBtn.addEventListener("click", function () {
        if (huidigeFontSchaal > MIN_SCHAAL) { huidigeFontSchaal -= STAP; pasFontToe(huidigeFontSchaal); }
      });
    }

    const fontResetBtn = document.getElementById("fontReset");
    if (fontResetBtn) {
      fontResetBtn.addEventListener("click", function () {
        huidigeFontSchaal = 100; pasFontToe(huidigeFontSchaal);
      });
    }

    const hoogContrastBtn = document.getElementById("hoogContrast");
    if (hoogContrastBtn) {
      hoogContrastBtn.addEventListener("click", function () {
        hoogContrastAan = !hoogContrastAan; pasContrastToe(hoogContrastAan);
      });
    }

    const animatiesBtn = document.getElementById("animatiesToggle");
    if (animatiesBtn) {
      animatiesBtn.addEventListener("click", function () {
        animatiesUit = !animatiesUit; pasAnimatiesToe(animatiesUit);
      });
    }

    // Hamburger aria-hidden sync
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const openMenuBtn = document.getElementById("openMenu");
    const sluitMenuBtn = document.getElementById("sluitMenu");
    const backdrop = document.getElementById("hamburgerBackdrop");

    if (openMenuBtn && hamburgerMenu) openMenuBtn.addEventListener("click", function () { hamburgerMenu.setAttribute("aria-hidden", "false"); });
    if (sluitMenuBtn && hamburgerMenu) sluitMenuBtn.addEventListener("click", function () { hamburgerMenu.setAttribute("aria-hidden", "true"); });
    if (backdrop && hamburgerMenu) backdrop.addEventListener("click", function () { hamburgerMenu.setAttribute("aria-hidden", "true"); });
  });

})();