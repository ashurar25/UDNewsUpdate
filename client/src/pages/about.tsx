import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Users, Target, Heart, Award } from "lucide-react";
import logoPath from "@assets/S__98484259_1752496041968.jpg";

export default function About() {
  const teamMembers = [
    {
      name: "อาชูระ ผู้สร้าง",
      role: "ผู้ก่อตั้งและนักพัฒนา",
      description: "ผู้พัฒนาเว็บไซต์ UDNewsUpdate ด้วยความมุ่งมั่นในการนำเสนอข่าวสารที่ถูกต้องและรวดเร็ว",
      expertise: ["Web Development", "News Curation", "Digital Innovation"],
    },
    {
      name: "ทีมบรรณาธิการ",
      role: "บรรณาธิการข่าว",
      description: "ทีมงานที่มีประสบการณ์ในการรวบรวมและตรวจสอบข่าวสารจากแหล่งที่เชื่อถือได้",
      expertise: ["News Writing", "Fact Checking", "Content Strategy"],
    },
    {
      name: "ทีมเทคนิค",
      role: "ทีมพัฒนาระบบ",
      description: "ดูแลระบบเว็บไซต์ให้ทำงานได้อย่างเสถียรและรวดเร็วตลอด 24 ชั่วโมง",
      expertise: ["System Administration", "Database Management", "Security"],
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "เปิดตัว UDNewsUpdate",
      description: "เริ่มต้นการให้บริการข่าวสารออนไลน์ด้วยเทคโนโลยีล่าสุด",
    },
    {
      year: "2024",
      title: "ขยายหมวดข่าว",
      description: "เพิ่มหมวดหมู่ข่าวครอบคลุมทุกด้านของชีวิต",
    },
    {
      year: "2024",
      title: "มุ่งสู่อนาคต",
      description: "พัฒนาฟีเจอร์ใหม่และขยายการให้บริการอย่างต่อเนื่อง",
    },
  ];

  const stats = [
    { number: "24/7", label: "ให้บริการตลอดเวลา" },
    { number: "100+", label: "ข่าวสารต่อวัน" },
    { number: "7", label: "หมวดหมู่ข่าว" },
    { number: "1000+", label: "ผู้อ่านต่อวัน" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ud-orange to-ud-orange-light text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 bg-cover bg-center rounded-xl shadow-lg"
              style={{ backgroundImage: `url(${logoPath})` }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">เกี่ยวกับ UDNewsUpdate</h1>
          <p className="text-xl md:text-2xl text-ud-yellow mb-6">อัพเดทข่าวฮอต</p>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            เราคือเว็บไซต์ข่าวที่มุ่งมั่นในการนำเสนอข่าวสารที่ถูกต้อง รวดเร็ว และน่าเชื่อถือ 
            ด้วยทีมงานที่มีประสบการณ์และเทคโนโลยีที่ทันสมัย เพื่อให้คุณได้รับข้อมูลข่าวสารที่มีคุณภาพตลอด 24 ชั่วโมง
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-ud-orange mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-l-4 border-ud-orange">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Target className="h-6 w-6 text-ud-orange" />
                  <span>พันธกิจ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  นำเสนอข่าวสารที่ถูกต้อง ครบถ้วน และทันเหตุการณ์ให้กับประชาชนไทย 
                  ด้วยการใช้เทคโนโลยีดิจิทัลที่ทันสมัย เพื่อสร้างสังคมที่มีข้อมูลข่าวสารที่ถูกต้อง
                  และส่งเสริมการมีส่วนร่วมของประชาชนในการรับรู้ข่าวสารที่มีคุณภาพ
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-ud-yellow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Heart className="h-6 w-6 text-ud-orange" />
                  <span>วิสัยทัศน์</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  เป็นเว็บไซต์ข่าวอันดับหนึ่งของประเทศไทยที่ผู้คนไว้วางใจในความถูกต้องและรวดเร็ว
                  ของข่าวสาร โดยยึดหลักความเป็นกลาง ความซื่อสัตย์ และความรับผิดชอบต่อสังคม
                  เพื่อเป็นส่วนหนึ่งในการพัฒนาประเทศชาติให้เจริญก้าวหน้า
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">ค่านิยมองค์กร</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-ud-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ความถูกต้อง</h3>
                <p className="text-gray-600">
                  ตรวจสอบข้อมูลอย่างละเอียดก่อนนำเสนอ เพื่อให้ผู้อ่านได้รับข้อมูลที่ถูกต้องและน่าเชื่อถือ
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-ud-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ความรวดเร็ว</h3>
                <p className="text-gray-600">
                  อัพเดทข่าวสารให้ทันเหตุการณ์ ด้วยระบบที่ทันสมัยและทีมงานที่พร้อมตลอด 24 ชั่วโมง
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-ud-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ความรับผิดชอบ</h3>
                <p className="text-gray-600">
                  ยึดหลักจริยธรรมสื่อมวลชนและความรับผิดชอบต่อสังคม ในการนำเสนอข่าวสารที่เป็นประโยชน์
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">เส้นทางความสำเร็จ</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-ud-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                </div>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">ทีมงาน UDNewsUpdate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-ud-orange to-ud-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-ud-orange font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-ud-orange to-ud-orange-light text-white">
            <CardContent className="p-8">
              <Award className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">พร้อมให้บริการคุณ</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                หากคุณมีข้อสงสัย ข้อเสนอแนะ หรือต้องการติดต่อทีมงาน เรายินดีรับฟังและตอบกลับอย่างรวดเร็ว
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>info@udnewsupdate.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>02-123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>กรุงเทพฯ, ประเทศไทย</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-white text-ud-orange hover:bg-gray-100">
                <Link href="/contact">ติดต่อเรา</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Made by ashura */}
        <section className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 font-medium">
            <span className="text-ud-orange">made by ashura</span> - ด้วยความมุ่งมั่นในการสร้างสรรค์สื่อข่าวที่มีคุณภาพ
          </p>
        </section>

      </main>
    </div>
  );
}
