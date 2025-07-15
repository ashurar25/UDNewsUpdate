import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/news/news-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Article, Category } from "@shared/schema";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const getCategoryById = (id: number) => {
    return categories.find(cat => cat.id === id);
  };

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        article.categoryId === parseInt(selectedCategory);

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "oldest":
          return new Date(a.publishedAt!).getTime() - new Date(b.publishedAt!).getTime();
        default: // latest
          return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">บทความและข่าวเชิงลึก</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            รวมบทความและข่าวสารเชิงลึกที่คัดสรรมาเพื่อผู้อ่าน พร้อมการวิเคราะห์และมุมมองที่หลากหลาย
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ค้นหาบทความ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
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

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            พบ <span className="font-semibold text-ud-orange">{filteredArticles.length}</span> บทความ
            {searchQuery && ` สำหรับ "${searchQuery}"`}
            {selectedCategory !== "all" && ` ในหมวด "${getCategoryById(parseInt(selectedCategory))?.name}"`}
          </p>
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
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                category={getCategoryById(article.categoryId!)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบบทความ</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `ไม่พบบทความที่ตรงกับ "${searchQuery}"`
                : "ยังไม่มีบทความในหมวดหมู่นี้"
              }
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              รีเซ็ตการค้นหา
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
