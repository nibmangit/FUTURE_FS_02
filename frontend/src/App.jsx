import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react"; 
import { useCartContext } from "./hooks/useCartContext";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailModal from "./pages/ProductDetailModal";
import CartPage from "./pages/CartPage";
import CheckoutForm from "./pages/CheckoutForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import AuthForm from "./pages/AuthForm";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from "./pages/NotFound";
import { useProducts } from "./hooks/useProducts"; 
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCartItem } = useCartContext();
  const { user, logout } = useAuth();
  const { isProductLoading} = useProducts()
   
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [confirmationId, setConfirmationId] = useState(null);
  
  const isLoggedIn = !!user;

  const handleAddToCart = (product, quantity = 1) => {
    
    if (!isLoggedIn) {
      navigate("/authform");
      return;
    }
    if (isProductLoading) return;

    updateCartItem(product.id, quantity);
    navigate("/cart"); // better UX than going back to products
  };

  const isProductDetail = location.pathname.startsWith('/product/');
  const isAuthOrCheckout = ['/checkout', '/authform'].includes(location.pathname);
  const knownRoutes = ['/','/products', '/cart', '/checkout', '/confirmation', '/authform', '/orderhistory'];
  const isNotFound = !knownRoutes.includes(location.pathname) && !location.pathname.startsWith('/product/');
  const shouldHideNavbar = isAuthOrCheckout || isProductDetail;
  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <style>{`
        /* Global Styles (Inter font and smooth scrolling) */
        html { scroll-behavior: smooth; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
      {!shouldHideNavbar &&  <Navbar isLoggedIn={isLoggedIn} handleLogout={logout} userEmail={user?.email} /> }
    <main className="grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductListPage filter={categoryFilter} setFilter={setCategoryFilter} />} />
          <Route path="product/:id" element={<ProductDetailModal onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage isLoggedIn={isLoggedIn} />} />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutForm userEmail={user?.email} setConfirmationId={setConfirmationId} />
            </ProtectedRoute>
          } />
          
          <Route path="/confirmation" element={
            <ProtectedRoute>
              <ConfirmationPage confirmationId={confirmationId} />
            </ProtectedRoute>
          } />
          
          <Route path="/authform" element={<AuthForm />} />
          <Route path="/orderhistory" element={
            <ProtectedRoute>
              <OrderHistoryPage userEmail={user?.email} />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAuthOrCheckout && !isNotFound && <Footer />}
    </div>
  );
}

export default App;