import React, { createContext, useContext, useState, useEffect } from 'react'
import { getImageForProduct } from '../firebase/db/images/imageStorage'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [showProducts, setShowProducts] = useState([]) // То, что мы реально показываем на экране
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ВАЖНО: Как только скачали products, сразу копируем их в showProducts
  useEffect(() => {
    setShowProducts(products)
  }, [products])

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

  // Функция для фильтрации (ее будем вызывать в сайдбаре)
  const filterByCategory = (category) => {
    if (category === 'All') {
      setShowProducts(products)
    } else {
      setShowProducts(products.filter(p => p.category === category))
    }
  }

  // Остальные функции оставляем как были
  const getProductImage = async (productId) => {
    try { return await getImageForProduct(productId) }
    catch (err) { return null }
  }

  const getProductById = (productId) => products.find(p => p.productId === productId)
  const addProduct = (product) => setProducts([...products, product])
  const updateProduct = (productId, updatedData) => setProducts(products.map(p => p.productId === productId ? { ...p, ...updatedData } : p))
  const deleteProduct = (productId) => setProducts(products.filter(p => p.productId !== productId))

  // Экспортируем все наружу
  const value = {
    products,
    showProducts, // <-- Добавлено
    loading,
    error,
    loadProducts,
    filterByCategory, // <-- Добавлено
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

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts должен использоваться внутри ProductProvider')
  }
  return context
}