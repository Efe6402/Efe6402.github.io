(() => {
  const root = document.documentElement;
  const storageKey = "efe-karakoca-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const readSavedTheme = () => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved === "dark" || saved === "light" ? saved : null;
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The selected theme still applies when browser storage is unavailable.
    }
  };

  const updateControl = () => {
    const button = document.querySelector(".theme-toggle");
    if (!button) return;

    const isDark = root.dataset.theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    button.setAttribute("title", `Switch to ${nextTheme} theme`);
    button.setAttribute("aria-pressed", String(isDark));
    button.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
    button.querySelector(".theme-label").textContent = isDark ? "Light" : "Dark";
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (persist) saveTheme(theme);
    updateControl();
  };

  applyTheme(readSavedTheme() || (systemTheme.matches ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", () => {
    updateControl();
    document.querySelector(".theme-toggle")?.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  });

  systemTheme.addEventListener?.("change", (event) => {
    if (!readSavedTheme()) applyTheme(event.matches ? "dark" : "light");
  });
})();
