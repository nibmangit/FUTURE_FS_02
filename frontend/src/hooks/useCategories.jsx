import { useState, useEffect } from "react";
import productService from "../api/productService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productService.getCategories();
        setCategories(res); 
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
};