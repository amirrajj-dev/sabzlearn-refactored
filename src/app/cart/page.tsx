import CartPage from '@/components/pages/cart/Cart'
import Footer from '@/components/shared/footer/Footer'
import Navbar from '@/components/shared/navbar/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <CartPage/>
        <Footer/>
    </div>
  )
}

export default page