import { categories, articles, contacts, banners, type Category, type Article, type Contact, type Banner, type InsertCategory, type InsertArticle, type InsertContact, type InsertBanner } from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Articles
  getArticles(params?: { categoryId?: number; limit?: number; offset?: number; search?: string }): Promise<Article[]>;
  getFeaturedArticle(): Promise<Article | undefined>;
  getBreakingNews(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  getTrendingArticles(): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  incrementViews(id: number): Promise<void>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Article Management
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: number): Promise<void>;

  // Banners
  getBanners(params?: { position?: string; active?: boolean }): Promise<Banner[]>;
  getBannerById(id: number): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner>;
  deleteBanner(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private contacts: Map<number, Contact>;
  private banners: Map<number, Banner>;
  private categoryIdCounter: number;
  private articleIdCounter: number;
  private contactIdCounter: number;
  private bannerIdCounter: number;

  constructor() {
    this.categories = new Map();
    this.articles = new Map();
    this.contacts = new Map();
    this.banners = new Map();
    this.categoryIdCounter = 1;
    this.articleIdCounter = 1;
    this.contactIdCounter = 1;
    this.bannerIdCounter = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "การเมือง", slug: "politics", color: "blue" },
      { name: "เศรษฐกิจ", slug: "economy", color: "yellow" },
      { name: "กีฬา", slug: "sports", color: "green" },
      { name: "เทคโนโลยี", slug: "technology", color: "purple" },
      { name: "บันเทิง", slug: "entertainment", color: "pink" },
      { name: "สุขภาพ", slug: "health", color: "red" },
      { name: "สิ่งแวดล้อม", slug: "environment", color: "emerald" },
    ];

    categoriesData.forEach(cat => {
      const category: Category = { id: this.categoryIdCounter++, ...cat };
      this.categories.set(category.id, category);
    });

    // Initialize articles
    const articlesData = [
      {
        title: "รัฐบาลเร่งผลักดันนโยบายใหม่ กระตุ้นเศรษฐกิจหลังโควิด-19",
        slug: "government-economic-policy-post-covid",
        excerpt: "นายกรัฐมนตรีเปิดเผยแผนการกระตุ้นเศรษฐกิจระยะใหม่ มูลค่ากว่า 2 แสนล้านบาท เพื่อฟื้นฟูเศรษฐกิจของประเทศหลังวิกฤติโควิด-19",
        content: "นายกรัฐมนตรีเปิดเผยแผนการกระตุ้นเศรษฐกิจระยะใหม่ มูลค่ากว่า 2 แสนล้านบาท เพื่อฟื้นฟูเศรษฐกิจของประเทศหลังวิกฤติโควิด-19 โดยเน้นการสร้างงาน การลงทุนโครงสร้างพื้นฐาน และการพัฒนาเทคโนโลยีดิจิทัล แผนดังกล่าวคาดว่าจะช่วยสร้างงานใหม่มากกว่า 500,000 ตำแหน่ง และเพิ่มอัตราการเติบโตทางเศรษฐกิจของประเทศอย่างมีนัยสำคัญ",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        categoryId: 1,
        author: "ทีมข่าวการเมือง UDNewsUpdate",
        readTime: 5,
        isBreaking: true,
        isFeatured: true,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        views: 15420,
      },
      {
        title: "บริษัทไทยพัฒนา AI ใหม่ แข่งขันระดับโลก",
        slug: "thai-company-develops-ai-global-competition",
        excerpt: "สตาร์ทอัพไทยเปิดตัวระบบปัญญาประดิษฐ์ที่สามารถวิเคราะห์ข้อมูลได้รวดเร็วกว่าเดิม 10 เท่า",
        content: "สตาร์ทอัพไทยชื่อดังเปิดตัวระบบปัญญาประดิษฐ์รุ่นใหม่ที่สามารถวิเคราะห์ข้อมูลขนาดใหญ่ได้รวดเร็วกว่าเดิม 10 เท่า โดยใช้เทคโนโลยี Machine Learning ที่พัฒนาขึ้นเอง ซึ่งได้รับการลงทุนจากกองทุนต่างชาติมูลค่า 500 ล้านบาท คาดว่าจะเป็นตัวเปลี่ยนเกมในอุตสาหกรรมเทคโนโลยีของภูมิภาค",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 4,
        author: "นักข่าวเทคโนโลยี",
        readTime: 3,
        isBreaking: false,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        views: 8930,
      },
      {
        title: "ทีมชาติไทยเตรียมลุยฟุตบอลโลก 2026",
        slug: "thailand-national-team-world-cup-2026",
        excerpt: "สมาคมฟุตบอลฯ เผยแผนพัฒนาทีมชาติสู่รอบสุดท้ายฟุตบอลโลก พร้อมเปิดตัวโค้ชใหม่",
        content: "สมาคมฟุตบอลแห่งประเทศไทยเปิดเผยแผนการพัฒนาทีมชาติไทยเพื่อเข้าสู่รอบสุดท้ายของฟุตบอลโลก 2026 โดยได้แต่งตั้งโค้ชชาวต่างชาติที่มีประสบการณ์สูงมาเป็นหัวหน้าผู้ฝึกสอน พร้อมทั้งเตรียมจัดตั้งสถาบันฟุตบอลเพื่อพัฒนานักเตะรุ่นเยาว์อย่างเป็นระบบ",
        imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 3,
        author: "นักข่าวกีฬา",
        readTime: 4,
        isBreaking: false,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        views: 12850,
      },
      {
        title: "หนังไทยคว้ารางวัลเทศกาลหนังนานาชาติ",
        slug: "thai-movie-wins-international-film-festival",
        excerpt: "ผลงานของผู้กำกับไทยได้รับการยกย่องในเวทีโลก สร้างชื่อเสียงให้อุตสาหกรรมศิลปะไทย",
        content: "ภาพยนตร์ไทยเรื่องล่าสุดของผู้กำกับชื่อดังได้รับรางวัลใหญ่จากเทศกาลหนังนานาชาติที่มีชื่อเสียง โดยได้รับการยกย่องจากคณะกรรมการว่าเป็นผลงานที่สะท้อนวัฒนธรรมไทยได้อย่างลึกซึ้ง ซึ่งเป็นการยืนยันศักยภาพของอุตสาหกรรมภาพยนตร์ไทยในเวทีโลก",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 5,
        author: "นักข่าวบันเทิง",
        readTime: 3,
        isBreaking: false,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        views: 9630,
      },
      {
        title: "ตลาดหุ้นไทยฟื้นตัวแรง ทุบสถิติใหม่",
        slug: "thai-stock-market-recovery-new-record",
        excerpt: "ดัชนี SET ปิดที่ระดับสูงสุดในรอบ 3 เดือน หลังนักลงทุนต่างชาติกลับมาซื้อ",
        content: "ตลาดหุ้นไทยปิดการซื้อขายวันนี้ด้วยดัชนี SET ที่ระดับ 1,685.24 จุด เพิ่มขึ้น 18.52 จุด หรือ 1.11% ซึ่งเป็นระดับสูงสุดในรอบ 3 เดือน โดยมีปัจจัยหนุนจากการกลับมาซื้อของนักลงทุนต่างชาติ และความเชื่อมั่นต่อนโยบายเศรษฐกิจของรัฐบาลใหม่",
        imageUrl: "https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 2,
        author: "นักข่าวเศรษฐกิจ",
        readTime: 4,
        isBreaking: false,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        views: 11420,
      },
      {
        title: "นักวิทยาศาสตร์ไทยค้นพบสารใหม่ต้านมะเร็ง",
        slug: "thai-scientists-discover-anti-cancer-compound",
        excerpt: "ทีมนักวิจัยจากมหาวิทยาลัยชั้นนำค้นพบสารสกัดจากพืชไทยที่มีประสิทธิภาพต้านเซลล์มะเร็ง",
        content: "ทีมนักวิจัยจากมหาวิทยาลัยชั้นนำของประเทศได้ค้นพบสารสกัดจากพืชสมุนไพรไทยที่มีประสิทธิภาพในการต้านเซลล์มะเร็ง โดยการทดลองในห้องปฏิบัติการพบว่าสามารถยับยั้งการเจริญเติบโตของเซลล์มะเร็งได้ถึง 85% ซึ่งเป็นความหวังใหม่สำหรับการพัฒนายาต้านมะเร็งในอนาคต",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        categoryId: 6,
        author: "นักข่าวสุขภาพ",
        readTime: 5,
        isBreaking: true,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        views: 7890,
      }
    ];

    articlesData.forEach(art => {
      const article: Article = { 
        id: this.articleIdCounter++, 
        ...art,
        publishedAt: art.publishedAt || new Date()
      };
      this.articles.set(article.id, article);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = { id: this.categoryIdCounter++, ...category };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  async getArticles(params?: { categoryId?: number; limit?: number; offset?: number; search?: string }): Promise<Article[]> {
    let articles = Array.from(this.articles.values());
    
    if (params?.categoryId) {
      articles = articles.filter(article => article.categoryId === params.categoryId);
    }
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by publishedAt desc
    articles.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
    
    if (params?.offset) {
      articles = articles.slice(params.offset);
    }
    
    if (params?.limit) {
      articles = articles.slice(0, params.limit);
    }
    
    return articles;
  }

  async getFeaturedArticle(): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.isFeatured);
  }

  async getBreakingNews(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.isBreaking)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getTrendingArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const newArticle: Article = { 
      id: this.articleIdCounter++, 
      ...article,
      categoryId: article.categoryId || null,
      imageUrl: article.imageUrl || null,
      isBreaking: article.isBreaking || false,
      isFeatured: article.isFeatured || false,
      publishedAt: new Date(),
      views: 0
    };
    this.articles.set(newArticle.id, newArticle);
    return newArticle;
  }

  async incrementViews(id: number): Promise<void> {
    const article = this.articles.get(id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.articles.set(id, article);
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = { 
      id: this.contactIdCounter++, 
      ...contact,
      createdAt: new Date()
    };
    this.contacts.set(newContact.id, newContact);
    return newContact;
  }

  async updateArticle(id: number, updates: Partial<InsertArticle>): Promise<Article> {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) {
      throw new Error("Article not found");
    }
    
    const updatedArticle: Article = {
      ...existingArticle,
      ...updates,
      categoryId: updates.categoryId !== undefined ? updates.categoryId : existingArticle.categoryId,
      imageUrl: updates.imageUrl !== undefined ? updates.imageUrl : existingArticle.imageUrl,
      isBreaking: updates.isBreaking !== undefined ? updates.isBreaking : existingArticle.isBreaking,
      isFeatured: updates.isFeatured !== undefined ? updates.isFeatured : existingArticle.isFeatured,
    };
    
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<void> {
    if (!this.articles.has(id)) {
      throw new Error("Article not found");
    }
    this.articles.delete(id);
  }

  // Banner methods
  async getBanners(params?: { position?: string; active?: boolean }): Promise<Banner[]> {
    let banners = Array.from(this.banners.values());
    
    if (params?.position) {
      banners = banners.filter(banner => banner.position === params.position);
    }
    
    if (params?.active !== undefined) {
      banners = banners.filter(banner => banner.isActive === params.active);
    }
    
    // Filter by date range if specified
    const now = new Date();
    banners = banners.filter(banner => {
      const isStartValid = !banner.startDate || banner.startDate <= now;
      const isEndValid = !banner.endDate || banner.endDate >= now;
      return isStartValid && isEndValid;
    });
    
    return banners.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    return this.banners.get(id);
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const newBanner: Banner = {
      id: this.bannerIdCounter++,
      ...banner,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      sortOrder: banner.sortOrder !== undefined ? banner.sortOrder : 0,
    };
    this.banners.set(newBanner.id, newBanner);
    return newBanner;
  }

  async updateBanner(id: number, updates: Partial<InsertBanner>): Promise<Banner> {
    const existingBanner = this.banners.get(id);
    if (!existingBanner) {
      throw new Error("Banner not found");
    }
    
    const updatedBanner: Banner = {
      ...existingBanner,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.banners.set(id, updatedBanner);
    return updatedBanner;
  }

  async deleteBanner(id: number): Promise<void> {
    if (!this.banners.has(id)) {
      throw new Error("Banner not found");
    }
    this.banners.delete(id);
  }
}

export const storage = new MemStorage();
