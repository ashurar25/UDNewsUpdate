import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BreakingTicker } from "@/components/news/breaking-ticker";
import { CategoryTabs } from "@/components/news/category-tabs";
import { NewsCard } from "@/components/news/news-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Article, Category } from "@shared/schema";

export default function CategoryPage() {
  const { slug } = useParams();

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["/api/categories", slug],
    enabled: !!slug,
  });

  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/categories", category?.id, "articles"],
    enabled: !!category?.id,
    queryFn: () => fetch(`/api/categories/${category?.id}/articles`).then(res => res.json()),
  });

  const { data: allCategories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded mb-8 w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-5">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ไม่พบหมวดหมู่</h1>
            <p className="text-gray-600 mb-8">หมวดหมู่ที่คุณต้องการไม่มีอยู่ในระบบ</p>
            <Button variant="outline">
              <a href="/news">กลับไปดูข่าวทั้งหมด</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const getCategoryIcon = (slug: string) => {
    const iconMap: { [key: string]: string } = {
      politics: "🏛️",
      economy: "💰",
      sports: "⚽",
      technology: "💻",
      entertainment: "🎬",
      health: "🏥",
      environment: "🌍",
    };
    return iconMap[slug] || "📰";
  };

  const getCategoryDescription = (slug: string) => {
    const descMap: { [key: string]: string } = {
      politics: "ข่าวการเมือง นโยบาย และการปกครองของประเทศ",
      economy: "ข่าวเศรษฐกิจ การเงิน การลงทุน และตลาดทุน",
      sports: "ข่าวกีฬาในประเทศและต่างประเทศ ผลการแข่งขัน",
      technology: "ข่าวเทคโนโลยี นวัตกรรม และดิจิทัล",
      entertainment: "ข่าวบันเทิง ดารา ภาพยนตร์ และเพลง",
      health: "ข่าวสุขภาพ การแพทย์ และสาธารณสุข",
      environment: "ข่าวสิ่งแวดล้อม ธรรมชาติ และการอนุรักษ์",
    };
    return descMap[slug] || "ข่าวสารและบทความในหมวดหมู่นี้";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreakingTicker />
      <CategoryTabs />

      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">{getCategoryIcon(category.slug)}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ข่าว{category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                {getCategoryDescription(category.slug)}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>{articles.length} บทความ</span>
                <span>•</span>
                <span>อัพเดทต่อเนื่อง</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles */}
        {articlesLoading ? (
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
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                category={category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{getCategoryIcon(category.slug)}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ยังไม่มีข่าวในหมวด{category.name}
            </h3>
            <p className="text-gray-600 mb-8">
              เราจะอัพเดทข่าวในหมวดหมู่นี้เร็วๆ นี้
            </p>
            <Button variant="outline">
              <a href="/news">ดูข่าวหมวดอื่น</a>
            </Button>
          </div>
        )}

        {/* Other Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">หมวดหมู่อื่นๆ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {allCategories
              .filter(cat => cat.slug !== category.slug)
              .map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-2xl mb-2">{getCategoryIcon(cat.slug)}</div>
                  <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                </a>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
