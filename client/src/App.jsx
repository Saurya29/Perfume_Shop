import { Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'

export default function App() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  )
}
