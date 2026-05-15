// Utility for working with images in Firebase Storage
import { APP_DB } from "../.."
import { doc, getDoc, setDoc, deleteField } from "firebase/firestore"

// Сохранить URL картинки для продукта в Firestore
export const saveImageForProduct = async (productId, imageUrl) => {
  try {
    const docRef = doc(APP_DB, "products", productId)
    await setDoc(docRef, { imageUrl }, { merge: true })
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
    const docRef = doc(APP_DB, "products", productId)
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

// Удалить картинку для продукта
export const deleteImageForProduct = async (productId) => {
  try {
    const docRef = doc(APP_DB, "products", productId)
    await setDoc(docRef, { imageUrl: deleteField() }, { merge: true })
    console.log(`Картинка для продукта ${productId} удалена из Firestore`)
    return true
  } catch (error) {
    console.error('Error deleting image URL from Firestore:', error)
    return false
  }
}


