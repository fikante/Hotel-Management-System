import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import ServicesPage from './pages/ServicesPage';
import ServiceHistory from './components/Service/ServiceHistory';
import RoomsPage from "./pages/RoomsPage";
import BookingPage from "./pages/BookingPage";
import BookingDetails from "./components/Rooms/BookingDetails";
import { BookingProvider } from "./data/BookingContext";

import Menu from './pages/restaurant/Menu';
import OrderHistory from './pages/restaurant/OrderHistory';
import OrderForm from './pages/restaurant/OrderForm';
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BookingProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/restaurant/menu" element={<Menu />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/history" element={<ServiceHistory />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BookingProvider>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;