import { APP_DB } from "../..";
import { doc, setDoc, collection, getDocs, deleteDoc, getDoc } from "firebase/firestore";

// Save product (accessible to all, but author is tracked)
export const sendData = async (userId, userEmail, data) => {
  try {
    const productRef = doc(APP_DB, "products", data.productId);
    await setDoc(productRef, {
      ...data,
      userId,
      userEmail,
      createdAt: new Date().toISOString(),
    });
    console.log("Product data synced successfully!");
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Get ALL products (for all users)
export const getProducts = async () => {
  try {
    const productsRef = collection(APP_DB, "products");
    const querySnapshot = await getDocs(productsRef);
    const products = [];
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      console.log('Raw product data:', productData);
      products.push(productData);
    });
    console.log('Total products loaded:', products.length);
    return products;
  } catch (e) {
    console.error("Error getting products: ", e);
    return [];
  }
};

// Get single product by ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(APP_DB, "products", productId);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      return productSnapshot.data();
    } else {
      console.warn(`Product with ID ${productId} not found`);
      return null;
    }
  } catch (e) {
    console.error("Error getting product by ID: ", e);
    return null;
  }
};

// Get only products of current user
export const getUserProducts = async (userId) => {
  try {
    const products = await getProducts();
    return products.filter(p => p.userId === userId);
  } catch (e) {
    console.error("Error getting user products: ", e);
    return [];
  }
};

// Delete product (only author can delete)
export const deleteProduct = async (productId, userId) => {
  try {
    const productRef = doc(APP_DB, "products", productId);
    const productRef2 = collection(APP_DB, "products");
    const querySnapshot = await getDocs(productRef2);

    let canDelete = false;
    querySnapshot.forEach((doc) => {
      if (doc.id === productId && doc.data().userId === userId) {
        canDelete = true;
      }
    });

    if (!canDelete) {
      throw new Error("You can only delete your own products");
    }

    await deleteDoc(productRef);
    console.log("Product deleted successfully!");
  } catch (e) {
    console.error("Error deleting product: ", e);
    throw e;
  }
};
