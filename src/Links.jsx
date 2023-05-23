import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import Components 
import Post from './components/Post'
import Dog from './components/Dog'

// Import Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Shopfront from './pages/shop/Shopfront'
import Product from './pages/shop/Product'
import Dogs from './pages/Dogs'
import DogsViaSizes from './pages/DogsViaSizes'
import Largest from './pages/Largest'
import Medium from './pages/Medium'
import Small from './pages/Small'


const Links = () => {
  return (
      <Routes>
        {/* COMPONENTS */}
        <Route path="/post/:id" element={<Post />}/>
        <Route path="/dog/:id" element={<Dog />}/>

        {/* PAGES */}
        <Route exact path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/dogs" element={<Dogs />}/>        
        <Route path="/dogsviasizes" element={<DogsViaSizes />}/>        
        <Route path="/contact" element={<Contact />}/>
        <Route path="/largest" element={<Largest />}/>
        <Route path="/medium" element={<Medium />}/>
        <Route path="/small" element={<Small />}/>


        {/* SHOP PAGES */}
        <Route path="/shop" element={<Shopfront />}/>
        <Route path="/product/:id" element={<Product />}/>
      </Routes>
  )
}

export default Links
