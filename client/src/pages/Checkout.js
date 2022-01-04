import React from 'react'
import CartNavig from '../components/CartNavig'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

const Checkout = () => {
  return (
    <>
      <Nav />
      <div className='container'>
        <section>
          <CartNavig />
          <h1>Checkout</h1>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Checkout
