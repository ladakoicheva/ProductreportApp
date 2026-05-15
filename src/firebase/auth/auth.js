import { AUTH } from "../index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Регистрация нового пользователя
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

// Вход пользователя
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

// Выход пользователя
export const logoutUser = async () => {
  try {
    await signOut(AUTH);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

// Слушатель для отслеживания статуса авторизации
export const onAuthChange = (callback) => {
  return onAuthStateChanged(AUTH, callback);
};

// Получить текущего пользователя
export const getCurrentUser = () => {
  return AUTH.currentUser;
};
