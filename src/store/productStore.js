import { useState } from 'react'
import { getImageForProduct } from '../firebase/db/images/imageStorage'

// Store for state management
let storeState = {
  products: [],
}

// Subscribers for changes
let subscribers = []

// Function to notify subscribers
const notifySubscribers = () => {
  subscribers.forEach(callback => callback(storeState))
}

// Subscribe to changes
export const subscribe = (callback) => {
  subscribers.push(callback)
  return () => {
    subscribers = subscribers.filter(sub => sub !== callback)
  }
}

// Get current state
export const getState = () => storeState

// Store actions
export const productStore = {
  // Load products
  setProducts: (products) => {
    storeState.products = products
    notifySubscribers()
  },

  // Get product by ID
  getProductById: (productId) => {
    return storeState.products.find(p => p.productId === productId)
  },

  // Get image for product from Firestore
  getImage: async (productId) => {
    return await getImageForProduct(productId)
  },

  // Get all products
  getProducts: () => storeState.products,
}

// Custom hook for using Store
export const useProductStore = () => {
  const [state, setState] = useState(storeState)

  // Подписаться на изменения при монтировании
  useState(() => {
    const unsubscribe = subscribe(newState => {
      setState({ ...newState })
    })
    return unsubscribe
  }, [])

  return {
    products: state.products,
    getProductById: productStore.getProductById,
    getImage: productStore.getImage,
    getProducts: productStore.getProducts,
    setProducts: productStore.setProducts,
  }
}
