import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "กรุณากรอกชื่อ อย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  subject: z.string().min(5, "กรุณากรอกหัวข้อ อย่างน้อย 5 ตัวอักษร"),
  message: z.string().min(10, "กรุณากรอกข้อความ อย่างน้อย 10 ตัวอักษร"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "ส่งข้อความสำเร็จ",
        description: "ขอบคุณที่ติดต่อเรา เราจะติดต่อกลับโดยเร็วที่สุด",
      });
    },
    onError: (error: any) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ติดต่อเรา</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            มีคำถาม ข้อเสนอแนะ หรือต้องการส่งข่าวสาร? เราพร้อมรับฟังและตอบกลับคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">ข้อมูลการติดต่อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-ud-orange rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">อีเมล</p>
                    <p className="text-gray-600">kenginol.ar@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-ud-orange rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">โทรศัพท์</p>
                    <p className="text-gray-600">092-4434311</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-ud-orange rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">ที่อยู่</p>
                    <p className="text-gray-600">237 หมู่ 1 บ้านเพีย ตำบลเมืองเพีย<br />อำเภอกุดจับ จังหวัดอุดรธานี 41250</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-ud-orange rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">เวลาทำการ</p>
                    <p className="text-gray-600">จันทร์ - ศุกร์ 9:00 - 18:00<br />เสาร์ - อาทิตย์ 10:00 - 16:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">ช่องทางอื่นๆ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href="https://www.facebook.com/udontripadvisor?locale=th_TH" 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">f</div>
                  <span className="font-medium text-gray-700">Facebook Messenger</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">📱</div>
                  <span className="font-medium text-gray-700">LINE Official</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">T</div>
                  <span className="font-medium text-gray-700">Twitter DM</span>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">ส่งข้อความถึงเรา</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">ส่งข้อความสำเร็จ!</h3>
                    <p className="text-gray-600 mb-6">
                      ขอบคุณที่ติดต่อเรา เราจะตอบกลับภายใน 24 ชั่วโมง
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      ส่งข้อความใหม่
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ชื่อ-นามสกุล *</FormLabel>
                              <FormControl>
                                <Input placeholder="กรอกชื่อของคุณ" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>อีเมล *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="กรอกอีเมลของคุณ" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>หัวข้อ *</FormLabel>
                            <FormControl>
                              <Input placeholder="กรอกหัวข้อของข้อความ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ข้อความ *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="กรอกข้อความของคุณ..."
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-ud-orange hover:bg-ud-orange-dark text-white"
                      >
                        {mutation.isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
