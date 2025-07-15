import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news/news-card";
import { formatDate, formatTimeAgo } from "@/lib/constants";
import { ArrowLeft, Eye, Clock, User, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Article, Category } from "@shared/schema";

export default function NewsDetail() {
  const { slug } = useParams();
  const { toast } = useToast();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    enabled: !!slug,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: relatedArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/categories", article?.categoryId, "articles"],
    enabled: !!article?.categoryId,
    queryFn: () => fetch(`/api/categories/${article?.categoryId}/articles`).then(res => res.json()),
  });

  const category = categories.find(cat => cat.id === article?.categoryId);

  const getCategoryColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-800",
      yellow: "bg-yellow-100 text-yellow-800", 
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      pink: "bg-pink-100 text-pink-800",
      red: "bg-red-100 text-red-800",
      emerald: "bg-emerald-100 text-emerald-800",
    };
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "คัดลอกลิงก์แล้ว",
        description: "ลิงก์ข่าวถูกคัดลอกไปยังคลิปบอร์ดแล้ว",
      });
    }
  };

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - UDNewsUpdate`;
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4 w-1/3"></div>
              <div className="h-12 bg-gray-300 rounded mb-6"></div>
              <div className="h-64 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">📰</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ไม่พบข่าวที่ต้องการ</h1>
            <p className="text-gray-600 mb-8">ข่าวที่คุณต้องการอาจถูกลบหรือเปลี่ยนลิงก์แล้ว</p>
            <Button asChild variant="outline">
              <Link href="/news">กลับไปดูข่าวทั้งหมด</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const filteredRelatedArticles = relatedArticles
    .filter(related => related.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปดูข่าวทั้งหมด
            </Link>
          </Button>

          {/* Article */}
          <Card className="mb-8">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center space-x-4 mb-6">
                  {article.isBreaking && (
                    <Badge className="bg-red-100 text-red-800">ข่าวด่วน</Badge>
                  )}
                  {category && (
                    <Badge className={getCategoryColor(category.color)}>
                      {category.name}
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="ml-auto"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    แชร์
                  </Button>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(article.publishedAt!)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>อ่าน {article.readTime} นาที</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{article.views || 0} ผู้อ่าน</span>
                  </div>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Image */}
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              )}

              {/* Content */}
              <div className="p-8 pt-6">
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags/Categories */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">หมวดหมู่:</span>
                      {category && (
                        <Link href={`/category/${category.slug}`}>
                          <Badge 
                            variant="outline" 
                            className="hover:bg-ud-orange hover:text-white cursor-pointer"
                          >
                            {category.name}
                          </Badge>
                        </Link>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      อัพเดทเมื่อ {formatTimeAgo(article.publishedAt!)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {filteredRelatedArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ข่าวที่เกี่ยวข้อง</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRelatedArticles.map((relatedArticle) => (
                  <NewsCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    category={categories.find(cat => cat.id === relatedArticle.categoryId)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
