import React from 'react'
import { useProductStore } from '../../store/productStore';
export default function SideBar() {
  const { products, setProducts } = useProductStore();
  
  return (
    <div>
      <h3>Categories</h3>
      <ul>
        <li>All</li>
        {products && products.map(product => (
        <li key={product.productId}>{product.category}</li>
      ))}</ul>
     
    </div>

  )
}
