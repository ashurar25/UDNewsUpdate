import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BreakingTicker } from "@/components/news/breaking-ticker";
import { CategoryTabs } from "@/components/news/category-tabs";
import { NewsCard } from "@/components/news/news-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Article, Category } from "@shared/schema";
import { HeaderAdBanner, SidebarAdBanner } from "@/components/banners/google-ad-banner";
import { SidebarNewsBanner } from "@/components/banners/sidebar-news-banner";
import { WeatherBanner, NewsPromotionBanner } from "@/components/banners/news-promotion-banner";
import { SidebarCustomBanner, HeaderCustomBanner } from "@/components/banners/custom-banner";

export default function News() {
  const [sortBy, setSortBy] = useState<string>("latest");
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", { limit: limit * page, offset: 0 }],
    queryFn: () => fetch(`/api/articles?limit=${limit * page}&offset=0`).then(res => res.json()),
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const getCategoryById = (id: number) => {
    return categories.find(cat => cat.id === id);
  };

  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "oldest":
        return new Date(a.publishedAt!).getTime() - new Date(b.publishedAt!).getTime();
      default: // latest
        return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime();
    }
  });

  const displayedArticles = sortedArticles.slice(0, limit * page);
  const hasMore = articles.length === limit * page;

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreakingTicker />
      <CategoryTabs />
      
      {/* Header Advertisement */}
      <div className="container mx-auto px-4 py-4">
        <HeaderCustomBanner />
        <HeaderAdBanner />
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">ข่าวสารทั้งหมด</h1>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">เรียงตาม:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">ล่าสุด</SelectItem>
                    <SelectItem value="views">ยอดนิยม</SelectItem>
                    <SelectItem value="oldest">เก่าสุด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  category={getCategoryById(article.categoryId!)}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <Button 
                  onClick={loadMore}
                  className="bg-gradient-to-r from-ud-orange to-ud-orange-light hover:from-ud-orange-dark hover:to-ud-orange text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                >
                  โหลดข่าวเพิ่มเติม
                </Button>
              </div>
            )}

            {displayedArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบข่าวสาร</h3>
                <p className="text-gray-600">ยังไม่มีข่าวสารในขณะนี้</p>
              </div>
            )}
          </>
        )}
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <SidebarCustomBanner />
            <SidebarNewsBanner />
            <SidebarAdBanner />
            <NewsPromotionBanner />
            <WeatherBanner />
            <SidebarAdBanner />
          </aside>
          
        </div>
      </main>
    </div>
  );
}
