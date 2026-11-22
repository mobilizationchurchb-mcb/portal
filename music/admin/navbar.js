/* =====================================================
   MOBILIZATION CHURCH BALILIHAN
   ADMIN MANAGEMENT PORTAL NAVBAR
   Sky Blue Glassmorphism
   Integrated Secure Sign Out → logout.html
   ===================================================== */

(function () {
  // Prevent duplicate navbar
  if (document.querySelector(".admin-navbar")) return;

  const style = document.createElement("style");

  style.textContent = `
    .admin-navbar {
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,.85);
      border-radius: 18px;
      padding: 18px 24px;
      box-shadow: 0 8px 30px rgba(48,135,190,.10);
      margin-bottom: 24px;
      font-family: 'Inter', sans-serif;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
    }

    .admin-brand {
      display: flex;
      align-items: center;
      gap: 13px;
    }

    .admin-logo {
      width: 48px;
      height: 48px;
      border-radius: 15px;
      background: linear-gradient(135deg,#BCE7FF,#69BDF0);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #0876B9;
      font-size: 24px;
    }

    .admin-title {
      font-size: 20px;
      font-weight: 800;
      color: #174C70;
      margin: 0;
    }

    .admin-subtitle {
      color: #7096AF;
      font-size: 12px;
      margin-top: 4px;
    }

    .admin-clock {
      text-align: right;
      color: #174C70;
      font-weight: 700;
      font-size: 14px;
    }

    .admin-clock small {
      display: block;
      font-size: 11px;
      color: #7A9DB5;
      margin-top: 4px;
    }

    .admin-logout {
      color: #DC6262;
      text-decoration: none;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 7px;
      cursor: pointer;
      border: 0;
      background: transparent;
      font-family: inherit;
      transition: .2s ease;
    }

    .admin-logout:hover {
      color: #B83232;
      transform: translateY(-1px);
    }

    .admin-logout:disabled {
      opacity: .6;
      cursor: not-allowed;
      transform: none;
    }

    .admin-divider {
      height: 1px;
      background: #DCECF7;
      margin: 18px 0;
    }

    .admin-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
    }

    .admin-tab {
      display: flex;
      align-items: center;
      gap: 9px;
      text-decoration: none;
      padding: 11px 15px;
      border-radius: 12px;
      color: #527D99;
      background: rgba(235,247,255,.65);
      border: 1px solid transparent;
      font-size: 12px;
      font-weight: 700;
      transition: all .25s ease;
    }

    .admin-tab:hover,
    .admin-tab.active {
      color: #0879BD;
      background: linear-gradient(135deg,#DDF2FF,#FFFFFF);
      border-color: #A9DDFB;
      box-shadow: 0 4px 14px rgba(65,157,210,.12);
      transform: translateY(-2px);
    }

    .admin-tab i {
      font-size: 16px;
    }

    @media(max-width:768px) {
      .admin-navbar {
        padding: 15px;
      }

      .admin-header {
        align-items: flex-start;
      }

      .admin-clock {
        text-align: left;
      }

      .admin-tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      .admin-tab {
        padding: 12px 10px;
      }

      .admin-title {
        font-size: 16px;
      }
    }

    @media(max-width:420px) {
      .admin-tabs {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);

  // ===================================================
  // ADMIN NAVIGATION MENU
  // ===================================================

  const menu = [
    {
      icon: "fa-solid fa-certificate",
      title: "Certificate Approval & Edit",
      url: "certificate.html"
    },
    {
      icon: "fa-solid fa-book-open",
      title: "Daily Devotional",
      url: "user_challenger.html"
    },
    {
      icon: "fa-solid fa-music",
      title: "Music Line-up Generator",
      url: "music_line_up.html"
    },
    {
      icon: "fa-solid fa-gear",
      title: "Settings, Signatories & Reset",
      url: "settings.html"
    }
  ];

  const currentPage =
    location.pathname.split("/").pop() || "index.html";

  // ===================================================
  // CREATE NAVBAR
  // ===================================================

  const navbar = document.createElement("header");
  navbar.className = "admin-navbar";

  navbar.innerHTML = `
    <div class="admin-header">

      <div class="admin-brand">
        <div class="admin-logo">
          <i class="fa-solid fa-church"></i>
        </div>

        <div>
          <h2 class="admin-title">
            Admin Management Portal
          </h2>

          <div class="admin-subtitle">
            Mobilization Church Balilihan
          </div>
        </div>
      </div>

      <div class="admin-clock">
        <span id="admin-time">--:--:--</span>

        <small id="admin-date">Loading date...</small>

        <button
          type="button"
          class="admin-logout"
          id="admin-signout">
          <i class="fa-solid fa-right-from-bracket"></i>
          Sign Out
        </button>
      </div>

    </div>

    <div class="admin-divider"></div>

    <nav class="admin-tabs">
      ${menu.map(item => `
        <a href="${item.url}"
           class="admin-tab ${
             currentPage === item.url ? "active" : ""
           }">
          <i class="${item.icon}"></i>
          <span>${item.title}</span>
        </a>
      `).join("")}
    </nav>
  `;

  document.body.prepend(navbar);

  // ===================================================
  // PHILIPPINE DATE AND TIME
  // ===================================================

  function updateClock() {
    const now = new Date();

    const timeElement =
      document.getElementById("admin-time");

    const dateElement =
      document.getElementById("admin-date");

    if (!timeElement || !dateElement) return;

    timeElement.textContent =
      new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).format(now);

    dateElement.textContent =
      new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        month: "long",
        day: "numeric",
        year: "numeric"
      }).format(now);
  }

  updateClock();

  setInterval(updateClock, 1000);

  // ===================================================
  // ADMIN SIGN OUT → logout.html
  // ===================================================

  const signOutButton =
    document.getElementById("admin-signout");

  signOutButton.addEventListener("click", async function () {

    const confirmed = confirm(
      "Are you sure you want to sign out?"
    );

    if (!confirmed) return;

    // Prevent double-clicks while signing out
    signOutButton.disabled = true;
    signOutButton.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Signing out...';

    try {
      // 1. End the real Supabase session if the SDK is available
      if (window.supabase && typeof window.supabase.createClient === "function") {
        // Reuse an existing client if the page already created one
        const client = window.supabaseClient || window.supabase.createClient(
          "https://gcmsypmigipyizwcoflw.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbXN5cG1pZ2lweWl6d2NvZmx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNzI3MzYsImV4cCI6MjExMDc0ODczNn0.Ra53x1UDl8igDi0vTgR2FlzzscSQdsnZbV2pWtulQOY"
        );
        await client.auth.signOut();
      }
    } catch (err) {
      console.warn("Supabase signOut failed (continuing):", err);
    }

    // 2. Clear custom admin session keys
    sessionStorage.removeItem("adminSessionToken");
    sessionStorage.removeItem("adminProfile");

    // 3. Clear any Supabase auth tokens left in storage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
        sessionStorage.removeItem(key);
      }
    });

    // 4. Redirect to logout.html
    //    Admin pages live in /admin/, login + logout live in the root,
    //    so we go up one level.
    const logoutURL = new URL("logout.html", window.location.href);
    window.location.replace(logoutURL.href);
  });

})();
