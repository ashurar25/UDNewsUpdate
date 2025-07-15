import { Link } from "wouter";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import logoPath from "@assets/S__98484259_1752496041968.jpg";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-12 h-12 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${logoPath})` }}
              />
              <div>
                <h3 className="text-xl font-bold">UDNewsUpdate</h3>
                <p className="text-ud-yellow text-sm">อัพเดทข่าวฮอต</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              เว็บไซต์ข่าวที่นำเสนอข่าวสารใหม่ล่าสุดจากทั่วโลก ด้วยความรวดเร็ว แม่นยำ และเชื่อถือได้ 24 ชั่วโมง
            </p>
            <p className="text-gray-400 text-sm">made by ashura</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-ud-yellow">ลิงก์ด่วน</h4>
            <nav className="space-y-2">
              {FOOTER_LINKS.about.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-ud-yellow transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/search"
                className="block text-gray-300 hover:text-ud-yellow transition-colors duration-300"
              >
                ค้นหา
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-ud-yellow">ติดต่อเรา</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>info@udnewsupdate.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>02-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>กรุงเทพฯ, ประเทศไทย</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-md font-semibold mb-3 text-ud-yellow">ติดตามเรา</h5>
              <div className="flex space-x-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-gray-700 hover:bg-ud-orange rounded-full flex items-center justify-center transition-colors duration-300"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 UDNewsUpdate. สงวนลิขสิทธิ์ทุกประการ | 
            <Link href="/privacy" className="hover:text-ud-yellow transition-colors duration-300 ml-1 mr-1">
              นโยบายความเป็นส่วนตัว
            </Link> | 
            <Link href="/terms" className="hover:text-ud-yellow transition-colors duration-300 ml-1">
              ข้อกำหนดการใช้งาน
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
