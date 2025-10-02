import { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeContext = createContext<ThemeContextValue>({} as any);

export const useTheme = () => {
  //TODO
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    window.localStorage.setItem("theme", theme);

    if (theme == "dark") {
      window.document.documentElement.setAttribute("data-theme", "dark");
    } else {
      window.document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

interface Props {
  children: React.ReactNode;
}

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
