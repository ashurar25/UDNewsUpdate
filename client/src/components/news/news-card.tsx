import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/constants";
import type { Article, Category } from "@shared/schema";

interface NewsCardProps {
  article: Article;
  category?: Category;
  featured?: boolean;
}

export function NewsCard({ article, category, featured = false }: NewsCardProps) {
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

  if (featured) {
    return (
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-ud-orange transition-all duration-300 hover:shadow-xl news-card-hover">
        <Link href={`/news/${article.slug}`}>
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          )}
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              {article.isBreaking && (
                <Badge className="bg-red-100 text-red-800">ข่าวด่วน</Badge>
              )}
              {category && (
                <Badge className={getCategoryColor(category.color)}>
                  {category.name}
                </Badge>
              )}
              <span className="text-gray-500 text-sm">
                {formatTimeAgo(article.publishedAt!)}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">โดย: {article.author}</span>
                <span className="text-sm text-gray-500">อ่าน {article.readTime} นาที</span>
                <span className="text-sm text-gray-500">{article.views || 0} ผู้อ่าน</span>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg news-card-hover">
      <Link href={`/news/${article.slug}`}>
        {article.imageUrl && (
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        )}
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-3">
            {category && (
              <Badge className={getCategoryColor(category.color)}>
                {category.name}
              </Badge>
            )}
            <span className="text-gray-500 text-xs">
              {formatTimeAgo(article.publishedAt!)}
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">อ่าน {article.readTime} นาที</span>
            <span className="text-xs text-gray-500">{article.views || 0} ผู้อ่าน</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
