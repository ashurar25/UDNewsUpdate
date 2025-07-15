import { useQuery } from "@tanstack/react-query";
import type { Article } from "@shared/schema";

export function BreakingTicker() {
  const { data: breakingNews = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/breaking"],
  });

  if (breakingNews.length === 0) {
    return null;
  }

  const tickerText = breakingNews
    .map(article => article.title)
    .join(" • ");

  return (
    <div className="bg-gradient-to-r from-red-600 to-ud-orange text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold mr-4 flex-shrink-0">
            ข่าวด่วน
          </span>
          <div className="breaking-ticker whitespace-nowrap font-medium">
            🔥 {tickerText}
          </div>
        </div>
      </div>
    </div>
  );
}
