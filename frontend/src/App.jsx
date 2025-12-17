import Navbar from "./components/Navbar"
import ProductListPage from "./pages/ProductListPage"

 

function App() { 

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <Navbar />
      <ProductListPage />

      <footer className="w-full py-8 text-center text-gray-600 border-t border-gray-800 mt-10">
        <p className="text-sm">MiniTech E-Commerce Demo | Designed with Tailwind & React</p>
      </footer>
    </div>
  )
}

export default App
