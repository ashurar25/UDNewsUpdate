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
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            
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
            <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">🌤️ สภาพอากาศ (อุดรธานี)</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">30°C</div>
          
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">พรุ่งนี้</div>
                      <div className="opacity-90">☀️ 32°C</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">มะรืนนี้</div>
                      <div className="opacity-90">🌧️ 27°C</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">เสาร์</div>
                      <div className="opacity-90">⛅ 30°C</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mt-6 mb-4">🌤️ สภาพอากาศ (กรุงเทพ)</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">34°C</div>
          
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">พรุ่งนี้</div>
                      <div className="opacity-90">☀️ 35°C</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">มะรืนนี้</div>
                      <div className="opacity-90">🌤️ 32°C</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">เสาร์</div>
                      <div className="opacity-90">☀️ 33°C</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">🌧️ โอกาสเกิดฝน (อุดรธานี)</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">40%</div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">พรุ่งนี้</div>
                      <div className="opacity-90">🌧️ 60%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">มะรืนนี้</div>
                      <div className="opacity-90">🌧️ 80%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">เสาร์</div>
                      <div className="opacity-90">☀️ 20%</div>
                    </div>
                  </div>
                </div>
                  <h3 className="text-lg font-bold mt-6 mb-4">🌧️ โอกาสเกิดฝน (กรุงเทพ)</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10%</div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">พรุ่งนี้</div>
                      <div className="opacity-90">☀️ 0%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">มะรืนนี้</div>
                      <div className="opacity-90">🌧️ 30%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">เสาร์</div>
                      <div className="opacity-90">☀️ 10%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 pb-2 border-b-2 border-ud-orange">
                  📱 ติดตามเรา
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">f</div>
                  <span className="font-medium text-gray-700">Facebook</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">T</div>
                  <span className="font-medium text-gray-700">Twitter</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors duration-300">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">IG</div>
                  <span className="font-medium text-gray-700">Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-300">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">YT</div>
                  <span className="font-medium text-gray-700">YouTube</span>
                </a>
              </CardContent>
            </Card>

          </aside>

        </div>
      </main>
    </div>
  );
}
