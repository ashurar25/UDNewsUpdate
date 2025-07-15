import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@shared/schema";
import { formatTimeAgo } from "@/lib/constants";

export function SidebarNewsBanner() {
  const { data: latestArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/latest"],
    queryFn: () => fetch("/api/articles?limit=5").then(res => res.json()),
  });

  return (
    <Card className="mb-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-red-800 flex items-center gap-2">
          <span className="text-red-500">🔥</span>
          ข่าวเร่งด่วน
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {latestArticles.slice(0, 3).map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <div className="group cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 border border-red-100">
              <div className="flex items-start gap-3">
                {article.imageUrl && (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight text-sm line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatTimeAgo(article.publishedAt!)}</span>
                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                      ใหม่
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        
        <div className="pt-3 border-t border-red-200">
          <Link href="/news">
            <div className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-medium transition-colors duration-300">
              ดูข่าวทั้งหมด
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}