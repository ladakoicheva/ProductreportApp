import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useProductStore } from '../../store/productStore'
import { getProducts } from '../../firebase/db/products/products'
import styles from './ProductPage.module.css'

export default function ProductPage() {
  const { products, getImage, setProducts } = useProductStore()
  const [images, setImages] = useState({})

  useEffect(() => {
    const loadProductsFromFirestore = async () => {
      try {
        const productsData = await getProducts()
        console.log('Loaded products:', productsData)

        setProducts(productsData)

        // Load images for all products
        const loadedImages = {}
        for (const product of productsData) {
          const image = await getImage(product.productId)
          if (image) {
            loadedImages[product.productId] = image
            console.log(`Product: ${product.productId}, Image loaded: true`)
          }
        }
        setImages(loadedImages)
      } catch (error) {
        console.error('Error loading:', error)
      }
    }

    loadProductsFromFirestore()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p className={styles.empty}>No products found</p>
      ) : (
        <div className={styles.productsList}>
          {products.map(product => {
            const image = images[product.productId]
            return (
              <div key={product.productId} className={styles.productCard}>
                <Link to={`/products/${product.productId}`} className={styles.imageLink}>
                  {image ? (
                    <div className={styles.imageContainer}>
                      <img src={image} alt={product.productName} className={styles.image} />
                    </div>
                  ) : (
                    <div className={styles.imageContainer} style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#999' }}>No image</span>
                    </div>
                  )}
                </Link>

                <div className={styles.productInfo}>
                  <h3 className={styles.name}>{product.productName}</h3>

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
