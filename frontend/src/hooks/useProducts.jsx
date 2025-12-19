import { useState, useEffect } from 'react';
 
const CATEGORY_MAP = {
  'smartphones': 'Smartphones',
  'laptops': 'Laptops',
  'tablets': 'Tablets',
  'mobile-accessories': 'Gadgets & Gear',
  'mens-watches': 'Smart Watches',
  'womens-watches': 'Smart Watches',
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTech = async () => {
      try {
        setIsProductLoading(true); 
        const categories = Object.keys(CATEGORY_MAP); 

        const responses = await Promise.all(
          categories.map(cat => fetch(`https://dummyjson.com/products/category/${cat}`))
        );
        
        const results = await Promise.all(responses.map(res => res.json()));
        const combinedProducts = results.flatMap(result => result.products);

        const formatted = combinedProducts.map(p => ({
          id: p.id.toString(),
          name: p.title,  
          category: CATEGORY_MAP[p.category] || (p.category.charAt(0).toUpperCase() + p.category.slice(1)),
          price: p.price,
          description: p.description,
          imageUrl: p.images[0], 
        })); 

        const shuffledProducts = formatted.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Fetch error:", err);
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchAllTech();
  }, []);

  return { products, isProductLoading, error };
};