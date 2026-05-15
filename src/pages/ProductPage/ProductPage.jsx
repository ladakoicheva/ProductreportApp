import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useProductStore } from '../../store/productStore'
import { getProducts } from '../../firebase/db/products/products'
import styles from './ProductPage.module.css'
import SideBar from '../../components/SideBar/SideBar'

export default function ProductPage() {
  const { products, setProducts } = useProductStore()

  useEffect(() => {
    const loadProductsFromFirestore = async () => {
      try {
        const productsData = await getProducts()
        console.log('Loaded all products:', productsData)

        if (!productsData || productsData.length === 0) {
          console.warn('No products found in Firestore')
        }

        setProducts(productsData)
      } catch (error) {
        console.error('Error loading:', error)
      }
    }

    loadProductsFromFirestore()
  }, [setProducts])

  return (
    <div className={styles.container}>
      <h1>All Products</h1>

      {products.length === 0 ? (
        <p className={styles.empty}>No products found</p>
      ) : (
        <div className={styles.productsList}>
          {products.map(product => {
            console.log('Rendering product:', product.productId, 'Email:', product.userEmail, 'Image:', product.imageUrl)
            return (
              <div key={product.productId} className={styles.productCard}>
                <Link to={`/products/${product.productId}`} className={styles.imageLink}>
                  {product.imageUrl ? (
                    <div className={styles.imageContainer}>
                      <img src={product.imageUrl} alt={product.productName} className={styles.image} />
                    </div>
                  ) : (
                    <div className={styles.imageContainer} style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#999' }}>No image</span>
                    </div>
                  )}
                </Link>

                <div className={styles.productInfo}>
                  <h3 className={styles.name}>{product.productName}</h3>

                  {product.userEmail && <p className={styles.author}>👤 {product.userEmail}</p>}

                  <div className={styles.details}>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Production Method:</strong> {product.productionMethod}</p>
                    <p><strong>Soil Quality:</strong> {product.quality}%</p>
                    <p><strong>Carbon Sequestration:</strong> {product.carbonSequestration}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      
    </div>
  )
}
