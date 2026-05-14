import { APP_DB } from "../..";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

export const sendData = async (data) => {
  try {
    await setDoc(doc(APP_DB, "products", data.productId), data);
    console.log("Product data synced successfully!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

// Получить все продукты из Firestore
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(APP_DB, "products"));
    const products = []
    querySnapshot.forEach((doc) => {
      products.push(doc.data())
    })
    return products
  } catch (e) {
    console.error("Error getting products: ", e);
    return []
  }
}
