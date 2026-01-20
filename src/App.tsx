import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { UserAuthProvider } from "@/contexts/UserAuthContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import DiscoverPage from "./pages/DiscoverPage";
import CityDetailPage from "./pages/CityDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import FestivalsPage from "./pages/FestivalsPage";
import MoteurPage from "./pages/MoteurPage";
import PaymentPage from "./pages/PaymentPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminDestinationsPage from "./pages/admin/AdminDestinationsPage";
import AdminExperiencesPage from "./pages/admin/AdminExperiencesPage";
import AdminFestivalsPage from "./pages/admin/AdminFestivalsPage";
import AdminEnginePage from "./pages/admin/AdminEnginePage";
import AdminReservationsPage from "./pages/admin/AdminReservationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminAuthProvider>
        <UserAuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="destinations" element={<AdminDestinationsPage />} />
                <Route path="experiences" element={<AdminExperiencesPage />} />
                <Route path="festivals" element={<AdminFestivalsPage />} />
                <Route path="engine" element={<AdminEnginePage />} />
                <Route path="reservations" element={<AdminReservationsPage />} />
              </Route>

              {/* Auth Routes - No Navbar/Footer */}
              <Route path="/connexion" element={<LoginPage />} />
              <Route path="/inscription" element={<RegisterPage />} />

              {/* Profile & Notifications - Have their own layout */}
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* Public Routes */}
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/decouvrir" element={<DiscoverPage />} />
                      <Route path="/decouvrir/:cityId" element={<CityDetailPage />} />
                      <Route path="/destinations" element={<DestinationsPage />} />
                      <Route path="/experiences" element={<ExperiencesPage />} />
                      <Route path="/festivals" element={<FestivalsPage />} />
                      <Route path="/moteur" element={<MoteurPage />} />
                      <Route path="/paiement" element={<PaymentPage />} />
                      <Route path="/a-propos" element={<AboutPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </UserAuthProvider>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
