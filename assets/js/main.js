/* ==========================================================================
   REEM — Portfolio · Interactions
   Vanilla JS · no dependencies
   ========================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const cfg = window.PORTFOLIO;

  const body = document.body;
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");
  const backToTop = $("#backToTop");
  const toast = $("#toast");
  const toastText = $("#toastText");
  const themeToggle = $("#themeToggle");
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");
  const modal = $("#projectModal");
  const grid = $("#projectsGrid");
  const filterBar = $("#projectFilters");
  const projectsCount = $("#projectsCount");

  const icon = (name) =>
    `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const arabicCount = (n) => {
    if (n === 1) return "مشروع واحد";
    if (n === 2) return "مشروعان";
    return `${n} مشاريع`;
  };

  /* ----------------------------- Theme ---------------------------------- */
  function applyTheme(theme) {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f6f2ea" : "#07080a");
    try {
      localStorage.setItem("reem-theme", isLight ? "light" : "dark");
    } catch (e) { /* storage may be unavailable */ }
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("reem-theme"); } catch (e) { /* noop */ }
    applyTheme(saved === "light" ? "light" : "dark");
    themeToggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "light" ? "dark" : "light");
    });
  }

  /* --------------------------- Preloader -------------------------------- */
  function initPreloader() {
    const preloader = $("#preloader");
    if (!preloader) return;
    let hidden = false;
    const hide = () => {
      if (hidden) return;
      hidden = true;
      preloader.classList.add("loaded");
      window.setTimeout(() => preloader.remove(), 850);
    };
    window.addEventListener("load", () => window.setTimeout(hide, 420));
    window.setTimeout(hide, 2400);
  }

  /* ------------------------ Header & progress --------------------------- */
  function initScrollUI() {
    const navAnchors = $$(".nav-links a");
    const sections = $$("main section[id]");
    let ticking = false;

    const update = () => {
      const y = window.scrollY || window.pageYOffset;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;

      if (progress) progress.style.transform = `scaleX(${ratio})`;
      header.classList.toggle("is-scrolled", y > 18);
      backToTop.classList.toggle("show", y > 520);

      let current = sections.length ? sections[0].id : "home";
      const marker = y + window.innerHeight * 0.3;
      sections.forEach((section) => {
        if (section.offsetTop <= marker) current = section.id;
      });

      navAnchors.forEach((anchor) => {
        const isActive = anchor.getAttribute("href") === `#${current}`;
        anchor.classList.toggle("active", isActive);
        if (isActive) anchor.setAttribute("aria-current", "page");
        else anchor.removeAttribute("aria-current");
      });

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  /* ---------------------------- Mobile menu ----------------------------- */
  function initMenu() {
    if (!menuToggle || !mobileMenu) return;
    const links = $$("a", mobileMenu);

    const setOpen = (open) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
      mobileMenu.classList.toggle("open", open);
      mobileMenu.setAttribute("aria-hidden", String(!open));
      body.classList.toggle("menu-open", open);
      if (open) {
        const first = $("a", mobileMenu);
        if (first) window.setTimeout(() => first.focus(), 320);
      }
    };

    menuToggle.addEventListener("click", () => {
      setOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    links.forEach((link) => link.addEventListener("click", () => setOpen(false)));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860 && menuToggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  }

  /* ------------------------------ Reveal -------------------------------- */
  function initReveal() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ----------------------------- Counters ------------------------------- */
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const run = (el) => {
      const target = Number(el.dataset.count) || 0;
      if (reduceMotion) {
        el.textContent = String(target);
        return;
      }
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    const stats = $(".hero-stats");
    if (!stats || !("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach(run);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(stats);
  }

  /* ---------------------------- Skill bars ------------------------------ */
  function initSkills() {
    const bars = $(".skills-bars");
    if (!bars) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      bars.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bars.classList.add("in");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    observer.observe(bars);
  }

  /* ----------------------------- Projects ------------------------------- */
  function renderProjects() {
    if (!cfg || !grid || !filterBar) return;

    const counts = { all: cfg.projects.length };
    cfg.filters.forEach((filter) => {
      if (filter.id !== "all") {
        counts[filter.id] = cfg.projects.filter((project) => project.filters.includes(filter.id)).length;
      }
    });

    filterBar.innerHTML = cfg.filters
      .map(
        (filter, i) => `
        <button class="filter-btn${i === 0 ? " active" : ""}" type="button"
          data-filter="${esc(filter.id)}" aria-pressed="${i === 0 ? "true" : "false"}">
          ${esc(filter.label)}
          <span class="count">${counts[filter.id] ?? 0}</span>
        </button>`
      )
      .join("");

    grid.innerHTML = cfg.projects
      .map(
        (project, i) => `
        <article class="project-card reveal" style="--d:${i * 70}ms"
          data-project="${esc(project.id)}" data-categories="${esc(project.filters.join(" "))}">
          <div class="project-media">
            <div class="browser-bar" aria-hidden="true">
              <span class="browser-dots"><i></i><i></i><i></i></span>
              <span class="browser-url">${icon("lock")} ${esc(project.displayUrl)}</span>
              ${icon("external")}
            </div>
            <div class="project-image">
              <img src="${esc(project.image)}" alt="${esc(project.imageAlt)}"
                loading="lazy" decoding="async" width="1280" height="800">
              <span class="project-index" aria-hidden="true">${esc(project.index)}</span>
              <a class="project-open" href="${esc(project.url)}" target="_blank"
                rel="noopener noreferrer" aria-label="فتح ${esc(project.title)} في تبويب جديد">
                ${icon("arrow-up-left")}
              </a>
            </div>
          </div>
          <div class="project-body">
            <div class="project-meta">
              <span class="project-category">${esc(project.category)}</span>
              <span class="project-year">${esc(project.year)}</span>
            </div>
            <h3>${esc(project.title)}</h3>
            <p>${esc(project.description)}</p>
            <div class="project-tags" aria-label="المهارات المستخدمة">
              ${project.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}
            </div>
            <div class="project-actions">
              <a class="project-link primary" href="${esc(project.url)}" target="_blank"
                rel="noopener noreferrer">
                زيارة المشروع ${icon("arrow-up-left")}
              </a>
              <button class="project-link" type="button" data-details="${esc(project.id)}">
                التفاصيل ${icon("arrow-left")}
              </button>
            </div>
          </div>
        </article>`
      )
      .join("");

    if (projectsCount) projectsCount.textContent = arabicCount(cfg.projects.length);
    initProjectFilters();
    initProjectModal();
  }

  function initProjectFilters() {
    const cards = $$(".project-card", grid);
    if (!cards.length) return;

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;

      $$(".filter-btn", filterBar).forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      const filter = button.dataset.filter;
      let visible = 0;

      cards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(" ");
        const match = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-filtered", !match);
        if (match) {
          visible += 1;
          card.classList.remove("entering");
          void card.offsetWidth;
          card.classList.add("entering");
        }
      });

      if (projectsCount) projectsCount.textContent = arabicCount(visible);
    });
  }

  /* ------------------------------- Modal -------------------------------- */
  let lastFocused = null;

  function initProjectModal() {
    if (!modal) return;

    grid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-details]");
      if (!trigger) return;
      const project = cfg.projects.find((item) => item.id === trigger.dataset.details);
      if (project) openModal(project);
    });

    $$("[data-close-modal]", modal).forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("open")) return;
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key === "Tab") trapFocus(event);
    });
  }

  function openModal(project) {
    lastFocused = document.activeElement;

    const image = $("#modalImage");
    image.src = project.image;
    image.alt = project.imageAlt;

    $("#modalBadge").textContent = project.category;
    $("#modalKicker").textContent = project.kicker;
    $("#modalTitle").textContent = project.title;
    $("#modalDesc").textContent = project.longDescription;

    $("#modalMeta").innerHTML = `
      <div class="meta-item"><span>الدور</span><strong>${esc(project.role)}</strong></div>
      <div class="meta-item"><span>السنة</span><strong>${esc(project.year)}</strong></div>
      <div class="meta-item"><span>التصنيف</span><strong>${esc(project.category)}</strong></div>
      <div class="meta-item"><span>الرابط</span><strong dir="ltr">${esc(project.displayUrl)}</strong></div>`;

    $("#modalHighlights").innerHTML = project.highlights
      .map((item) => `<li>${icon("check")} <span>${esc(item)}</span></li>`)
      .join("");

    $("#modalTags").innerHTML = project.tags
      .map((tag) => `<span>${esc(tag)}</span>`)
      .join("");

    const link = $("#modalLink");
    link.href = project.url;
    link.setAttribute("aria-label", `زيارة ${project.title} في تبويب جديد`);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");

    const closeButton = $(".modal-close", modal);
    if (closeButton) window.setTimeout(() => closeButton.focus(), 80);
  }

  function closeModal() {
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function trapFocus(event) {
    const focusable = $$(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      modal
    ).filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ------------------------------- Tilt --------------------------------- */
  function initTilt() {
    if (!finePointer || reduceMotion) return;
    const card = $("[data-tilt]");
    if (!card) return;
    const wrap = card.closest(".hero-visual");
    if (!wrap) return;

    let frame = null;

    wrap.addEventListener("mousemove", (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-2px)`;
        frame = null;
      });
    });

    wrap.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  }

  /* --------------------------- Card spotlight --------------------------- */
  function initSpotlight() {
    if (!finePointer || reduceMotion) return;
    grid.addEventListener("pointermove", (event) => {
      const card = event.target.closest(".project-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--px", `${event.clientX - rect.left}px`);
      card.style.setProperty("--py", `${event.clientY - rect.top}px`);
    });
  }

  /* ----------------------------- Cursor glow ---------------------------- */
  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const glow = $("#cursorGlow");
    if (!glow) return;
    let shown = false;

    document.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      if (!shown) {
        glow.classList.add("on");
        shown = true;
      }
    });

    document.addEventListener("pointerleave", () => {
      glow.classList.remove("on");
      shown = false;
    });
  }

  /* ------------------------------- Toast -------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3400);
  }

  /* ------------------------------ Contact ------------------------------- */
  function initForm() {
    const form = $("#contactForm");
    if (!form) return;

    const required = $$("input[required], textarea[required]", form);
    const fields = $$("input, textarea", form);

    fields.forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("invalid"));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let firstInvalid = null;
      required.forEach((field) => {
        const empty = !field.value.trim();
        field.classList.toggle("invalid", empty);
        if (empty && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        showToast("يرجى تعبئة الحقول المطلوبة أولًا.");
        return;
      }

      const name = $("#name").value.trim();
      const contactInfo = $("#contactInfo").value.trim();
      const topic = $("#topic").value;
      const message = $("#message").value.trim();

      const text = [
        "مرحبًا ريم،",
        `أنا ${name}.`,
        `وسيلة التواصل: ${contactInfo}`,
        `نوع التواصل: ${topic}`,
        "",
        message
      ].join("\n");

      const url = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      showToast("تم تجهيز رسالتك في واتساب ✦");
      form.reset();
    });
  }

  /* ------------------------------- Copy --------------------------------- */
  function initCopy() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-copy]");
      if (!button) return;

      const text = button.dataset.copy;
      if (!text) return;

      const done = () => showToast(`تم نسخ الرقم ${text}`);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      done();
    } catch (error) {
      showToast("تعذّر النسخ، يمكنك استخدام الرقم مباشرة.");
    }
    area.remove();
  }

  /* ------------------------------- Misc --------------------------------- */
  function initMisc() {
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    const internalLinks = $$('a[href^="#"]');
    internalLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (menuToggle && menuToggle.getAttribute("aria-expanded") === "true") {
          menuToggle.click();
        }
      });
    });
  }

  /* ------------------------------- Init --------------------------------- */
  initTheme();
  initPreloader();
  initScrollUI();
  initMenu();
  renderProjects();
  initReveal();
  initCounters();
  initSkills();
  initTilt();
  initSpotlight();
  initCursor();
  initForm();
  initCopy();
  initMisc();
})();
