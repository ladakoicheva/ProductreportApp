import Header from "./components/Header/Header"
import HomePage from "./pages/HomePage/HomePage"
import ProductAddPage from "./pages/ProductAddPage/ProductAddPage"
import ProductPage from "./pages/ProductPage/ProductPage"
import AuthPage from "./pages/AuthPage/AuthPage"
import { Route, Routes, HashRouter } from "react-router"
import ReportPage from "./pages/ReportPage/ReportPage"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='products' element={<ProductPage />} />
          <Route path='products/:id' element={<ReportPage />} />
          <Route
            path='/add'
            element={
              <ProtectedRoute>
                <ProductAddPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
