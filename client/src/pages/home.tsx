import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BreakingTicker } from "@/components/news/breaking-ticker";
import { CategoryTabs } from "@/components/news/category-tabs";
import { NewsCard } from "@/components/news/news-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/constants";
import type { Article, Category } from "@shared/schema";
import { SidebarNewsBanner } from "@/components/banners/sidebar-news-banner";
import { SidebarAdBanner, HeaderAdBanner, MobileAdBanner } from "@/components/banners/google-ad-banner";
import { NewsPromotionBanner, WeatherBanner, SocialMediaBanner } from "@/components/banners/news-promotion-banner";
import { SidebarCustomBanner, HeaderCustomBanner, ContentCustomBanner } from "@/components/banners/custom-banner";

export default function Home() {
  const { data: featuredArticle } = useQuery<Article>({
    queryKey: ["/api/articles/featured"],
  });

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    queryFn: () => fetch("/api/articles?limit=8").then(res => res.json()),
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: trendingArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/trending"],
  });

  const getCategoryById = (id: number) => {
    return categories.find(cat => cat.id === id);
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
            
            {/* Featured Article */}
            {featuredArticle && (
              <section className="mb-8">
                <NewsCard 
                  article={featuredArticle} 
                  category={getCategoryById(featuredArticle.categoryId!)}
                  featured 
                />
              </section>
            )}

            {/* News Grid */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ข่าวล่าสุด</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {articles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    category={getCategoryById(article.categoryId!)}
                  />
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-ud-orange to-ud-orange-light hover:from-ud-orange-dark hover:to-ud-orange text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/news">ดูข่าวทั้งหมด</Link>
                </Button>
              </div>
            </section>
            
            {/* Content Ad Banner */}
            <div className="mb-8">
              <ContentCustomBanner />
              <HeaderAdBanner />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            
            {/* Mobile Ad Banner */}
            <MobileAdBanner />
            
            {/* Custom Banners */}
            <SidebarCustomBanner />
            
            {/* Sidebar News Banner */}
            <SidebarNewsBanner />
            
            {/* Sidebar Ad Banner */}
            <SidebarAdBanner />
            
            {/* News Promotion Banner */}
            <NewsPromotionBanner />
            
            {/* Trending News */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 pb-2 border-b-2 border-ud-orange">
                  🔥 ข่าวฮิต
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingArticles.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug}`}>
                    <div className="group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <h4 className="font-medium text-gray-900 group-hover:text-ud-orange transition-colors duration-300 leading-tight">
                        {article.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-2">
                        {article.categoryId && (
                          <>
                            <span className="text-xs text-gray-500">
                              {getCategoryById(article.categoryId)?.name}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                          </>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(article.publishedAt!)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {article.views || 0} ผู้อ่าน
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <WeatherBanner />
            
            {/* Another Ad Banner */}
            <SidebarAdBanner />
            
            {/* Social Media */}
            <SocialMediaBanner />

          </aside>

        </div>
      </main>
    </div>
  );
}
