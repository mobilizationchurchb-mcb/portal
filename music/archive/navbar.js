document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Professional Responsive CSS
    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f4f7f6;
            padding-top: 70px;
        }

        /* --- HEADER --- */
        .mcb-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background: linear-gradient(135deg, #1e3a8a, #1e40af);
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
            z-index: 1000;
        }

        .header-left { display: flex; align-items: center; gap: 12px; }

        .hamburger-btn {
            background: none; border: none; color: #ffffff;
            font-size: 24px; cursor: pointer; display: none;
            padding: 5px; border-radius: 5px; transition: background 0.2s;
        }
        .hamburger-btn:hover { background: rgba(255, 255, 255, 0.15); }

        .header-titles { display: flex; flex-direction: column; }
        .header-title { font-size: 1.25rem; font-weight: 700; letter-spacing: 0.3px; line-height: 1.2; }
        .header-sub { font-size: 0.85rem; color: #dbeafe; font-weight: 400; }

        .header-right { text-align: right; display: flex; flex-direction: column; justify-content: center; }
        .header-time { font-size: 1rem; font-weight: 600; color: #ffffff; }
        .header-date { font-size: 0.8rem; color: #bfdbfe; }

        /* --- LAYOUT --- */
        .mcb-container {
            display: flex;
            flex: 1;
            position: relative;
            align-items: stretch;
        }

        /* --- LEFT COLUMN (desktop: sidebar + footer column) --- */
        .mcb-left-column {
            width: 260px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            border-right: 1px solid #e2e8f0;
            position: sticky;
            top: 70px;
            height: calc(100vh - 70px);
            overflow: hidden;
        }

        /* --- SIDEBAR (naglalaman na ngayon ng nav + footer) --- */
        .mcb-sidebar {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .nav-menu {
            list-style: none;
            padding: 20px 12px;
            flex-shrink: 0;
        }
        .nav-item { margin-bottom: 6px; }

        .nav-link {
            display: flex; align-items: center; gap: 10px;
            padding: 12px 15px; color: #334155; text-decoration: none;
            font-size: 0.95rem; font-weight: 500;
            border-radius: 8px; transition: all 0.2s;
        }
        .nav-link:hover { background-color: #eff6ff; color: #1d4ed8; }
        .nav-link.active { background-color: #1d4ed8; color: #ffffff; font-weight: 600; }

        .nav-space { height: 20px; border-bottom: 1px solid #f1f5f9; margin-bottom: 20px; }
        .nav-section-label {
            font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;
            color: #64748b; font-weight: 700; padding: 0 15px 8px 15px;
        }

        /* --- FOOTER (ngayon ay nasa loob ng sidebar) --- */
        .mcb-footer {
            background-color: #0f172a;
            color: #cbd5e1;
            text-align: center;
            padding: 15px 12px;
            font-size: 0.8rem;
            flex-shrink: 0;
            margin-top: auto;          /* push sa ilalim sa desktop */
            border-top: 1px solid #1e293b;
        }
        .mcb-footer strong {
            color: #ffffff;
            display: block;
            margin-bottom: 3px;
            font-size: 0.85rem;
            line-height: 1.3;
        }
        .mcb-footer span {
            font-size: 0.7rem;
            color: #94a3b8;
        }

        /* --- MAIN CONTENT --- */
        .mcb-main-content {
            flex: 1;
            padding: 25px;
            overflow-x: auto;
            min-width: 0;
        }

        /* --- TABLET VIEW --- */
        @media (max-width: 1024px) {
            .header-title { font-size: 1.05rem; }
            .header-sub { font-size: 0.75rem; }
            .header-time { font-size: 0.9rem; }
            .header-date { font-size: 0.72rem; }
            .mcb-left-column { width: 220px; }
        }

        /* --- PHONE VIEW --- */
        @media (max-width: 767px) {
            body { padding-top: 60px; }
            .mcb-header { height: 60px; padding: 0 12px; }
            .hamburger-btn { display: block; font-size: 20px; padding: 4px; }
            .header-left { gap: 8px; max-width: 62%; }
            .header-title {
                font-size: 0.82rem; white-space: nowrap;
                overflow: hidden; text-overflow: ellipsis;
            }
            .header-sub {
                font-size: 0.65rem; white-space: nowrap;
                overflow: hidden; text-overflow: ellipsis;
            }
            .header-right { max-width: 38%; }
            .header-time { font-size: 0.75rem; }
            .header-date { font-size: 0.62rem; }

            /* Container: vertical stack */
            .mcb-container { flex-direction: column; }

            /* Left column: hindi na sticky */
            .mcb-left-column {
                position: static;
                width: 100%;
                height: auto;
                overflow: visible;
                border-right: none;
                background: transparent;
                display: block;
            }

            /* SIDEBAR: dropdown — kasama na ang footer sa loob */
            .mcb-sidebar {
                position: fixed;
                top: 60px;
                left: 0;
                width: 100%;
                max-height: 0;
                overflow: hidden;
                background-color: #ffffff;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 999;
                transition: max-height 0.4s ease;
            }
            .mcb-sidebar.open { max-height: 600px; }   /* sapat para sa nav + footer */

            /* Footer: kasama sa dropdown, walang margin-top auto sa phone */
            .mcb-footer {
                margin-top: 0;
                width: 100%;
                padding: 14px 12px;
                border-top: 1px solid #1e293b;
                border-left: none;
                flex-shrink: 0;
            }

            /* Main content: full width */
            .mcb-main-content {
                width: 100%;
                padding: 18px 14px;
                min-width: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Save existing content
    const existingContent = document.body.innerHTML;
    document.body.innerHTML = '';

    // 3. Header
    const headerHTML = `
        <header class="mcb-header">
            <div class="header-left">
                <button class="hamburger-btn" id="mcbHamburger" aria-label="Toggle Menu">&#9776;</button>
                <div class="header-titles">
                    <div class="header-title">Music Ministry and Daily Grace</div>
                    <div class="header-sub">Mobilization Church Balilihan</div>
                </div>
            </div>
            <div class="header-right">
                <div class="header-time" id="mcbLiveTime">--:--:--</div>
                <div class="header-date" id="mcbLiveDate">Loading date...</div>
            </div>
        </header>
    `;

    // 4. Container: LEFT COLUMN (sidebar + footer SA LOOB) + MAIN
    const containerHTML = `
        <div class="mcb-container">
            <div class="mcb-left-column">
                <aside class="mcb-sidebar" id="mcbSidebar">
                    <ul class="nav-menu">
                        <li class="nav-item"><a href="index.html" class="nav-link">🏠 Home</a></li>
                        <li class="nav-item"><a href="table.html" class="nav-link">📋 Table</a></li>
                        <li class="nav-item"><a href="monthly_schedule.html" class="nav-link">📅 Monthly</a></li>

                        <li class="nav-space"></li>

                        <li class="nav-section-label">Daily Grace Devotional</li>
                        <li class="nav-item"><a href="devotional.html" class="nav-link">📖 Devotional</a></li>
                        <li class="nav-item"><a href="certificate.html" class="nav-link">🎓 Certificate</a></li>

                        <li class="nav-space" style="border-bottom: none;"></li>
                    </ul>

                    <!-- FOOTER NASA LOOB NA NG SIDEBAR -->
                    <footer class="mcb-footer">
                        <strong>Mobilization Church Balilihan</strong>
                        <span>version 1 build by IT MCB</span>
                    </footer>
                </aside>
            </div>

            <main class="mcb-main-content">
                ${existingContent}
            </main>
        </div>
    `;

    // 5. Inject
    document.body.insertAdjacentHTML('afterbegin', headerHTML + containerHTML);

    // 6. Highlight active link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // 7. Hamburger toggle
    const hamburgerBtn = document.getElementById('mcbHamburger');
    const sidebar = document.getElementById('mcbSidebar');

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
        hamburgerBtn.innerHTML = sidebar.classList.contains('open') ? '&#10005;' : '&#9776;';
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 767 && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && e.target !== hamburgerBtn) {
                sidebar.classList.remove('open');
                hamburgerBtn.innerHTML = '&#9776;';
            }
        }
    });

    // 8. Live date/time
    function updateDateTime() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        document.getElementById('mcbLiveTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
        document.getElementById('mcbLiveDate').textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
});