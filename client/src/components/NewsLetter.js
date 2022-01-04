import React from 'react'
import N from '../css/Newsletter.module.css'

const NewsLetter = () => {
  return (
    <section id={N.newsletterSection}>
      <div className='container'>
        <div className={N.newsletterContainer}>
          <div className={N.row}>
            <div className={N.col_1}>
              <h3>Sign Up For Newsletter</h3>
              <p>
                Get E-mail updates about our latest products and{' '}
                <span className='style_this'>special offers</span>{' '}
              </p>
            </div>

            <div className={N.col_2}>
              <form>
                <input type='email' name='' id='' className='emailField' />
                <button>Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
