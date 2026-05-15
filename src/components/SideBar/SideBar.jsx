import React, { useState } from 'react'
import { useProductStore } from '../../store/productStore'
import { CATEGORIES } from '../../constants/categories'
import styles from './SideBar.module.css'

export default function SideBar() {
  const { products } = useProductStore()
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Считаем продукты по категориям
  const getCategoryCount = (category) => {
    return products.filter(p => p.category === category).length
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    // TODO: Фильтровать продукты на ProductPage по выбранной категории
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
          const count = getCategoryCount(category)
          return count > 0 ? (
            <li
              key={category}
              className={`${styles.categoryItem} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className={styles.categoryName}>{category}</span>
              <span className={styles.count}>{count}</span>
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}
