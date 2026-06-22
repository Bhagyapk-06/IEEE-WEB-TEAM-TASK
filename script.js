document.addEventListener("DOMContentLoaded", function () {

  //Navbar scroll 
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () { navbar.classList.toggle("scrolled", window.scrollY > 40); updateActiveNav(); });

  // Hamburger 
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");
  hamburger.addEventListener("click", function () { hamburger.classList.toggle("open"); navLinks.classList.toggle("open"); });
  navLinks.querySelectorAll(".nav-link").forEach(function (l) {
    l.addEventListener("click", function () { hamburger.classList.remove("open"); navLinks.classList.remove("open"); });
  });

  // Active nav
  const sections = document.querySelectorAll("section[id]");
  function updateActiveNav() {
    let cur = "";
    sections.forEach(function (s) { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    document.querySelectorAll(".nav-link").forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#"+cur); });
  }

  // Filter + Search 
  let activeCat = "all";
  window.filterEvents = function (cat, btn) {
    activeCat = cat;
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    if (btn) btn.classList.add("active");
    applyFilter();
  };

  const searchInput = document.getElementById("searchInput");
  document.getElementById("resetBtn").addEventListener("click", function () { searchInput.value = ""; applyFilter(); });
  searchInput.addEventListener("input", applyFilter);

  function applyFilter() {
    const q = searchInput.value.toLowerCase().trim();
    let visible = 0;
    document.querySelectorAll(".event-card").forEach(function (card) {
      const matchCat    = activeCat === "all" || card.classList.contains(activeCat);
      const matchSearch = !q || card.dataset.name.includes(q) || card.querySelector("h3").textContent.toLowerCase().includes(q);
      card.style.display = (matchCat && matchSearch) ? "" : "none";
      if (matchCat && matchSearch) visible++;
    });
    document.getElementById("noResults").style.display = visible === 0 ? "block" : "none";
  }

  // FAQ
  window.toggleFAQ = function (btn) {
    const item = btn.closest(".faq-item");
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(function (i) { i.classList.remove("open"); });
    if (!open) item.classList.add("open");
  };

  // Schedule tabs
  window.switchDay = function (id, btn) {
    document.querySelectorAll(".timeline").forEach(function (t) { t.classList.add("hidden"); });
    document.getElementById(id).classList.remove("hidden");
    document.querySelectorAll(".day-tab").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    document.querySelectorAll("#"+id+" .reveal").forEach(function (el) {
      el.classList.remove("visible");
      setTimeout(function () { el.classList.add("visible"); }, 50);
    });
  };

});