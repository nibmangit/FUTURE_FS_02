import { useState, useEffect } from "react";
import productService from "../api/productService";

export const useProducts = ({ page, category, search } = {}) => {
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsProductLoading(true);

        const data = await productService.getProducts({ page, category, search });

        // Normalize backend data → frontend format
        const formatted = data.results.map((p) => ({
          id: p.id,
          name: p.title,
          category: p.category,
          categorySlug: p.category?.slug,
          price: p.price,
          description: p.description,
          imageUrl: p.image,
          stock: p.stock,
        }));

        setProducts(formatted);

        setCount(data.count);
        setNext(data.next);
        setPrevious(data.previous);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchProducts();
  }, [page, category, search]);

  return { products, isProductLoading, error, count, next, previous};
};