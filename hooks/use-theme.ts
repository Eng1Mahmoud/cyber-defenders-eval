"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect current theme (dark/light) based on document.documentElement class
 * Returns true if dark mode is active
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Initial check
        setIsDark(document.documentElement.classList.contains("dark"));

        // Create observer to watch for class changes on html element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDark(document.documentElement.classList.contains("dark"));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    return { isDark };
}
