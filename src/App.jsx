import { useEffect } from "react"
import Header from "./components/Header/Header"
import HomePage from "./pages/HomePage/HomePage"
import ProductAddPage from "./pages/ProductAddPage/ProductAddPage"
import ProductPage from "./pages/ProductPage/ProductPage"
import { Route, Routes, HashRouter } from "react-router"
import ReportPage from "./pages/ReportPage/ReportPage"

function App() {
  return (
    <>
      <HashRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add' element={<ProductAddPage />}></Route>
          <Route path='products' element={<ProductPage />}></Route>
          <Route path='products/:id' element={<ReportPage />}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
