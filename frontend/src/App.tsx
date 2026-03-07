import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/admin/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import SiteImagesPage from "./pages/admin/SiteImagesPage";
import CampusCardsPage from "./pages/admin/CampusCardsPage";
import DonorsPage from "./pages/admin/DonorsPage";
import ContactInfoPage from "./pages/admin/ContactInfoPage";
import ActivitiesPage from "./pages/admin/ActivitiesPage";
import ActivityFormPage from "./pages/admin/ActivityFormPage";
import AdminProtectedRoute from "./components/shared/AdminProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route index element={<Navigate to="/admin/campus" replace />} />
            <Route path="site-images" element={<SiteImagesPage />} />
            <Route path="campus" element={<CampusCardsPage />} />
            <Route path="donors" element={<DonorsPage />} />
            <Route path="contact" element={<ContactInfoPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/new" element={<ActivityFormPage />} />
            <Route path="activities/edit/:id" element={<ActivityFormPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
