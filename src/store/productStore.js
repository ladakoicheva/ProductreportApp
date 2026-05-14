import { useState } from 'react'
import { getAllImages, getImageForProduct } from '../firebase/db/images/imageStorage'

// Store for state management
let storeState = {
  products: [],
  images: {},
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

// Store actions (read-only)
export const productStore = {
  // Load products
  setProducts: (products) => {
    storeState.products = products
    notifySubscribers()
  },

  // Load images from localStorage
  loadImages: () => {
    storeState.images = getAllImages()
    notifySubscribers()
  },

  // Get product by ID
  getProductById: (productId) => {
    return storeState.products.find(p => p.productId === productId)
  },

  // Get image for product DIRECTLY from localStorage
  getImage: (productId) => {
    return getImageForProduct(productId)
  },

  // Get all products
  getProducts: () => storeState.products,

  // Get all images
  getImages: () => storeState.images,
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
    images: state.images,
    getProductById: productStore.getProductById,
    getImage: productStore.getImage,
    getProducts: productStore.getProducts,
    getImages: productStore.getImages,
    setProducts: productStore.setProducts,
    loadImages: productStore.loadImages,
  }
}
