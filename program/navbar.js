/* =========================================================
   MCB Sunday Program System — Navbar (hardened + user badge)
   <script src="navbar.js" defer></script>
   ========================================================= */
(function () {
  "use strict";

  const CONFIG = {
    logo: "mcb.jpg",
    title: "Generating Sunday Program System",
    subtitle: "Mobilization Church Balilihan",
    navbarHeight: 72,
    links: [
      { label: "Home",         href: "index.html",       match: ["index.html", "", "/"] },
      { label: "Add Program",  href: "add_program.html", match: ["add_program.html", "add_program.php"] },
      { label: "Table",        href: "table.html",       match: ["table.html", "table.php"] },
      { label: "Monthly",      href: "monthly.html",     match: ["monthly.html", "monthly.php"] },
      { label: "Logout",       href: "../index.html",    match: [], danger: true }
    ]
  };

  const STYLE_ID = "mcb-navbar-styles";
  const Z = 2147483000;

  /* =========================================================
     SESSION HELPERS — user info after portal login
     ========================================================= */
  const SESSION_KEY = "mcb_portal_user";

  function getUser() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const u = JSON.parse(raw);
      if (!u || !u.full_name) return null;
      return u;
    } catch { return null; }
  }

  function roleLabel(role) {
    if (role === "prog") return "Program";
    if (role === "p&w")  return "Praise and Worship";
    return role || "—";
  }

  function initials(name) {
    return String(name || "?").trim().split(/\s+/)
      .slice(0, 2).map(s => s[0] ? s[0].toUpperCase() : "").join("") || "?";
  }

  const CSS = `
    .mcb-navbar {
      --mcb-forest: #102c25;
      --mcb-forest-light: #1b4437;
      --mcb-forest-mid: #214739;
      --mcb-gold: #c5a56b;
      --mcb-gold-light: #e9d8b5;
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
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
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
      justify-self: start;
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

    /* =========================================================
       CENTER: logged-in user badge
       ========================================================= */
    .mcb-user {
      display: none;
      align-items: center;
      gap: 10px;
      padding: 7px 16px 7px 8px;
      border: 1px solid rgba(233,216,181,.35);
      border-radius: 999px;
      background: rgba(233,216,181,.08);
      backdrop-filter: blur(4px);
      max-width: 360px;
      min-width: 0;
      justify-self: center;
    }
    .mcb-user.is-visible { display: flex; }

    .mcb-user__avatar {
      display: grid;
      place-items: center;
      width: 32px; height: 32px; flex: 0 0 32px;
      border-radius: 50%;
      background: linear-gradient(140deg, #c5a56b, #a2822f);
      color: #1a1a1a;
      font-family: Georgia, serif;
      font-size: 12.5px;
      font-weight: 700;
      letter-spacing: .02em;
      box-shadow: 0 2px 6px rgba(0,0,0,.2);
    }

    .mcb-user__text {
      min-width: 0;
      line-height: 1.2;
      text-align: left;
    }
    .mcb-user__name {
      display: block;
      color: var(--mcb-white);
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }
    .mcb-user__role {
      display: block;
      margin-top: 2px;
      color: var(--mcb-gold-light);
      font-size: 10px;
      letter-spacing: .14em;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }

    /* Right side: clock */
    .mcb-clock {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      line-height: 1.2;
      white-space: nowrap;
      justify-self: end;
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
      padding: 22px 18px;
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

    /* Drawer user card (small) */
    .mcb-drawer__user {
      display: none;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      margin: 4px 0 10px;
      border-radius: 10px;
      background: rgba(233,216,181,.08);
      border: 1px solid rgba(233,216,181,.22);
    }
    .mcb-drawer__user.is-visible { display: flex; }
    .mcb-drawer__user .mcb-user__avatar {
      width: 30px; height: 30px; flex: 0 0 30px; font-size: 11.5px;
    }
    .mcb-drawer__user .mcb-user__name { font-size: 12.5px; max-width: 170px; }
    .mcb-drawer__user .mcb-user__role { font-size: 9.5px; max-width: 170px; }

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
      background: rgba(197,165,107,.16);
      color: var(--mcb-gold-light);
      box-shadow: inset 3px 0 0 var(--mcb-gold);
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

    body.has-mcb-navbar { padding-top: ${CONFIG.navbarHeight}px; }

    @media (max-width: 860px) {
      .mcb-user { display: none !important; }
    }

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
    add:     '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    table:   '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/></svg>',
    monthly: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    logout:  '<svg viewBox="0 0 24 24"><path d="M15 12H3"/><path d="M7 8l-4 4 4 4"/><path d="M9 4h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9"/></svg>'
  };

  const ICON_BY_LABEL = {
    "Home": ICONS.home,
    "Add Program": ICONS.add,
    "Table": ICONS.table,
    "Monthly": ICONS.monthly,
    "Logout": ICONS.logout
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

  /* ---------- User block builders ---------- */
  function buildCenterUser() {
    const wrap = document.createElement("div");
    wrap.className = "mcb-user";
    wrap.id = "mcb-user";
    wrap.setAttribute("role", "status");
    wrap.setAttribute("aria-live", "polite");
    wrap.innerHTML = `
      <span class="mcb-user__avatar" id="mcb-user-avatar">?</span>
      <span class="mcb-user__text">
        <span class="mcb-user__name" id="mcb-user-name">—</span>
        <span class="mcb-user__role" id="mcb-user-role">—</span>
      </span>
    `;
    return wrap;
  }

  function buildDrawerUser() {
    const wrap = document.createElement("div");
    wrap.className = "mcb-drawer__user";
    wrap.id = "mcb-drawer-user";
    wrap.innerHTML = `
      <span class="mcb-user__avatar" id="mcb-drawer-user-avatar">?</span>
      <span class="mcb-user__text">
        <span class="mcb-user__name" id="mcb-drawer-user-name">—</span>
        <span class="mcb-user__role" id="mcb-drawer-user-role">—</span>
      </span>
    `;
    return wrap;
  }

  function hydrateUserBlock(prefix, user) {
    const avat = document.getElementById(prefix + "-avatar");
    const name = document.getElementById(prefix + "-name");
    const role = document.getElementById(prefix + "-role");
    if (avat) avat.textContent = initials(user.full_name);
    if (name) name.textContent = user.full_name;
    if (role) role.textContent = roleLabel(user.role);
  }

  function renderUserBadges() {
    const user = getUser();
    const center = document.getElementById("mcb-user");
    const drawerUser = document.getElementById("mcb-drawer-user");

    if (!user) {
      if (center) center.classList.remove("is-visible");
      if (drawerUser) drawerUser.classList.remove("is-visible");
      return;
    }

    if (center) {
      center.classList.add("is-visible");
      hydrateUserBlock("mcb-user", user);
    }
    if (drawerUser) {
      drawerUser.classList.add("is-visible");
      hydrateUserBlock("mcb-drawer-user", user);
    }
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
            <img class="mcb-brand__logo" src="${CONFIG.logo}" alt="MCB logo"
                 onerror="this.style.background='#c5a56b'; this.alt='logo missing';">
            <span class="mcb-brand__text">
              <span class="mcb-brand__title">${CONFIG.title}</span>
              <span class="mcb-brand__subtitle">${CONFIG.subtitle}</span>
            </span>
          </a>
        </div>

        ${buildCenterUser().outerHTML}

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
           onerror="this.style.background='#c5a56b';">
      <div>
        <p class="mcb-drawer__title">MCB Portal</p>
        <p class="mcb-drawer__subtitle">Sunday Program</p>
      </div>
    `;
    drawer.appendChild(head);
    drawer.appendChild(buildDrawerUser());

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.className = "mcb-drawer__nav";
    CONFIG.links.forEach(link => ul.appendChild(buildLink(link)));
    nav.appendChild(ul);
    drawer.appendChild(nav);

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
        if (a.classList.contains("is-danger")) {
          // Logout: clear session then allow navigation
          try { sessionStorage.removeItem(SESSION_KEY); } catch {}
        } else {
          closeDrawer({ returnFocus: false });
        }
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
      renderUserBadges();          // ← show full_name + role if logged in
      console.log("[MCB Navbar] ready.");
    } catch (err) {
      console.error("[MCB Navbar] failed to initialize:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();