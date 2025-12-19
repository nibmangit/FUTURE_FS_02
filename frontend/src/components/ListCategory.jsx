const ListCategory=(products)=>{ 
    const CATEGORIES = [
        "All", ...new Set(products.map(product => product.category))
    ] 
    return CATEGORIES;
}
export default ListCategory;