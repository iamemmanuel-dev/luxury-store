import React, { useEffect, useState, useRef } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartNavig from '../components/CartNavig'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import C from '../css/Cart.module.css'
import {
  fetchCartItems,
  proceedToCheckout,
} from '../redux/reducers/cartReducer'
import NewsLetter from '../components/NewsLetter'
import { formatPrice } from '../components/Helpers/FormatPrice'
import CartItems from '../components/CartItems'

const Cart = props => {
  const [error, setError] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const inputRef = useRef(null)
  const { isLoading, cart, tax, flatRate, shippingCost } = useSelector(
    state => state.cart
  )
  const {
    User: { isAuthenticated, user },
  } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const cartSubTotal = cart.reduce(
    (a, c) =>
      a +
      parseInt(
        c.discountPrice ? c.discountPrice * c.amount : c.price * c.amount
      ),
    0
  )

  const shipCost = Number(shippingCost)
  const cartTotal = Number(cartSubTotal) + (shipCost ? shipCost : 0) + tax

  const handleChange = e => {
    const value = e.target.checked && e.target.value
    dispatch({ type: `SET_SHIPPING_COST`, payload: value })
  }

  const validateProceedToCheckout = e => {
    e.preventDefault()
    // if (shippingCost === 'free') {
    //   const isNotLiable = cart.some(
    //     el => el.niche === 'macbooks' || el.niche === 'rolex' || cart.length > 3
    //   )
    //   if (isNotLiable) {
    //     return setError(true)
    //   }
    //   return dispatch(
    //     proceedToCheckout(cart, { user, shipCost, cartTotal })
    //   ).then(() => props.history.replace(`/checkout`))
    // }

    // dispatch(proceedToCheckout(cart, { user, shipCost, cartTotal })).then(() =>
    //   props.history.replace(`/checkout`)
    // )
  }

  const handleCouponVerification = e => {
    e.preventDefault()
  }

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user._id))
    }
  }, [user])

  return (
    <>
      <Nav />
      <div className='container'>
        <div className={C.center}>
          <CartNavig />
          {isLoading ? (
            <div className='spinnerContainer'>
              <img src='/images/loading.jpg' alt='loading spinner' />
            </div>
          ) : !isAuthenticated ? (
            <div className={C.alertContainer}>
              <h2>
                Please{' '}
                <Link to='/signin' className='style_this'>
                  login
                </Link>{' '}
                to access this resource
              </h2>
            </div>
          ) : (
            <>
              <h3 className={C.pageTitle}>Your Cart</h3>
              {cart.length < 1 ? (
                <div className={C.alertContainer}>
                  <h2>
                    You do not have any item in your cart.{' '}
                    <Link to='/shop' className='style_this'>
                      Go shopping
                    </Link>
                  </h2>
                </div>
              ) : (
                <>
                  <table className={C.table}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(items => (
                        <CartItems
                          {...items}
                          key={items._id}
                          userID={user._id}
                        />
                      ))}
                    </tbody>
                  </table>

                  <div className={C.row}>
                    {/* <div className={C.col_1}>
                      <form onSubmit={handleCouponVerification}>
                        <h3>Apply Coupon</h3>
                        <small>
                          Enter code Cx31Hr3d to get 10% off total cart
                          price.Valid for one time
                        </small>
                        {couponError && (
                          <div className={C.couponErrContainer}>
                            <p>
                              This coupon code is invalid. Please enter another
                            </p>
                          </div>
                        )}
                        <div className={C.form_group_C}>
                          <input type='text' placeholder='Enter Your Coupon' />
                          <button>Apply</button>
                        </div>
                      </form>
                      <small className={C.verificationStatus}>
                        Verifying: verified
                      </small>
                    </div> */}
                    <div className={C.col_2}>
                      <header>
                        <h3>Cart Summary</h3>
                      </header>
                      <div className={C.subTotBox}>
                        <h4>subtotal</h4>
                        <h4>{formatPrice(cartSubTotal)}</h4>
                      </div>
                      <div className={C.shippingDetail}>
                        <h4>Shipping: free</h4>
                        <form onSubmit={validateProceedToCheckout}>
                          {/* <div className={C.form_group}>
                            <input
                              type='radio'
                              name='shippingCost'
                              value={flatRate}
                              ref={inputRef}
                              id='flat_rate'
                              onChange={handleChange}
                              required
                            />
                            <label htmlFor='flat_rate'>
                              Flat rate: {formatPrice(10)}
                            </label>
                          </div>

                          <div className={C.form_group}>
                            <input
                              type='radio'
                              name='shippingCost'
                              value='free'
                              id='freeShip'
                              onChange={handleChange}
                              required
                            />
                            <label htmlFor='freeShip'>Free shipping</label>
                          </div>
                          <p className={C.TAndC}>Free shipping T&C applies</p>
                          <div
                            className={C.alertBox}
                            style={{ display: error ? 'block' : 'none' }}
                          >
                            <p>
                              Free shipping doesn't apply to carts with macbooks
                              and rolex and more than 3 products. Please select
                              "flat rate" to continue.
                            </p>
                          </div> */}

                          <div className={C.taxBox}>
                            <h4>Tax</h4>
                            <h4>{formatPrice(tax)}</h4>
                          </div>

                          <div className={C.total}>
                            <h4>Total</h4>
                            <h4>{formatPrice(cartTotal)}</h4>
                          </div>
                          <StripeCheckout
                            amount={cartTotal * 100}
                            token={() =>
                              alert(
                                'Thank you, your order has been received. please do not perform this action again'
                              )
                            }
                            stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
                            name='Luxury Buy'
                            description={`pay a total of ${formatPrice(
                              cartTotal
                            )} in total for your luxury products`}
                          >
                            <button type='submit' className={C.btn}>
                              proceed to checkout
                            </button>
                          </StripeCheckout>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default withRouter(Cart)
