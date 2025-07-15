export const CATEGORIES = [
  { name: "ทั้งหมด", slug: "all", color: "gray" },
  { name: "การเมือง", slug: "politics", color: "blue" },
  { name: "เศรษฐกิจ", slug: "economy", color: "yellow" },
  { name: "กีฬา", slug: "sports", color: "green" },
  { name: "เทคโนโลยี", slug: "technology", color: "purple" },
  { name: "บันเทิง", slug: "entertainment", color: "pink" },
  { name: "สุขภาพ", slug: "health", color: "red" },
  { name: "สิ่งแวดล้อม", slug: "environment", color: "emerald" },
];

export const SOCIAL_LINKS = [
  { name: "Facebook", icon: "📘", url: "#", color: "blue" },
  { name: "Twitter", icon: "🐦", url: "#", color: "sky" },
  { name: "Instagram", icon: "📷", url: "#", color: "pink" },
  { name: "YouTube", icon: "📺", url: "#", color: "red" },
];

export const FOOTER_LINKS = {
  about: [
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ทีมงาน", href: "/about#team" },
    { name: "ติดต่อเรา", href: "/contact" },
    { name: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
  ],
  categories: [
    { name: "การเมือง", href: "/category/politics" },
    { name: "เศรษฐกิจ", href: "/category/economy" },
    { name: "กีฬา", href: "/category/sports" },
    { name: "เทคโนโลยี", href: "/category/technology" },
  ],
  services: [
    { name: "RSS Feed", href: "/rss" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "API สำหรับนักพัฒนา", href: "/api-docs" },
    { name: "แจ้งข่าว", href: "/submit" },
  ],
};

export const formatTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "เมื่อสักครู่";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} นาทีที่แล้ว`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ชั่วโมงที่แล้ว`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} วันที่แล้ว`;
  } else {
    return then.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
