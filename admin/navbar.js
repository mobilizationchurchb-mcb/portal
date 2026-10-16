/* =========================================================
   MCB Admin — Navbar (hardened)
   <script src="navbar.js" defer></script>
   ========================================================= */
(function () {
  "use strict";

  const CONFIG = {
    logo: "logo.jpg",                       // falls back to mcb.jpg if missing
    title: "Admin Church Staff",
    subtitle: "Mobilization Church Balilihan",
    navbarHeight: 72,                       // px
    links: [
      { label: "Home",       href: "index.html",        match: ["index.html", "", "/"] },
      { label: "Member",     href: "member.html",       match: ["member.html", "member.php"] },
      { label: "Allow Site", href: "allow_site.html",   match: ["allow_site.html", "allow_site.php"] },
      { label: "User",       href: "user_member.html",  match: ["user_member.html", "user_member.php"] }
    ],
    footerNote1: "MCB-ADMIN STAFF",
    footerNote2: "Mobilization Church Balilihan"
  };

  const STYLE_ID = "mcb-navbar-styles";
  const Z = 2147483000; // very high

  const CSS = `
    .mcb-navbar {
      --mcb-forest: #102c25;
      --mcb-forest-light: #1b4437;
      --mcb-forest-mid: #214739;
      --mcb-gold: #c5a56b;
      --mcb-gold-light: #e9d8b5;
      --mcb-gold-soft: #f5efe2;
      --mcb-white: #fff;

      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: ${Z} !important;
      display: block !important;
      color: var(--mcb-white);
      background: linear-gradient(125deg, var(--mcb-forest), #16372e 72%, var(--mcb-forest-mid)) !important;
      font-family: "Segoe UI", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      box-shadow: 0 4px 18px rgba(0,0,0,.18);
      transition: box-shadow 200ms ease;
    }

    .mcb-navbar * { box-sizing: border-box !important; }

    .mcb-navbar.is-scrolled { box-shadow: 0 10px 30px rgba(0,0,0,.28); }

    .mcb-navbar__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: min(1240px, 100%);
      margin: 0 auto;
      padding: 12px clamp(14px, 3vw, 26px);
      min-height: ${CONFIG.navbarHeight}px;
    }

    /* Left group: hamburger + brand */
    .mcb-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1 1 auto;
    }

    /* Brand */
    .mcb-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      text-decoration: none;
      color: inherit;
    }

    .mcb-brand__logo {
      width: 46px; height: 46px; flex: 0 0 46px;
      border-radius: 12px;
      object-fit: cover;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(233,216,181,.45);
      box-shadow: 0 2px 10px rgba(0,0,0,.2);
      display: block;
    }

    .mcb-brand__text { min-width: 0; line-height: 1.15; }

    .mcb-brand__title {
      display: block;
      color: var(--mcb-white);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(14px, 1.5vw, 16px);
      font-weight: 500;
      letter-spacing: .01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mcb-brand__subtitle {
      display: block;
      margin-top: 3px;
      color: var(--mcb-gold-light);
      font-size: 10.5px;
      letter-spacing: .16em;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Clock */
    .mcb-clock {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      line-height: 1.2;
      white-space: nowrap;
      flex: 0 0 auto;
    }
    .mcb-clock__time {
      color: var(--mcb-gold-light);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(15px, 1.8vw, 18px);
      font-variant-numeric: tabular-nums;
      letter-spacing: .04em;
    }
    .mcb-clock__date {
      margin-top: 3px;
      color: rgba(255,255,255,.65);
      font-size: 10.5px;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    /* Hamburger */
    .mcb-toggle {
      display: grid !important;
      place-items: center;
      width: 42px; height: 42px; flex: 0 0 42px;
      padding: 0;
      margin-right: 4px;
      border: 1px solid rgba(233,216,181,.5);
      border-radius: 12px;
      background: rgba(255,255,255,.08);
      color: var(--mcb-gold-light);
      cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease;
    }
    .mcb-toggle:hover { background: rgba(233,216,181,.18); border-color: var(--mcb-gold); }
    .mcb-toggle:focus-visible { outline: 3px solid var(--mcb-gold); outline-offset: 3px; }

    .mcb-toggle__icon { position: relative; width: 20px; height: 14px; }
    .mcb-toggle__icon span {
      position: absolute; left: 0; right: 0; height: 2px;
      background: currentColor; border-radius: 2px;
      transition: transform 220ms ease, opacity 180ms ease, top 220ms ease;
    }
    .mcb-toggle__icon span:nth-child(1) { top: 0; }
    .mcb-toggle__icon span:nth-child(2) { top: 6px; }
    .mcb-toggle__icon span:nth-child(3) { top: 12px; }

    .mcb-navbar.is-open .mcb-toggle__icon span:nth-child(1) { top: 6px; transform: rotate(45deg); }
    .mcb-navbar.is-open .mcb-toggle__icon span:nth-child(2) { opacity: 0; }
    .mcb-navbar.is-open .mcb-toggle__icon span:nth-child(3) { top: 6px; transform: rotate(-45deg); }

    /* Drawer */
    .mcb-drawer {
      position: fixed !important;
      top: 0; left: 0; bottom: 0;
      width: min(300px, 82vw);
      padding: 22px 18px 18px;
      background: linear-gradient(180deg, #102c25 0%, #0b2019 100%);
      color: var(--mcb-white);
      border-right: 1px solid rgba(233,216,181,.18);
      box-shadow: 24px 0 60px rgba(0,0,0,.5);
      transform: translateX(-102%);
      transition: transform 260ms cubic-bezier(.2,.8,.2,1);
      z-index: ${Z + 1} !important;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      pointer-events: none;
    }
    .mcb-navbar.is-open ~ .mcb-drawer,
    .mcb-drawer.is-open {
      transform: translateX(0);
      pointer-events: auto;
    }

    .mcb-drawer__head {
      display: flex; align-items: center; gap: 12px;
      padding-bottom: 18px; margin-bottom: 12px;
      border-bottom: 1px solid rgba(233,216,181,.18);
    }
    .mcb-drawer__head img {
      width: 40px; height: 40px; flex: 0 0 40px;
      border-radius: 10px; object-fit: cover;
      border: 1px solid rgba(233,216,181,.45);
    }
    .mcb-drawer__title {
      margin: 0;
      font-family: Georgia, serif;
      font-size: 14px; font-weight: 500;
      color: var(--mcb-gold-light); line-height: 1.25;
    }
    .mcb-drawer__subtitle {
      margin: 3px 0 0;
      color: rgba(255,255,255,.55);
      font-size: 10px; letter-spacing: .14em;
      text-transform: uppercase;
    }

    .mcb-drawer__nav {
      display: flex; flex-direction: column; gap: 4px;
      margin: 8px 0 0; padding: 0; list-style: none;
    }
    .mcb-drawer__link {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      color: rgba(255,255,255,.85);
      text-decoration: none;
      font-size: 14px;
      letter-spacing: .01em;
      transition: background 150ms ease, color 150ms ease, transform 150ms ease;
    }
    .mcb-drawer__link:hover {
      background: rgba(233,216,181,.1);
      color: var(--mcb-gold-light);
      transform: translateX(2px);
    }
    .mcb-drawer__link:focus-visible {
      outline: 2px solid var(--mcb-gold); outline-offset: 2px;
    }
    .mcb-drawer__link.is-active {
      background: #16372e;
      color: #f5efe2;
      box-shadow: inset 3px 0 0 #c5a56b;
      font-weight: 600;
    }
    .mcb-drawer__link.is-danger {
      margin-top: 8px;
      color: #f2b8b8;
      border-top: 1px solid rgba(233,216,181,.14);
      padding-top: 16px;
      border-radius: 0;
    }
    .mcb-drawer__link.is-danger:hover { background: rgba(178,58,58,.12); color: #ffd9d9; }

    .mcb-drawer__icon {
      display: grid; place-items: center;
      width: 20px; height: 20px; flex: 0 0 20px;
    }
    .mcb-drawer__icon svg {
      width: 18px; height: 18px;
      fill: none; stroke: currentColor; stroke-width: 1.7;
      stroke-linecap: round; stroke-linejoin: round;
    }

    /* Footer notes sa loob ng drawer */
    .mcb-drawer__footer {
      margin-top: auto;
      padding-top: 18px;
      border-top: 1px solid rgba(233,216,181,.18);
      text-align: left;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 10.5px;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: rgba(255,255,255,.55);
      line-height: 1.6;
    }
    .mcb-drawer__footer strong {
      display: block;
      color: var(--mcb-gold-light);
      font-weight: 700;
      margin-bottom: 3px;
      font-size: 11px;
      letter-spacing: .18em;
    }

    /* Backdrop */
    .mcb-backdrop {
      position: fixed !important;
      inset: 0;
      background: rgba(10,24,19,.55);
      backdrop-filter: blur(2px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms ease;
      z-index: ${Z} !important;
    }
    .mcb-backdrop.is-open { opacity: 1; pointer-events: auto; }

    /* Push page content */
    body.has-mcb-navbar { padding-top: ${CONFIG.navbarHeight}px; }

    @media (max-width: 560px) {
      .mcb-brand__subtitle { font-size: 9.5px; letter-spacing: .12em; }
      .mcb-brand__logo { width: 40px; height: 40px; flex-basis: 40px; }
      .mcb-clock__date { font-size: 9.5px; }
      .mcb-navbar__inner { gap: 10px; padding: 10px 14px; min-height: 64px; }
      body.has-mcb-navbar { padding-top: 64px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .mcb-navbar *, .mcb-navbar *::before, .mcb-navbar *::after,
      .mcb-drawer, .mcb-backdrop {
        transition-duration: .01ms !important;
        animation-duration: .01ms !important;
      }
    }
  `;

  const ICONS = {
    home:    '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/></svg>',
    member:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>',
    allow:   '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/><circle cx="12" cy="12" r="10"/></svg>',
    user:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/><path d="M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/></svg>'
  };

  const ICON_BY_LABEL = {
    "Home":       ICONS.home,
    "Member":     ICONS.member,
    "Allow Site": ICONS.allow,
    "User":       ICONS.user
  };

  function injectStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing) existing.remove();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function currentPage() {
    return (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  }

  function isActive(link) {
    const page = currentPage();
    if (!link.match || !link.match.length) return false;
    return link.match.some(m => {
      const mm = m.toLowerCase();
      if (mm === "" || mm === "/") return page === "" || page === "index.html";
      return page === mm;
    });
  }

  function buildLink(link) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "mcb-drawer__link";
    a.href = link.href;
    if (link.danger) a.classList.add("is-danger");
    if (isActive(link)) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
    a.innerHTML =
      `<span class="mcb-drawer__icon" aria-hidden="true">${ICON_BY_LABEL[link.label] || ""}</span>` +
      `<span>${link.label}</span>`;
    li.appendChild(a);
    return li;
  }

  function buildNavbar() {
    const navbar = document.createElement("header");
    navbar.className = "mcb-navbar";
    navbar.setAttribute("role", "banner");

    navbar.innerHTML = `
      <div class="mcb-navbar__inner">

        <div class="mcb-left">
          <button class="mcb-toggle" id="mcb-toggle" type="button"
                  aria-label="Open menu" aria-controls="mcb-drawer" aria-expanded="false">
            <span class="mcb-toggle__icon" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
          </button>

          <a class="mcb-brand" href="index.html" aria-label="Go to home">
            <img class="mcb-brand__logo" src="${CONFIG.logo}" alt="MCB Admin logo"
                 onerror="this.onerror=null;this.src='mcb.jpg';this.style.background='#c5a56b';">
            <span class="mcb-brand__text">
              <span class="mcb-brand__title">${CONFIG.title}</span>
              <span class="mcb-brand__subtitle">${CONFIG.subtitle}</span>
            </span>
          </a>
        </div>

        <div class="mcb-clock" aria-live="polite">
          <span class="mcb-clock__time" id="mcb-time">--:--:--</span>
          <span class="mcb-clock__date" id="mcb-date">Loading…</span>
        </div>

      </div>
    `;

    const drawer = document.createElement("aside");
    drawer.className = "mcb-drawer";
    drawer.id = "mcb-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.setAttribute("aria-label", "Main navigation");

    const head = document.createElement("div");
    head.className = "mcb-drawer__head";
    head.innerHTML = `
      <img src="${CONFIG.logo}" alt=""
           onerror="this.onerror=null;this.src='mcb.jpg';this.style.background='#c5a56b';">
      <div>
        <p class="mcb-drawer__title">Admin Panel</p>
        <p class="mcb-drawer__subtitle">Church Staff</p>
      </div>
    `;
    drawer.appendChild(head);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.className = "mcb-drawer__nav";
    CONFIG.links.forEach(link => ul.appendChild(buildLink(link)));
    nav.appendChild(ul);
    drawer.appendChild(nav);

    // Footer notes
    const foot = document.createElement("div");
    foot.className = "mcb-drawer__footer";
    foot.innerHTML = `
      <strong>${CONFIG.footerNote1}</strong>
      ${CONFIG.footerNote2}
    `;
    drawer.appendChild(foot);

    const backdrop = document.createElement("div");
    backdrop.className = "mcb-backdrop";
    backdrop.id = "mcb-backdrop";

    document.body.insertBefore(backdrop, document.body.firstChild);
    document.body.insertBefore(drawer, document.body.firstChild);
    document.body.insertBefore(navbar, document.body.firstChild);

    document.body.classList.add("has-mcb-navbar");

    return { navbar, drawer, backdrop };
  }

  function startClock() {
    const timeEl = document.getElementById("mcb-time");
    const dateEl = document.getElementById("mcb-date");
    if (!timeEl || !dateEl) return;

    const timeFmt = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
    });
    const dateFmt = new Intl.DateTimeFormat(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    function tick() {
      const now = new Date();
      timeEl.textContent = timeFmt.format(now);
      dateEl.textContent = dateFmt.format(now);
    }
    tick();
    setInterval(tick, 1000);
  }

  function wireDrawer(navbar, drawer, backdrop) {
    const toggle = document.getElementById("mcb-toggle");

    function openDrawer() {
      navbar.classList.add("is-open");
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      backdrop.classList.add("is-open");
      const firstLink = drawer.querySelector(".mcb-drawer__link");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }

    function closeDrawer({ returnFocus = true } = {}) {
      navbar.classList.remove("is-open");
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      backdrop.classList.remove("is-open");
      if (returnFocus) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navbar.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });

    backdrop.addEventListener("click", () => closeDrawer());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navbar.classList.contains("is-open")) closeDrawer();
    });

    drawer.querySelectorAll(".mcb-drawer__link").forEach(a => {
      a.addEventListener("click", () => {
        if (!a.classList.contains("is-danger")) closeDrawer({ returnFocus: false });
      });
    });
  }

  function wireScroll(navbar) {
    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function init() {
    try {
      injectStyles();
      const { navbar, drawer, backdrop } = buildNavbar();
      startClock();
      wireDrawer(navbar, drawer, backdrop);
      wireScroll(navbar);
      console.log("[MCB Admin Navbar] ready.");
    } catch (err) {
      console.error("[MCB Admin Navbar] failed to initialize:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();