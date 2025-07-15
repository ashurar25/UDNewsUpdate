import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ExternalLink } from "lucide-react";
import type { Banner } from "@shared/schema";

interface CustomBannerProps {
  position: string;
  className?: string;
  limit?: number;
}

export function CustomBanner({ position, className = "", limit }: CustomBannerProps) {
  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners", position],
    queryFn: () => apiRequest("GET", `/api/banners?position=${position}&active=true`),
  });

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(limit || 3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="bg-gray-200 h-32 rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-3 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  const displayBanners = limit ? banners.slice(0, limit) : banners;

  return (
    <div className={`space-y-4 ${className}`}>
      {displayBanners.map((banner) => (
        <Card key={banner.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            {banner.linkUrl ? (
              <a
                href={banner.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                </div>
              </a>
            ) : (
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{banner.title}</h3>
              {banner.description && (
                <p className="text-gray-600 text-sm line-clamp-3">{banner.description}</p>
              )}
              {banner.linkUrl && (
                <div className="mt-2 flex items-center text-blue-600 text-sm">
                  <span>คลิกเพื่อดูรายละเอียด</span>
                  <ExternalLink size={12} className="ml-1" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Pre-configured components for different positions
export function SidebarCustomBanner() {
  return <CustomBanner position="sidebar" className="mb-6" limit={3} />;
}

export function HeaderCustomBanner() {
  return <CustomBanner position="header" className="mb-4" limit={1} />;
}

export function FooterCustomBanner() {
  return <CustomBanner position="footer" className="mt-6" limit={2} />;
}

export function ContentCustomBanner() {
  return <CustomBanner position="content" className="my-6" limit={1} />;
}