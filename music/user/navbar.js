
/* ==========================================================
   MOBILIZATION CHURCH BALILIHAN
   PUBLIC WEBSITE NAVBAR
   Supabase app_settings (ID: 1)
   Responsive Navigation + Supabase Settings
========================================================== */

(() => {
  "use strict";

  // --------------------------------------------------------
  // 1. SUPABASE CONFIGURATION
  // --------------------------------------------------------

  const SUPABASE_URL =
    "https://gcmsypmigipyizwcoflw.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_LRvaH2X8ZuJz8q17_JkxOg_lbi3ob_s";

  const SETTINGS_ID = 1;

  // --------------------------------------------------------
  // 2. PAGE CONFIGURATION
  // --------------------------------------------------------

  const MENU = [
    { label: "Home", file: "index.html", icon: "fa-house" },
    {
      label: "Music Line Up",
      file: "view_music_line_up.html",
      icon: "fa-music"
    },
    {
      label: "Monthly Schedule",
      file: "monthly_sched.html",
      icon: "fa-calendar-days"
    },
    {
      label: "Daily Grace",
      file: "devotional_challenge.html",
      icon: "fa-book-open"
    },
    {
      label: "Certificate",
      file: "generate_certificate.html",
      icon: "fa-certificate"
    },
    {
      label: "About Us",
      file: "about_us.html",
      icon: "fa-circle-info"
    }
  ];

  const DEFAULT_SETTINGS = {
    church_name: "Mobilization Church Balilihan",
    system_name: "Mobilization Church",
    font_style: "Poppins",
    theme: "dark",
    colors: {
      primary: "#38bdf8",
      secondary: "#818cf8",
      accent: "#22d3ee",
      background: "#07111f",
      text: "#f8fafc",
      surface: "#111e30"
    },
    images: {
      logo: ""
    }
  };

  // --------------------------------------------------------
  // 3. FIND NAVBAR SCRIPT LOCATION
  // --------------------------------------------------------

  const scriptElement = document.currentScript;

  const appRoot = scriptElement && scriptElement.src
    ? new URL("./", scriptElement.src)
    : new URL("./", document.baseURI);

  const appFile = (file) => new URL(file, appRoot).href;

  // --------------------------------------------------------
  // 4. LOAD REQUIRED EXTERNAL LIBRARIES
  // --------------------------------------------------------

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find(
        script => script.src === src
      );

      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }

        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;

      script.onload = () => {
        script.dataset.loaded = "true";
        resolve();
      };

      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function getSupabaseClient() {
    if (window.__churchSupabaseClient) {
      return window.__churchSupabaseClient;
    }

    if (!window.supabase || !window.supabase.createClient) {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
      );
    }

    if (!window.supabase || !window.supabase.createClient) {
      throw new Error("Supabase library could not be loaded.");
    }

    window.__churchSupabaseClient =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
      );

    return window.__churchSupabaseClient;
  }

  // --------------------------------------------------------
  // 5. GET CHURCH SETTINGS FROM SUPABASE
  // --------------------------------------------------------

  async function getAppSettings() {
    try {
      const db = await getSupabaseClient();

      const { data, error } = await db
        .from("app_settings")
        .select("id, settings")
        .eq("id", SETTINGS_ID)
        .maybeSingle();

      if (error) throw error;

      if (!data || !data.settings) {
        console.warn("No app_settings record found. Using defaults.");
        return DEFAULT_SETTINGS;
      }

      return {
        ...DEFAULT_SETTINGS,
        ...data.settings,
        colors: {
          ...DEFAULT_SETTINGS.colors,
          ...(data.settings.colors || {})
        },
        images: {
          ...DEFAULT_SETTINGS.images,
          ...(data.settings.images || {})
        }
      };

    } catch (error) {
      console.error("Unable to load church settings:", error);
      return DEFAULT_SETTINGS;
    }
  }

  // --------------------------------------------------------
  // 6. APPLY FONT AND COLOR THEME
  // --------------------------------------------------------

  function applyChurchTheme(settings) {
    const colors = settings.colors || {};
    const fontSetting = settings.font_style || "Poppins";

    const fontFamily = typeof fontSetting === "string"
      ? fontSetting
      : (fontSetting.family || "Poppins");

    const allowedFonts = [
      "Poppins",
      "Inter",
      "Roboto",
      "Montserrat",
      "Open Sans",
      "Lato",
      "Nunito",
      "Playfair Display"
    ];

    const safeFont = allowedFonts.includes(fontFamily)
      ? fontFamily
      : "Poppins";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=" +
      encodeURIComponent(safeFont).replace(/%20/g, "+") +
      ":wght@300;400;500;600;700;800&display=swap";

    document.head.appendChild(fontLink);

    const root = document.documentElement;

    root.style.setProperty(
      "--church-primary",
      colors.primary || "#38bdf8"
    );

    root.style.setProperty(
      "--church-secondary",
      colors.secondary || "#818cf8"
    );

    root.style.setProperty(
      "--church-accent",
      colors.accent || "#22d3ee"
    );

    root.style.setProperty(
      "--church-background",
      colors.background || "#07111f"
    );

    root.style.setProperty(
      "--church-text",
      colors.text || "#f8fafc"
    );

    root.style.setProperty(
      "--church-surface",
      colors.surface || "#111e30"
    );

    root.style.setProperty(
      "--church-font",
      `"${safeFont}", sans-serif`
    );

    root.style.setProperty(
      "--church-theme",
      settings.theme || "dark"
    );

    document.body.style.fontFamily =
      `"${safeFont}", sans-serif`;

    const metaTheme = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (metaTheme) {
      metaTheme.content =
        colors.background || "#07111f";
    }
  }

  // --------------------------------------------------------
  // 7. LOAD FONT AWESOME
  // --------------------------------------------------------

  function loadIcons() {
    if (
      document.querySelector(
        'link[href*="font-awesome"]'
      )
    ) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";

    document.head.appendChild(link);
  }

  // --------------------------------------------------------
  // 8. NAVBAR STYLES
  // --------------------------------------------------------

  function addNavbarStyles() {
    if (document.getElementById("church-navbar-styles")) return;

    const style = document.createElement("style");
    style.id = "church-navbar-styles";

    style.textContent = `
      :root {
        --church-primary: #38bdf8;
        --church-secondary: #818cf8;
        --church-accent: #22d3ee;
        --church-background: #07111f;
        --church-text: #f8fafc;
        --church-surface: #111e30;
        --church-font: "Poppins", sans-serif;
      }

      body {
        margin: 0;
        font-family: var(--church-font);
        background: var(--church-background);
        color: var(--church-text);
      }

      .church-navbar,
      .church-navbar * {
        box-sizing: border-box;
      }

      .church-navbar {
        position: sticky;
        top: 0;
        z-index: 9999;
        width: 100%;
        color: var(--church-text);
        background: rgba(7, 17, 31, .84);
        border-bottom: 1px solid rgba(255,255,255,.09);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        box-shadow: 0 12px 35px rgba(0,0,0,.22);
      }

      .church-nav-inner {
        max-width: 1500px;
        min-height: 82px;
        margin: auto;
        padding: 12px 30px;
        display: grid;
        grid-template-columns: minmax(220px, 1fr) auto minmax(150px, 1fr);
        align-items: center;
        gap: 22px;
      }

      .church-brand {
        display: flex;
        align-items: center;
        gap: 13px;
        min-width: 0;
        text-decoration: none;
        color: var(--church-text);
      }

      .church-logo {
        width: 52px;
        height: 52px;
        flex: 0 0 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 16px;
        background: linear-gradient(
          135deg,
          var(--church-primary),
          var(--church-secondary)
        );
        box-shadow: 0 5px 22px rgba(56,189,248,.22);
      }

      .church-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 4px;
      }

      .church-logo i {
        color: white;
        font-size: 23px;
      }

      .church-brand-text {
        min-width: 0;
      }

      .church-brand-title {
        display: block;
        font-size: 15px;
        font-weight: 800;
        line-height: 1.35;
        letter-spacing: .2px;
        overflow-wrap: anywhere;
      }

      .church-brand-subtitle {
        display: block;
        margin-top: 3px;
        color: rgba(226,232,240,.62);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.7px;
        text-transform: uppercase;
      }

      .church-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .church-menu a {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 11px;
        border-radius: 12px;
        text-decoration: none;
        white-space: nowrap;
        color: rgba(226,232,240,.76);
        font-size: 12px;
        font-weight: 600;
        transition: .25s ease;
      }

      .church-menu a i {
        color: var(--church-primary);
        font-size: 13px;
      }

      .church-menu a:hover,
      .church-menu a.active {
        color: #fff;
        background: rgba(255,255,255,.09);
      }

      .church-menu a.active {
        box-shadow: inset 0 0 0 1px rgba(56,189,248,.18);
      }

      .church-nav-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
      }

      .church-mobile-toggle {
        display: none;
        width: 43px;
        height: 43px;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 12px;
        color: white;
        background: rgba(255,255,255,.08);
        font-size: 18px;
        cursor: pointer;
      }

      @media (max-width: 1120px) {
        .church-nav-inner {
          grid-template-columns: 1fr auto;
          gap: 12px;
        }

        .church-menu {
          display: none;
          grid-column: 1 / -1;
          width: 100%;
          flex-direction: column;
          align-items: stretch;
          padding: 12px 0 5px;
          border-top: 1px solid rgba(255,255,255,.09);
        }

        .church-menu.open {
          display: flex;
        }

        .church-menu a {
          width: 100%;
          padding: 13px 15px;
        }

        .church-nav-actions {
          grid-column: 2;
          grid-row: 1;
        }

        .church-mobile-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }

      @media (max-width: 560px) {
        .church-nav-inner {
          padding: 10px 14px;
          min-height: 72px;
          gap: 8px;
        }

        .church-logo {
          width: 43px;
          height: 43px;
          flex-basis: 43px;
          border-radius: 13px;
        }

        .church-brand {
          gap: 9px;
        }

        .church-brand-title {
          font-size: 12px;
        }

        .church-brand-subtitle {
          font-size: 8px;
          letter-spacing: 1px;
        }

        .church-mobile-toggle {
          width: 40px;
          height: 40px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // --------------------------------------------------------
  // 9. CREATE NAVBAR HTML
  // --------------------------------------------------------

  function renderNavbar(settings) {
    const churchName =
      settings.church_name ||
      DEFAULT_SETTINGS.church_name;

    const systemName =
      settings.system_name ||
      DEFAULT_SETTINGS.system_name;

    const logo =
      settings.images?.logo || "";

    const currentFile = location.pathname
      .split("/")
      .pop()
      .toLowerCase() || "index.html";

    const menuHTML = MENU.map(item => {
      const active =
        currentFile === item.file.toLowerCase()
          ? "active"
          : "";

      return `
        <a href="${appFile(item.file)}"
           class="${active}"
           ${active ? 'aria-current="page"' : ""}>
          <i class="fa-solid ${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      `;
    }).join("");

    const logoHTML = logo
      ? `<img src="${escapeAttribute(logo)}"
              alt="Church Logo"
              onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
         <i class="fa-solid fa-church" style="display:none"></i>`
      : `<i class="fa-solid fa-church"></i>`;

    const navbarHTML = `
      <header class="church-navbar">
        <div class="church-nav-inner">

          <a class="church-brand"
             href="${appFile("index.html")}">

            <div class="church-logo">
              ${logoHTML}
            </div>

            <div class="church-brand-text">
              <span class="church-brand-title">
                ${escapeHTML(churchName)}
              </span>

              <span class="church-brand-subtitle">
                ${escapeHTML(systemName)}
              </span>
            </div>
          </a>

          <nav class="church-menu" id="church-main-menu">
            ${menuHTML}
          </nav>

          <div class="church-nav-actions">

            <button
              type="button"
              class="church-mobile-toggle"
              id="church-mobile-toggle"
              aria-label="Toggle navigation"
              aria-expanded="false">

              <i class="fa-solid fa-bars"></i>
            </button>

          </div>

        </div>
      </header>
    `;

    const existing = document.getElementById(
      "church-navbar-root"
    );

    if (existing) {
      existing.innerHTML = navbarHTML;
    } else {
      const root = document.createElement("div");
      root.id = "church-navbar-root";
      root.innerHTML = navbarHTML;
      document.body.prepend(root);
    }

    setupMobileMenu();
  }

  // --------------------------------------------------------
  // 10. HTML ESCAPING
  // --------------------------------------------------------

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function escapeAttribute(value) {
    return escapeHTML(value);
  }

  // --------------------------------------------------------
  // 11. MOBILE MENU
  // --------------------------------------------------------

  function setupMobileMenu() {
    const toggle = document.getElementById(
      "church-mobile-toggle"
    );

    const menu = document.getElementById(
      "church-main-menu"
    );

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      toggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // --------------------------------------------------------
  // 12. INITIALIZE NAVBAR
  // --------------------------------------------------------

  async function initializeChurchNavbar() {
    loadIcons();
    addNavbarStyles();

    const settings = await getAppSettings();

    applyChurchTheme(settings);
    renderNavbar(settings);

    console.log(
      "Mobilization Church navbar connected to app_settings ID:",
      SETTINGS_ID
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeChurchNavbar,
      { once: true }
    );
  } else {
    initializeChurchNavbar();
  }

})();
