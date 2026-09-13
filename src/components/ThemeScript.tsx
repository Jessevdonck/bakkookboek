/**
 * Applies the saved theme to <html> before React hydrates, so the page
 * never flashes the wrong theme on load. Light is the default until the
 * visitor explicitly toggles dark mode (we don't follow the system
 * preference here on purpose).
 */
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
