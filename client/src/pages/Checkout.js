import React from 'react'
import CartNavig from '../components/CartNavig'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import C from '../css/Checkout.module.css'

const Checkout = () => {
  return (
    <>
      <Nav />
      <div className='container'>
        <section>
          <CartNavig />
          <div className={C.checkoutContainer}>
            <form>
              <div className={C.form_group}>
                <label htmlFor='firstname'>
                  firstname <span className='style_this'>*</span>
                </label>
                <input type='text' required id='firstname' />
              </div>

              <div className={C.form_group}>
                <label htmlFor='lastname'>
                  lastname <span className='style_this'>*</span>
                </label>
                <input type='text' required id='lastname' />
              </div>

              <div className={C.form_group}>
                <label htmlFor='phonenumber'>
                  phonenumber <span className='style_this'>*</span>
                </label>
                <input type='tel' id='phonenumber' />
              </div>

              <div className={C.form_group}>
                <label htmlFor='state'>
                  state <span className='style_this'>*</span>
                </label>
                <input type='text' id='state' />
              </div>

              <div className={C.form_group}>
                <label htmlFor='address'>
                  address <span className='style_this'>*</span>
                </label>
                <input type='text' id='address' />
              </div>

              <div className={C.form_group}>
                <label htmlFor='zipcode'>
                  zipcode <span className='style_this'>*</span>
                </label>
                <input type='text' id='zipcode' />
              </div>

              <div className={C.form_group}>
                <button type='submit'>submit</button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Checkout
