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

// --- SLIDESHOW ---
  const slides = document.getElementsByClassName('slide');
  const slideshowcontainer = document.getElementById('slideshow');

  if (slides.length > 0 && slideshowcontainer) {
    const num = document.getElementById('num');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const ballscontainer = document.getElementById('ballcontainer');

    let balls;
    let inside = false;
    let slideNum = 0;
    let lastSlide = 0;
    const timer = 3000;

    function showHide() {
      slides[lastSlide].style.display = 'none';
      slides[slideNum].style.display = 'block';
      num.innerHTML = `${slideNum + 1}/${slides.length}`;
      balls[lastSlide].checked = false;
      balls[slideNum].checked = true;
    }

    function slideshow() {
      lastSlide = slideNum;
      slideNum = (slideNum < slides.length - 1) ? slideNum + 1 : 0;
      showHide();
    }

    function nextSlide() {
      clearInterval(slideinter);
      slideshow();
      if (!inside) slideinter = setInterval(slideshow, timer);
    }

    function prevSlide() {
      clearInterval(slideinter);
      lastSlide = slideNum;
      slideNum = (slideNum > 0) ? slideNum - 1 : slides.length - 1;
      showHide();
      if (!inside) slideinter = setInterval(slideshow, timer);
    }

    function spawnBalls() {
      for (let i = 0; i < slides.length; i++) {
        ballscontainer.innerHTML += `<input type="radio" class="ball" id="${i}">`;
      }
      balls = document.querySelectorAll('.ball');
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    ballscontainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('ball')) {
        clearInterval(slideinter);
        lastSlide = slideNum;
        slideNum = parseInt(event.target.id);
        showHide();
        if (!inside) slideinter = setInterval(slideshow, timer);
      }
    });

    slideshowcontainer.addEventListener('mouseover', function() {
      clearInterval(slideinter);
      inside = true;
    });

    slideshowcontainer.addEventListener('mouseout', function() {
      inside = false;
      slideinter = setInterval(slideshow, timer);
    });

    spawnBalls();
    showHide();
    let slideinter = setInterval(slideshow, timer);
  }