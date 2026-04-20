import { useState, useEffect } from "react";
import productService from "../api/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsProductLoading(true);

        const data = await productService.getProducts();

        // Normalize backend data → frontend format
        const formatted = data.map((p) => ({
          id: p.id,
          name: p.title,
          category: p.category,
          price: p.price,
          description: p.description,
          imageUrl: p.image,
          stock: p.stock,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isProductLoading, error };
};