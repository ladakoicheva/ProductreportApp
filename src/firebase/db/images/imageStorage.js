// Utility for working with images (URLs are stored in localStorage)
import imageData from '../../mockData/imageData.json'

const IMAGES_KEY = 'product_images'

// Synchronize imageData.json with localStorage on load
export const initializeImages = () => {
  const existingImages = localStorage.getItem(IMAGES_KEY)

  // If localStorage is empty, load from imageData.json
  if (!existingImages) {
    localStorage.setItem(IMAGES_KEY, JSON.stringify(imageData.images || {}))
    console.log('Images loaded from imageData.json to localStorage')
  } else {
    console.log('Images already in localStorage, sync skipped')
  }
}

// Получить все картинки из localStorage (URLs)
export const getAllImages = () => {
  const data = localStorage.getItem(IMAGES_KEY)
  return data ? JSON.parse(data) : {}
}

// Сохранить URL картинки для продукта в localStorage
export const saveImageForProduct = (productId, imageUrl) => {
  const images = getAllImages()
  images[productId] = imageUrl
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images))
  console.log(`URL картинки для продукта ${productId} сохранён в localStorage`)
}


// Получить картинку для продукта
export const getImageForProduct = (productId) => {
  const images = getAllImages()
  const image = images[productId] || null
  console.log(`Получена картинка для продукта ${productId}:`, !!image)
  return image
}

// Удалить картинку для продукта
export const deleteImageForProduct = (productId) => {
  const images = getAllImages()
  delete images[productId]
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images))
}

// Очистить все картинки
export const clearAllImages = () => {
  localStorage.removeItem(IMAGES_KEY)
}

