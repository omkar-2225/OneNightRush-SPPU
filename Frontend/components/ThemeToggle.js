"use client";

import { useEffect, useState } from "react";

const storageKey = "onenightrush-theme";
const themeChangeEvent = "onenightrush-theme-change";

export default function ThemeToggle({ className = "", showLabel = false }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const initialTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);

    function syncTheme() {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    }

    window.addEventListener(themeChangeEvent, syncTheme);
    return () => window.removeEventListener(themeChangeEvent, syncTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  const nextMode = theme === "dark" ? "light" : "dark";

  return (
    <button
      className={`theme-toggle ${className}`.trim()}
      type="button"
      aria-label={`Switch to ${nextMode} mode`}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
    >
      <span className="theme-icon" aria-hidden="true">
        {theme === "dark" ? "☼" : "☾"}
      </span>
      {showLabel && <span>{nextMode === "dark" ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}
