import React from 'react'
import { Link } from 'react-router-dom'
import C from '../css/CartNavig.module.css'

const CartNavig = () => {
  return (
    <div className={C.navigBox}>
      <Link to='/cart' className={C.link}>
        <p>Cart</p>
      </Link>
      <Link to='/checkout' className={C.link}>
        <p>Checkout</p>
      </Link>
      <Link to='/' className={C.link}>
        <p>Order</p>
      </Link>
    </div>
  )
}

export default CartNavig
