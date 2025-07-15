import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import Home from "@/pages/home";
import News from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import Articles from "@/pages/articles";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Category from "@/pages/category";
import Search from "@/pages/search";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/news" component={News} />
          <Route path="/news/:slug" component={NewsDetail} />
          <Route path="/articles" component={Articles} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/search" component={Search} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);