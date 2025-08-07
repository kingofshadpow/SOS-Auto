"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/stores/theme-store"

export function useTheme() {
  const { isDark, toggleTheme, setTheme } = useThemeStore()

  useEffect(() => {
    // Check system preference on first load
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("sos-theme-storage")) {
        setTheme(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [isDark, setTheme])

  return { isDark, toggleTheme }
}
