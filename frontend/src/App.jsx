import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import ProductListPage from "./pages/ProductListPage"
import ProductDetailModal from "./pages/ProductDetailModal";
import CartPage from "./pages/CartPage";

 

function App() { 

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <header className="sticky top-0 z-10 w-full bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 shadow-xl">
       <Navbar />
      </header>

      <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/:id" element={<ProductDetailModal />} />
      <Route path="/cart" element={<CartPage />} />
      </Routes>

      <footer className="w-full py-8 text-center text-gray-600 border-t border-gray-800 mt-10">
        <p className="text-sm">MiniTech E-Commerce Demo | Designed with Tailwind & React</p>
      </footer>
    </div>
  )
}

export default App
