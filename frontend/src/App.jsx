import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailModal from "./pages/ProductDetailModal";
import CartPage from "./pages/CartPage";
import CheckoutForm from "./pages/CheckoutForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import { useState } from "react";
import { MOCK_PRODUCTS } from "./data/products";
import {useCartContext} from './hooks/useCartContext'; 

function App() {
  const navigate = useNavigate(); 
  const {updateCartItem} = useCartContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleAddToCart = (product, quantity = 1) => {
    const fullProductDetails = MOCK_PRODUCTS.find(p => p.id === product.id) || product;

    const productDataForStorage = {
        name: fullProductDetails.name,
        price: fullProductDetails.price,
        imageUrl: fullProductDetails.imageUrl,
        category: fullProductDetails.category
    };

    updateCartItem(product.id, productDataForStorage, quantity);
    setSelectedProduct(null);
    navigate('/');
  };

  const onClose = () => {
    setSelectedProduct(null);
    navigate(`/`);
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <style>{`
        /* Global Styles (Inter font and smooth scrolling) */
        html { scroll-behavior: smooth; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
      <header className="sticky top-0 z-10 w-full bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 shadow-xl">
        <Navbar />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <ProductListPage
              setSelectedProduct={setSelectedProduct}
              products={MOCK_PRODUCTS}
              filter={categoryFilter}
              setFilter={setCategoryFilter}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <ProductDetailModal product={selectedProduct} onClose={onClose} onAddToCart={handleAddToCart} />
          }
        />
        <Route 
        path="/cart" 
        element={
        <CartPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>

      <footer className="w-full py-8 text-center text-gray-600 border-t border-gray-800 mt-10">
        <p className="text-sm">
          MiniTech E-Commerce Demo | Designed with Tailwind & React
        </p>
      </footer>
    </div>
  );
}

export default App;
