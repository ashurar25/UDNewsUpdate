
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { insertArticleSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { formatDate } from "@/lib/constants";
import { Plus, Edit, Trash2, Eye, Calendar, User, Hash, LogOut, Shield } from "lucide-react";
import type { Article, Category } from "@shared/schema";

const articleFormSchema = insertArticleSchema.extend({
  title: z.string().min(5, "หัวข้อต้องมีอย่างน้อย 5 ตัวอักษร"),
  slug: z.string().min(3, "URL slug ต้องมีอย่างน้อย 3 ตัวอักษร"),
  excerpt: z.string().min(20, "สรุปข่าวต้องมีอย่างน้อย 20 ตัวอักษร"),
  content: z.string().min(50, "เนื้อหาต้องมีอย่างน้อย 50 ตัวอักษร"),
  author: z.string().min(2, "ชื่อผู้เขียนต้องมีอย่างน้อย 2 ตัวอักษร"),
  readTime: z.number().min(1, "เวลาอ่านต้องมากกว่า 0 นาที"),
});

type ArticleFormData = z.infer<typeof articleFormSchema>;

export default function Admin() {
  const { toast } = useToast();
  const { isAuthenticated, logout, user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, setLocation]);

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    enabled: isAuthenticated,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    enabled: isAuthenticated,
  });

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      categoryId: 1,
      author: "บรรณาธิการ UDNewsUpdate",
      readTime: 3,
      isBreaking: false,
      isFeatured: false,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ArticleFormData) => apiRequest("POST", "/api/articles", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "สร้างข่าวสำเร็จ",
        description: "ข่าวใหม่ถูกเพิ่มลงในระบบแล้ว",
      });
    },
    onError: (error: any) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถสร้างข่าวได้",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ArticleFormData> }) => 
      apiRequest("PUT", `/api/articles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setIsDialogOpen(false);
      setEditingArticle(null);
      form.reset();
      toast({
        title: "แก้ไขข่าวสำเร็จ",
        description: "ข้อมูลข่าวถูกอัพเดทแล้ว",
      });
    },
    onError: (error: any) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถแก้ไขข่าวได้",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "ลบข่าวสำเร็จ",
        description: "ข่าวถูกลบออกจากระบบแล้ว",
      });
    },
    onError: (error: any) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถลบข่าวได้",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    form.reset({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      imageUrl: article.imageUrl || "",
      categoryId: article.categoryId || 1,
      author: article.author,
      readTime: article.readTime,
      isBreaking: article.isBreaking || false,
      isFeatured: article.isFeatured || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบข่าวนี้?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้บริการ",
    });
    setLocation("/");
  };

  const onSubmit = (data: ArticleFormData) => {
    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    form.setValue("slug", slug);
  };

  const getCategoryById = (id: number) => {
    return categories.find(cat => cat.id === id);
  };

  // Show loading if not authenticated yet
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์การเข้าถึง...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">จัดการข่าวสาร</h1>
            <p className="text-gray-600 mt-2">เพิ่ม แก้ไข และจัดการข่าวสารของเว็บไซต์</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-ud-orange" />
              <span className="text-sm text-gray-600">
                ยินดีต้อนรับ, <span className="font-medium">{user?.username}</span>
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-ud-orange hover:bg-ud-orange-dark text-white"
                  onClick={() => {
                    setEditingArticle(null);
                    form.reset();
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มข่าวใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingArticle ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
                  </DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>หัวข้อข่าว *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="กรอกหัวข้อข่าว" 
                                {...field}
                                onBlur={(e) => {
                                  field.onBlur();
                                  if (e.target.value && !editingArticle) {
                                    generateSlug(e.target.value);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL Slug *</FormLabel>
                            <FormControl>
                              <Input placeholder="url-slug" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>หมวดหมู่ *</FormLabel>
                            <Select 
                              value={field.value?.toString() || ""} 
                              onValueChange={(value) => field.onChange(parseInt(value))}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกหมวดหมู่" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ผู้เขียน *</FormLabel>
                            <FormControl>
                              <Input placeholder="ชื่อผู้เขียน" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="readTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>เวลาอ่าน (นาที) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1"
                                placeholder="3" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>URL รูปภาพ</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>สรุปข่าว *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="เขียนสรุปข่าวสั้นๆ..." 
                              className="min-h-20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>เนื้อหาข่าว *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="เขียนเนื้อหาข่าวฉบับเต็ม..." 
                              className="min-h-40"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-6">
                      <FormField
                        control={form.control}
                        name="isBreaking"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value || false}
                                onChange={field.onChange}
                                className="rounded border-gray-300"
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer">ข่าวด่วน</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value || false}
                                onChange={field.onChange}
                                className="rounded border-gray-300"
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer">ข่าวเด่น</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        ยกเลิก
                      </Button>
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="bg-ud-orange hover:bg-ud-orange-dark text-white"
                      >
                        {createMutation.isPending || updateMutation.isPending 
                          ? "กำลังบันทึก..." 
                          : editingArticle ? "อัพเดท" : "สร้างข่าว"
                        }
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Articles List */}
        <Card>
          <CardHeader>
            <CardTitle>รายการข่าวทั้งหมด ({articles.length} ข่าว)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {article.title}
                          </h3>
                          <div className="flex space-x-2">
                            {article.isBreaking && (
                              <Badge className="bg-red-100 text-red-800">ข่าวด่วน</Badge>
                            )}
                            {article.isFeatured && (
                              <Badge className="bg-blue-100 text-blue-800">ข่าวเด่น</Badge>
                            )}
                            <Badge variant="outline">
                              {getCategoryById(article.categoryId!)?.name}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(article.publishedAt!)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views || 0} ผู้อ่าน</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Hash className="h-4 w-4" />
                            <span>ID: {article.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          แก้ไข
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          ลบ
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีข่าวสาร</h3>
                <p className="text-gray-600">เริ่มต้นด้วยการเพิ่มข่าวใหม่</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
