import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

export function NewsPromotionBanner() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <Card className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-orange-800 flex items-center gap-2">
          <span className="text-orange-500">⚡</span>
          หมวดหมู่ข่าว
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <div className="group cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 border border-yellow-100 hover:border-orange-300">
                <div className="text-center">
                  <div className="text-2xl mb-1">{getCategoryIcon(category.name)}</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="pt-3 border-t border-yellow-200">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-3 text-center">
            <div className="text-sm font-bold mb-1">🎯 ข่าวพิเศษ</div>
            <div className="text-xs opacity-90">อัปเดตข่าวสารทุกวัน</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WeatherBanner() {
  return (
    <Card className="mb-6 bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-blue-800 flex items-center gap-2">
          <span className="text-blue-500">🌤️</span>
          สภาพอากาศวันนี้
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-white rounded-lg p-3 border border-blue-100">
            <div className="text-sm font-medium text-blue-700">อุดรธานี</div>
            <div className="text-2xl font-bold text-blue-900">32°C</div>
            <div className="text-xs text-blue-600">☀️ แจ่มใส</div>
          </div>
          <div className="text-center bg-white rounded-lg p-3 border border-blue-100">
            <div className="text-sm font-medium text-blue-700">กรุงเทพ</div>
            <div className="text-2xl font-bold text-blue-900">35°C</div>
            <div className="text-xs text-blue-600">🌤️ ร้อน</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-3 border border-blue-100">
          <div className="text-sm font-medium text-blue-700 mb-2">พยากรณ์ 3 วัน</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium">วันนี้</div>
              <div className="text-blue-600">☀️ 32°C</div>
            </div>
            <div className="text-center">
              <div className="font-medium">พรุ่งนี้</div>
              <div className="text-blue-600">🌧️ 28°C</div>
            </div>
            <div className="text-center">
              <div className="font-medium">มะรืน</div>
              <div className="text-blue-600">⛅ 30°C</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SocialMediaBanner() {
  return (
    <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-purple-800 flex items-center gap-2">
          <span className="text-purple-500">📱</span>
          ติดตามเรา
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="group cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 border border-purple-100 hover:border-purple-300">
            <div className="text-center">
              <div className="text-2xl mb-1">👥</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                Facebook
              </div>
            </div>
          </a>
          <a href="#" className="group cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 border border-purple-100 hover:border-purple-300">
            <div className="text-center">
              <div className="text-2xl mb-1">🐦</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                Twitter
              </div>
            </div>
          </a>
          <a href="#" className="group cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 border border-purple-100 hover:border-purple-300">
            <div className="text-center">
              <div className="text-2xl mb-1">📸</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                Instagram
              </div>
            </div>
          </a>
          <a href="#" className="group cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 border border-purple-100 hover:border-purple-300">
            <div className="text-center">
              <div className="text-2xl mb-1">📺</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                YouTube
              </div>
            </div>
          </a>
        </div>
        
        <div className="pt-3 border-t border-purple-200">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-3 text-center">
            <div className="text-sm font-bold mb-1">🔔 แจ้งเตือนข่าว</div>
            <div className="text-xs opacity-90">รับข่าวใหม่ทันที</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getCategoryIcon(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    "ข่าวทั่วไป": "📰",
    "การเมือง": "🏛️",
    "เศรษฐกิจ": "💰",
    "กีฬา": "⚽",
    "บันเทิง": "🎭",
    "เทคโนโลยี": "💻",
    "สุขภาพ": "🏥",
    "ท่องเที่ยว": "✈️",
    "ประกาศ": "📢",
    "ท้องถิ่น": "🏘️",
  };
  
  return iconMap[categoryName] || "📄";
}