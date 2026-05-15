import React, { useState } from 'react'
import { CATEGORIES } from '../../constants/categories'
import styles from './SideBar.module.css'
import { useProducts } from '../../context/ProductContext'

export default function SideBar() {
  // Достаем полный список продуктов (для подсчета) и функцию фильтрации
  const { products, filterByCategory } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleCategoryClick = (category) => {
    setSelectedCategory(category) // Красим активную кнопку
    filterByCategory(category)    // Меняем товары на странице
  }

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>📂 Categories</h3>
      <ul className={styles.categoryList}>
        <li
          className={`${styles.categoryItem} ${selectedCategory === 'All' ? styles.active : ''}`}
          onClick={() => handleCategoryClick('All')}
        >
          <span className={styles.categoryName}>All Products</span>
          <span className={styles.count}>{products.length}</span>
        </li>

        {CATEGORIES.map(category => {
          // Считаем продукты по категориям
          const count = products.filter(p => p.category === category).length

          if (count === 0) return null

          return (
            <li
              key={category}
              className={`${styles.categoryItem} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className={styles.categoryName}>{category}</span>
              <span className={styles.count}>{count}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}