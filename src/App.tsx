import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import DiscoverPage from "./pages/DiscoverPage";
import DestinationsPage from "./pages/DestinationsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import FestivalsPage from "./pages/FestivalsPage";
import MoteurPage from "./pages/MoteurPage";
import PaymentPage from "./pages/PaymentPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/decouvrir" element={<DiscoverPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/moteur" element={<MoteurPage />} />
          <Route path="/paiement" element={<PaymentPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
