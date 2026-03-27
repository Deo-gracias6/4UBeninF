import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UserAuthProvider } from "@/contexts/UserAuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';
import Index from "./pages/Index";
import DiscoverPage from "./pages/DiscoverPage";
import CityDetailPage from "./pages/CityDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
import FestivalsPage from "./pages/FestivalsPage";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import MoteurPage from "./pages/MoteurPage";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminDestinationsPage from "./pages/admin/AdminDestinationsPage";
import AdminExperiencesPage from "./pages/admin/AdminExperiencesPage";
import AdminFestivalsPage from "./pages/admin/AdminFestivalsPage";
import AdminTripsPage from "./pages/admin/AdminTripsPage";
import AdminEnginePage from "./pages/admin/AdminEnginePage";
import AdminReservationsPage from "./pages/admin/AdminReservationsPage";
import OrganizedTripsPage from "./pages/OrganizedTripsPage";
import OrganizedTripDetailPage from "./pages/OrganizedTripDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserAuthProvider>
          <NotificationsProvider>
            <CartProvider>
              <WishlistProvider>
                <BrowserRouter>
                  <Routes>
                    

                    {/* Admin Routes (protégées) */}
                    <Route path="/admin" element={<AdminProtectedRoute />}>
                      <Route element={<AdminLayout />}>
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="users" element={<AdminUsersPage />} />
                        <Route path="destinations" element={<AdminDestinationsPage />} />
                        <Route path="experiences" element={<AdminExperiencesPage />} />
                        <Route path="festivals" element={<AdminFestivalsPage />} />
                        <Route path="trips" element={<AdminTripsPage />} />
                        <Route path="engine" element={<AdminEnginePage />} />
                        <Route path="reservations" element={<AdminReservationsPage />} />
                      </Route>
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
                            <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
                            <Route path="/experiences" element={<ExperiencesPage />} />
                            <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />
                            <Route path="/festivals" element={<FestivalsPage />} />
                            <Route path="/festivals/:slug" element={<FestivalDetailPage />} />
                            <Route path="/moteur" element={<MoteurPage />} />
                            <Route path="/sorties" element={<OrganizedTripsPage />} />
                            <Route path="/sorties/:id" element={<OrganizedTripDetailPage />} />
                            <Route path="/paiement/:id" element={<PaymentPage />} />
                            <Route path="/panier" element={<CartPage />} />
                            <Route path="/wishlist" element={<WishlistPage />} />
                            <Route path="/a-propos" element={<AboutPage />} />
                            <Route path="/mes-reservations" element={<MyBookingsPage />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                          <Footer />
                        </>
                      }
                    />
                  </Routes>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </NotificationsProvider>
        </UserAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
