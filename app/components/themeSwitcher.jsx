// app/components/ThemeSwitcher.tsx
import { Button } from "@heroui/button";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {theme === "dark" ? (
        <Button isIconOnly color="warning" variant="faded" onClick={() => setTheme("light")}>
          <i className="ri-sun-line text-xl"></i>
        </Button>
      ) : (
        <Button  isIconOnly color="danger" variant="faded" onClick={() => setTheme("dark")}>
          <i className="ri-moon-clear-line text-xl"></i>
        </Button>
      )}
    </div>
  );
}