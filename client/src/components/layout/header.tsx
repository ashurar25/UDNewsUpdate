import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import logoPath from "@assets/S__98484259_1752496041968.jpg";

export function Header() {
  const [location, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "หน้าหลัก", href: "/" },
    { name: "ข่าวสาร", href: "/news" },
    { name: "บทความ", href: "/articles" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ติดต่อเรา", href: "/contact" },
    { name: "จัดการข่าว", href: "/admin" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Orange Bar */}
      <div className="bg-ud-orange h-2"></div>

      <header className="bg-gradient-to-r from-ud-orange to-ud-orange-light shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div 
              className="w-16 h-16 bg-cover bg-center rounded-lg shadow-md"
              style={{ backgroundImage: `url(${logoPath})` }}
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">UDNewsUpdate</h1>
              <p className="text-ud-yellow text-sm font-medium">อัพเดทข่าวอุดร</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white hover:text-ud-yellow font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-all duration-300 ${
                  location === item.href ? "bg-white/20 text-ud-yellow" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <Input
              type="text"
              placeholder="ค้นหาข่าว..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button
              type="submit"
              size="icon"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4 flex space-x-2">
          <Input
            type="text"
            placeholder="ค้นหาข่าว..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
          <Button
            type="submit"
            size="icon"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-ud-orange to-ud-orange-dark transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white font-bold text-xl">เมนู</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-white hover:text-ud-yellow font-medium py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 ${
                  location === item.href ? "bg-white/20 text-ud-yellow" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      </header>
    </>
  );
}