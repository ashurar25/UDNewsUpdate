import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Category } from "@shared/schema";

export function CategoryTabs() {
  const [location] = useLocation();
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const isActive = (slug: string) => {
    if (slug === "all") {
      return location === "/" || location === "/news";
    }
    return location === `/category/${slug}`;
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-4 overflow-x-auto">
          <Button
            asChild
            variant={isActive("all") ? "default" : "outline"}
            className={`flex-shrink-0 ${
              isActive("all")
                ? "bg-ud-orange hover:bg-ud-orange-dark text-white"
                : "bg-gray-100 text-gray-700 hover:bg-ud-orange hover:text-white"
            }`}
          >
            <Link href="/news">ทั้งหมด</Link>
          </Button>

          {categories.map((category) => (
            <Button
              key={category.slug}
              asChild
              variant={isActive(category.slug) ? "default" : "outline"}
              className={`flex-shrink-0 ${
                isActive(category.slug)
                  ? "bg-ud-orange hover:bg-ud-orange-dark text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-ud-orange hover:text-white"
              }`}
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
