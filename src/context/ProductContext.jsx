import React, { createContext, useContext, useState, useEffect } from 'react'
import { getImageForProduct, getAllImages } from '../firebase/db/images/imageStorage'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Загрузить продукты из Firestore
  const loadProducts = async (productsData) => {
    try {
      setLoading(true)
      setProducts(productsData || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Загрузить все картинки из localStorage
  const loadAllImages = () => {
    try {
      const allImages = getAllImages()
      setImages(allImages)
    } catch (err) {
      console.error('Error loading images:', err)
    }
  }

  // Получить картинку для продукта
  const getProductImage = (productId) => {
    return images[productId] || null
  }

  // Получить продукт по ID
  const getProductById = (productId) => {
    return products.find(p => p.productId === productId)
  }

  // Добавить продукт
  const addProduct = (product) => {
    setProducts([...products, product])
  }

  // Обновить продукт
  const updateProduct = (productId, updatedData) => {
    setProducts(products.map(p =>
      p.productId === productId ? { ...p, ...updatedData } : p
    ))
  }

  // Удалить продукт
  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.productId !== productId))
  }

  // Начальная загрузка картинок
  useEffect(() => {
    loadAllImages()
  }, [])

  const value = {
    products,
    images,
    loading,
    error,
    loadProducts,
    loadAllImages,
    getProductImage,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

// Hook для использования контекста
export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts должен использоваться внутри ProductProvider')
  }
  return context
}
