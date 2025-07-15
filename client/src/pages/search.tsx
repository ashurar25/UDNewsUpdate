import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/news/news-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, TrendingUp } from "lucide-react";
import type { Article, Category } from "@shared/schema";

export default function SearchPage() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Get query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam, selectedCategory, sortBy);
    }
  }, [location]);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: trendingArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/trending"],
  });

  const getCategoryById = (id: number) => {
    return categories.find(cat => cat.id === id);
  };

  const performSearch = async (query: string, category: string, sort: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      let url = `/api/articles?search=${encodeURIComponent(query)}`;
      if (category !== "all") {
        url += `&categoryId=${category}`;
      }

      const response = await fetch(url);
      let articles: Article[] = await response.json();

      // Sort results
      articles = articles.sort((a, b) => {
        switch (sort) {
          case "views":
            return (b.views || 0) - (a.views || 0);
          case "oldest":
            return new Date(a.publishedAt!).getTime() - new Date(b.publishedAt!).getTime();
          default: // latest
            return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime();
        }
      });

      setSearchResults(articles);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery, selectedCategory, sortBy);
    
    // Update URL
    const url = new URL(window.location.href);
    if (searchQuery.trim()) {
      url.searchParams.set('q', searchQuery.trim());
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (hasSearched) {
      performSearch(searchQuery, category, sortBy);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    if (hasSearched) {
      performSearch(searchQuery, selectedCategory, sort);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setSelectedCategory("all");
    setSortBy("latest");
    
    // Clear URL parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url.toString());
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-ud-yellow/30 text-ud-orange-dark font-medium">{part}</mark> : 
        part
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ค้นหาข่าวสาร</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ค้นหาข่าวสาร บทความ และข้อมูลที่คุณสนใจจากฐานข้อมูลของเรา
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="กรอกคำค้นหา..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 text-lg h-12"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Filter className="inline h-4 w-4 mr-1" />
                    หมวดหมู่
                  </label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue />
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เรียงตาม
                  </label>
                  <Select value={sortBy} onValueChange={handleSortChange}>
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

                <div className="flex items-end">
                  <Button 
                    type="submit" 
                    className="w-full bg-ud-orange hover:bg-ud-orange-dark"
                    disabled={isSearching}
                  >
                    {isSearching ? "กำลังค้นหา..." : "ค้นหา"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div className="mb-8">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">ผลการค้นหา</h2>
                <p className="text-gray-600">
                  พบ <span className="font-semibold text-ud-orange">{searchResults.length}</span> รายการ
                  {searchQuery && (
                    <> สำหรับ "<span className="font-medium">{searchQuery}</span>"</>
                  )}
                  {selectedCategory !== "all" && (
                    <> ในหมวด "<span className="font-medium">{getCategoryById(parseInt(selectedCategory))?.name}</span>"</>
                  )}
                </p>
              </div>

              {(searchQuery || selectedCategory !== "all") && (
                <Button variant="outline" onClick={clearSearch}>
                  <X className="h-4 w-4 mr-2" />
                  ล้างการค้นหา
                </Button>
              )}
            </div>

            {/* Search Result Filters */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="text-sm">
                    คำค้นหา: {searchQuery}
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="text-sm">
                    หมวดหมู่: {getCategoryById(parseInt(selectedCategory))?.name}
                  </Badge>
                )}
              </div>
            )}

            {/* Results Grid */}
            {isSearching ? (
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
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((article) => (
                  <div key={article.id}>
                    <NewsCard
                      article={{
                        ...article,
                        title: highlightText(article.title, searchQuery) as any,
                        excerpt: highlightText(article.excerpt, searchQuery) as any,
                      }}
                      category={getCategoryById(article.categoryId!)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบผลการค้นหา</h3>
                <p className="text-gray-600 mb-6">
                  ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>💡 เคล็ดลับการค้นหา:</p>
                  <ul className="list-disc list-inside space-y-1 max-w-md mx-auto">
                    <li>ใช้คำที่สั้นและชัดเจน</li>
                    <li>ลองใช้คำพ้องความหมาย</li>
                    <li>ตรวจสอบการสะกดคำ</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Trending and Suggestions */}
        {!hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Trending Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-ud-orange" />
                  <span>คำค้นหายอดนิยม</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "การเมือง", "เศรษฐกิจ", "กีฬา", "เทคโนโลยี", 
                    "บันเทิง", "สุขภาพ", "สิ่งแวดล้อม", "AI", 
                    "ฟุตบอลโลก", "ตลาดหุ้น"
                  ].map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(keyword);
                        performSearch(keyword, selectedCategory, sortBy);
                      }}
                      className="hover:bg-ud-orange hover:text-white"
                    >
                      {keyword}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-ud-orange">🔥</span>
                  <span>ข่าวยอดนิยม</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingArticles.slice(0, 5).map((article) => (
                  <div key={article.id} className="group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <a href={`/news/${article.slug}`}>
                      <h4 className="font-medium text-gray-900 group-hover:text-ud-orange transition-colors duration-300 leading-tight mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{getCategoryById(article.categoryId!)?.name}</span>
                        <span>•</span>
                        <span>{article.views || 0} ผู้อ่าน</span>
                      </div>
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
}
