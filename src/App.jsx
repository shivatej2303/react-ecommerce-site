import CentralPage from './stores/pages/CentralPage'
import { Routes, Route } from 'react-router-dom'
import ClothesSection from './stores/pages/Clothes'
import FurnitureSection from './stores/pages/Furniture'
import ElectronicsSection from './stores/pages/Electronics'
import ShoesSection from './stores/pages/Shoes'
import MiscellaneousSection from './stores/pages/Miscellaneous'
import ScrollToTop from './stores/components/ScrollToTop'
import SingleProduct from './SingleProduct/SingleProduct'

import './App.css'

function App() {
  return (
    <>
      {/* This component ensures that navigation to a new page scrolls the window to the top. */}
      <ScrollToTop />
      {/* The Routes component is where you define all the possible routes for your application. */}
      <Routes>
        {/* Each Route component maps a URL path to a specific React component. */}
        <Route path='/' element={<CentralPage />} />
        <Route path='/clothes' element={<ClothesSection />} />
        <Route path='/furniture' element={<FurnitureSection />} />
        <Route path='/electronics' element={<ElectronicsSection />} />
        <Route path='/shoes' element={<ShoesSection />} />
        <Route path='/miscellaneous' element={<MiscellaneousSection />} />
        
        {/* This is a dynamic route. The ":id" part is a URL parameter that will match any product ID. */}
        {/* It renders the SingleProduct component for a specific product. */}
        <Route path='/product/:id' element={<SingleProduct />} />

      </Routes>
    </>
  )
}

export default App
