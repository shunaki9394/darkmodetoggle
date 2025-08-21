Theme Mode (Dark/Light Toggle) for GLPI

A tiny GLPI plugin that adds a dark mode to the UI with a one-click toggle.
The switch sits just to the left of the global search box, and your choice persists across sessions.

https://github.com/your-org/thememode
 (replace with your repo)

Features

🌗 Instant dark/light toggle (no page reload)

📍 Toggle is injected near the global search (not part of the search field)

💾 Preference persists via localStorage

🎨 Readability-tuned dark palette: tables, headers, forms, Select2, dropdowns, modals, pagination, alerts, tooltips

♿ Accessible focus rings and contrast targets

🧩 Implemented as a plugin (no core file edits)

Compatibility

GLPI: 10.x

License: MIT

Install

Download the latest release and extract to:

glpi/plugins/thememode


(The directory must be named thememode.)

In GLPI, go to Setup → Plugins, find Theme Mode (Dark/Light Toggle), click Install, then Enable.

Hard-refresh your browser (Ctrl/Cmd + Shift + R).

To remove, Disable then Uninstall from the same Plugins page.
No database tables are created by this plugin.

How it works

Adds a small JS snippet that injects a toggle button near the search bar and stores the chosen mode.

Loads two CSS files:

toggle.css — styling for the switch

dark.css — the dark theme (colors, tables, inputs, menus, etc.)

If the header/search layout isn’t available (custom themes), the plugin gracefully falls back to a small floating toggle.

Configuration

No admin settings yet. The current mode is stored in the browser under the key:

glpi_theme_mode = "light" | "dark"

Screenshots

Add screenshots here when you publish the repo:

docs/screenshot-light.png

docs/screenshot-dark.png

Development

Directory structure:

thememode/
├─ setup.php
├─ hook.php
├─ js/
│  └─ thememode.js
└─ css/
   ├─ toggle.css
   └─ dark.css


No build step is required (plain PHP/JS/CSS).

Changelog (short)

2.x – Dark theme readability pass (tables, notifications, menus); robust toggle placement.

1.x – Initial release with dark/light toggle and base palette.

Troubleshooting

Toggle not visible? Hard-refresh. If you use a custom header, the plugin should auto-position; otherwise it shows a floating toggle bottom-right.

Looks off after upgrading GLPI? Clear browser cache and ensure the plugin folder is named thememode.

Conflicting CSS? Check other UI-changing plugins/themes; adjust their load order if needed.
