import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";

import Home from "@/pages/home";
import News from "@/pages/news";
import Articles from "@/pages/articles";
import Contact from "@/pages/contact";
import NewsDetail from "@/pages/news-detail";
import Category from "@/pages/category";
import About from "@/pages/about";
import Search from "@/pages/search";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/articles" component={Articles} />
        <Route path="/contact" component={Contact} />
        <Route path="/news/:slug" component={NewsDetail} />
        <Route path="/category/:slug" component={Category} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
