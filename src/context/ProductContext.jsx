import React, { createContext, useContext, useState, useEffect } from 'react'
import { getImageForProduct } from '../firebase/db/images/imageStorage'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [showProducts, setShowProducts] = useState([]) // What we actually display on the screen
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // IMPORTANT: Once we download products, immediately copy them to showProducts
  useEffect(() => {
    setShowProducts(products)
  }, [products])

  // Load products from Firestore
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

  // Filter function (called from sidebar)
  const filterByCategory = (category) => {
    if (category === 'All') {
      setShowProducts(products)
    } else {
      setShowProducts(products.filter(p => p.category === category))
    }
  }

  // Keep other functions as they were
  const getProductImage = async (productId) => {
    try { return await getImageForProduct(productId) }
    catch (err) { return null }
  }

  const getProductById = (productId) => products.find(p => p.productId === productId)
  const addProduct = (product) => setProducts([...products, product])
  const updateProduct = (productId, updatedData) => setProducts(products.map(p => p.productId === productId ? { ...p, ...updatedData } : p))
  const deleteProduct = (productId) => setProducts(products.filter(p => p.productId !== productId))

  // Export everything outside
  const value = {
    products,
    showProducts, // <-- Added
    loading,
    error,
    loadProducts,
    filterByCategory, // <-- Added
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
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}