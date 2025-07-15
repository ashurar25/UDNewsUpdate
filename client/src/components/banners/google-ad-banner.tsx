import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

interface GoogleAdBannerProps {
  adSlot: string;
  adSize: "square" | "banner" | "leaderboard" | "skyscraper";
  className?: string;
}

export function GoogleAdBanner({ adSlot, adSize, className = "" }: GoogleAdBannerProps) {
  const adSizes = {
    square: { width: 300, height: 250 },
    banner: { width: 320, height: 50 },
    leaderboard: { width: 728, height: 90 },
    skyscraper: { width: 160, height: 600 },
  };

  const size = adSizes[adSize];

  useEffect(() => {
    // Skip loading Google AdSense in development mode
    if (import.meta.env.DEV) {
      return;
    }

    // Load Google AdSense script only in production
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.onload = () => {
      // Initialize ads after script loads
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    };
    script.onerror = () => {
      console.error('Failed to load Google AdSense script');
    };
    document.head.appendChild(script);
  }, []);

  return (
    <Card className={`mb-6 ${className}`}>
      <CardContent className="p-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">โฆษณา</div>
          
          {/* Google AdSense - Only in production */}
          {!import.meta.env.DEV && (
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: size.width, height: size.height }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
              data-ad-slot={adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          )}
          
          {/* Fallback/Demo Ad - Always show in development */}
          <div 
            className="bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center text-blue-600 font-medium"
            style={{ width: size.width, height: size.height }}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📢</div>
              <div className="text-sm">พื้นที่โฆษณา</div>
              <div className="text-xs opacity-75">{size.width}x{size.height}</div>
              {import.meta.env.DEV && (
                <div className="text-xs text-blue-500 mt-1">Development Mode</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-configured components for common ad sizes
export function SidebarAdBanner() {
  return <GoogleAdBanner adSlot="1234567890" adSize="square" />;
}

export function HeaderAdBanner() {
  return <GoogleAdBanner adSlot="1234567891" adSize="leaderboard" className="mb-4" />;
}

export function MobileAdBanner() {
  return <GoogleAdBanner adSlot="1234567892" adSize="banner" className="sm:hidden" />;
}

export function StickyAdBanner() {
  return (
    <div className="sticky top-4">
      <GoogleAdBanner adSlot="1234567893" adSize="skyscraper" />
    </div>
  );
}