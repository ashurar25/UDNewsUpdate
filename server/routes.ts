import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertArticleSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const { categoryId, limit, offset, search } = req.query;
      const params = {
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
        search: search as string,
      };
      const articles = await storage.getArticles(params);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/featured", async (req, res) => {
    try {
      const article = await storage.getFeaturedArticle();
      if (!article) {
        return res.status(404).json({ message: "Featured article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured article" });
    }
  });

  app.get("/api/articles/breaking", async (req, res) => {
    try {
      const articles = await storage.getBreakingNews();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch breaking news" });
    }
  });

  app.get("/api/articles/trending", async (req, res) => {
    try {
      const articles = await storage.getTrendingArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending articles" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Increment views
      await storage.incrementViews(article.id);
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.get("/api/categories/:categoryId/articles", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const articles = await storage.getArticlesByCategory(categoryId);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });

  // Create Article
  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json({ message: "สร้างข่าวสำเร็จ", article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "ข้อมูลไม่ถูกต้อง", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  // Update Article
  app.put("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(id, validatedData);
      res.json({ message: "แก้ไขข่าวสำเร็จ", article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "ข้อมูลไม่ถูกต้อง", 
          errors: error.errors 
        });
      }
      if (error instanceof Error && error.message === "Article not found") {
        return res.status(404).json({ message: "ไม่พบข่าวที่ต้องการแก้ไข" });
      }
      res.status(500).json({ message: "Failed to update article" });
    }
  });

  // Delete Article
  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteArticle(id);
      res.json({ message: "ลบข่าวสำเร็จ" });
    } catch (error) {
      if (error instanceof Error && error.message === "Article not found") {
        return res.status(404).json({ message: "ไม่พบข่าวที่ต้องการลบ" });
      }
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  // Contact
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ message: "ส่งข้อความสำเร็จ ขอบคุณที่ติดต่อเรา", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "ข้อมูลไม่ถูกต้อง", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
