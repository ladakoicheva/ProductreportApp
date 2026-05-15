// Utility for working with images in Firebase Storage
import { APP_DB } from "../.."
import { doc, getDoc, setDoc, deleteField } from "firebase/firestore"

// Save image URL for product in Firestore
export const saveImageForProduct = async (productId, imageUrl) => {
  try {
    const docRef = doc(APP_DB, "products", productId)
    await setDoc(docRef, { imageUrl }, { merge: true })
    console.log(`Image URL for product ${productId} saved to Firestore`)
    return true
  } catch (error) {
    console.error('Error saving image URL to Firestore:', error)
    return false
  }
}

// Get image for product
export const getImageForProduct = async (productId) => {
  try {
    const docRef = doc(APP_DB, "products", productId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && docSnap.data().imageUrl) {
      console.log(`Got image for product ${productId}:`, true)
      return docSnap.data().imageUrl
    }

    console.log(`Image for product ${productId} not found`)
    return null
  } catch (error) {
    console.error('Error getting image URL from Firestore:', error)
    return null
  }
}

// Delete image for product
export const deleteImageForProduct = async (productId) => {
  try {
    const docRef = doc(APP_DB, "products", productId)
    await setDoc(docRef, { imageUrl: deleteField() }, { merge: true })
    console.log(`Image for product ${productId} deleted from Firestore`)
    return true
  } catch (error) {
    console.error('Error deleting image URL from Firestore:', error)
    return false
  }
}


