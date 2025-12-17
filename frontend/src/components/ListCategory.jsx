import { MOCK_PRODUCTS as products } from "../data/products";

const ListCategory=()=>{
    const CATEGORIES = [
        "All", ...new Set(products.map(product => product.category))
    ] 
    return CATEGORIES;
}
export default ListCategory;