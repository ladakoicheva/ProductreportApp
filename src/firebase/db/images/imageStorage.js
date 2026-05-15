// Utility for working with images in Firebase Storage
import { APP_DB } from "../.."
import { doc, getDoc, setDoc, deleteField } from "firebase/firestore"

const IMAGES_COLLECTION = 'product_images'

// Сохранить URL картинки для продукта в Firestore
export const saveImageForProduct = async (productId, imageUrl) => {
  try {
    const docRef = doc(APP_DB, IMAGES_COLLECTION, productId)
    await setDoc(docRef, { imageUrl, productId }, { merge: true })
    console.log(`URL картинки для продукта ${productId} сохранён в Firestore`)
    return true
  } catch (error) {
    console.error('Error saving image URL to Firestore:', error)
    return false
  }
}

// Получить картинку для продукта
export const getImageForProduct = async (productId) => {
  try {
    const docRef = doc(APP_DB, IMAGES_COLLECTION, productId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && docSnap.data().imageUrl) {
      console.log(`Получена картинка для продукта ${productId}:`, true)
      return docSnap.data().imageUrl
    }

    console.log(`Картинка для продукта ${productId} не найдена`)
    return null
  } catch (error) {
    console.error('Error getting image URL from Firestore:', error)
    return null
  }
}

// Получить все картинки из Firestore
export const getAllImages = async () => {
  try {
    // Примечание: это работает только если у вас небольшое количество изображений
    // Для больших объёмов лучше использовать pagination
    const allImages = {}
    // Этот метод требует структуры данных - рекомендуется хранить URLs прямо в коллекции products
    console.log('getAllImages: используйте getImageForProduct для отдельных продуктов')
    return allImages
  } catch (error) {
    console.error('Error getting all images:', error)
    return {}
  }
}


