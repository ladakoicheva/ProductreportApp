import { AUTH } from "../index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Register new user
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
    console.log("User registered successfully:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
    console.log("User logged in successfully:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// User logout
export const logoutUser = async () => {
  try {
    await signOut(AUTH);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

// Listener to track authorization status
export const onAuthChange = (callback) => {
  return onAuthStateChanged(AUTH, callback);
};

// Get current user
export const getCurrentUser = () => {
  return AUTH.currentUser;
};
