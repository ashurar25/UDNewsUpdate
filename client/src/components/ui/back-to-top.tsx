import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-ud-orange hover:bg-ud-orange-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      size="icon"
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
}
