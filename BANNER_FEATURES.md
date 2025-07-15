# 🎯 แบนเนอร์ข่าวและโฆษณา - UDNewsUpdate

## 🚀 ฟีเจอร์ที่เพิ่มขึ้น

### 1. **แบนเนอร์ข่าวด้านข้าง (Sidebar News Banner)**
- 📰 แสดงข่าวเร่งด่วนล่าสุด
- 🖼️ รูปภาพประกอบข่าว
- 🔗 ลิงก์ไปยังข่าวเต็ม
- 📱 Responsive design
- 📍 ตำแหน่ง: Sidebar ด้านขวา

### 2. **แบนเนอร์ Google Ads**
- 📢 Google AdSense integration
- 🎯 หลายรูปแบบ:
  - **Square** (300x250) - Sidebar
  - **Banner** (320x50) - Mobile
  - **Leaderboard** (728x90) - Header
  - **Skyscraper** (160x600) - Sticky
- 💰 พร้อมรับโฆษณา Google
- 🔄 Fallback display เมื่อไม่มีโฆษณา

### 3. **แบนเนอร์หมวดหมู่ข่าว (News Promotion Banner)**
- ⚡ เข้าถึงหมวดหมู่ข่าวง่าย
- 🎨 ไอคอนสวยงาม
- 🌈 สีสันสดใส
- 📊 Grid layout

### 4. **แบนเนอร์สภาพอากาศ (Weather Banner)**
- 🌤️ สภาพอากาศอุดรธานี & กรุงเทพ
- 📈 พยากรณ์ 3 วัน
- 🎨 Gradient design
- 📱 Mobile-friendly

### 5. **แบนเนอร์โซเชียลมีเดีย (Social Media Banner)**
- 📱 Facebook, Twitter, Instagram, YouTube
- 🔔 แจ้งเตือนข่าว
- 🎯 Call-to-action buttons
- 💜 สีสันสดใส

## 📍 ตำแหน่งการวาง

### หน้าแรก (Home)
```
📰 Breaking Ticker
📂 Category Tabs
📢 Header Ad Banner
┌─────────────────┬─────────────────┐
│ Featured News   │ 🔥 Breaking News │
│ Latest Articles │ 📢 Ad Banner    │
│ More Articles   │ ⚡ Categories   │
│ 📢 Content Ad   │ 🔥 Trending     │
└─────────────────┤ 🌤️ Weather     │
                  │ 📢 Ad Banner    │
                  │ 📱 Social Media │
                  └─────────────────┘
```

### หน้าข่าว (News)
```
📰 Breaking Ticker
📂 Category Tabs
📢 Header Ad Banner
┌─────────────────┬─────────────────┐
│ All News        │ 🔥 Breaking News │
│ Sort Options    │ 📢 Ad Banner    │
│ News Grid       │ ⚡ Categories   │
│ Load More       │ 🌤️ Weather     │
└─────────────────┤ 📢 Ad Banner    │
                  └─────────────────┘
```

## 🎨 การปรับแต่ง

### Google Ads Setup
1. **แทนที่ Publisher ID**:
   ```javascript
   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
   ```

2. **ปรับ Ad Slots**:
   ```javascript
   // SidebarAdBanner
   adSlot="1234567890"
   
   // HeaderAdBanner  
   adSlot="1234567891"
   
   // MobileAdBanner
   adSlot="1234567892"
   ```

### การปรับสี
```css
/* แบนเนอร์ข่าวด่วน */
.from-red-50.to-red-100

/* แบนเนอร์หมวดหมู่ */
.from-yellow-50.to-orange-100

/* แบนเนอร์สภาพอากาศ */
.from-blue-50.to-sky-100

/* แบนเนอร์โซเชียล */
.from-purple-50.to-pink-100
```

## 📱 Responsive Design

### Mobile
- 📱 MobileAdBanner (320x50) - แสดงบน Mobile เท่านั้น
- 📊 Grid layout ปรับเป็น 1 คอลัมน์
- 🎯 Touch-friendly buttons

### Tablet
- 📐 Grid layout ปรับเป็น 2 คอลัมน์
- 🖼️ รูปภาพปรับขนาด
- 📱 Responsive text

### Desktop
- 📐 Layout เต็ม 4 คอลัมน์
- 🎯 Hover effects
- 📊 Full sidebar display

## 🔧 Component Structure

```
client/src/components/banners/
├── sidebar-news-banner.tsx      # แบนเนอร์ข่าวด้านข้าง
├── google-ad-banner.tsx         # แบนเนอร์ Google Ads
└── news-promotion-banner.tsx    # แบนเนอร์หมวดหมู่/สภาพอากาศ/โซเชียล
```

## 📈 Performance

- ⚡ Lazy loading
- 🔄 Shimmer loading effects
- 📱 Mobile optimization
- 🎯 SEO-friendly
- 🚀 Fast rendering

## 🎯 การใช้งาน

1. **เพิ่มแบนเนอร์ใหม่**:
   ```tsx
   import { SidebarAdBanner } from "@/components/banners/google-ad-banner";
   
   <SidebarAdBanner />
   ```

2. **ปรับแต่งแบนเนอร์**:
   ```tsx
   <GoogleAdBanner 
     adSlot="1234567890" 
     adSize="square" 
     className="mb-4"
   />
   ```

3. **เพิ่มหน้าใหม่**:
   - Import components ที่ต้องการ
   - วางใน sidebar หรือ content area
   - ปรับ responsive design

## 🎉 ผลลัพธ์

✅ **เว็บไซต์มีแบนเนอร์ข่าวด้านข้าง**  
✅ **เว็บไซต์มีแบนเนอร์ Google Ads**  
✅ **Responsive design ครบทุกหน้าจอ**  
✅ **สวยงาม และใช้งานง่าย**  
✅ **พร้อมสำหรับการใช้งานจริง**  

---

*🎯 UDNewsUpdate - อัพเดทข่าวฮอต*  
*✨ Made by Ashura*