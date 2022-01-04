import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaEye } from 'react-icons/fa'
import P from '../css/products.module.css'
import { handleAddToCart } from '../redux/reducers/cartReducer'
import { formatPrice } from './Helpers/FormatPrice'

const Products = ({ _id, image, title, niche, price, discountPrice }) => {
  const {
    User: { isAuthenticated, user },
  } = useSelector(state => state.auth)

  const { isLoading } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleClick = _id => {
    if (!isAuthenticated) {
      return dispatch({ type: `OPEN_LOGIN_MODAL` })
    } else if (isLoading) {
      return
    } else {
      dispatch(handleAddToCart(_id, user._id))
    }
  }

  const productPrice = discountPrice ? discountPrice : price

  return (
    <div className={P.productBox}>
      <Link to={`/product/${_id}`}>
        <div className={P.productImgContainer}>
          <img src={image} alt='product image' />
        </div>
      </Link>
      <div className={P.productBoxSeat}>
        <header onClick={() => dispatch({ type: 'OPEN_MODAL', payload: _id })}>
          <h3>
            <FaEye /> Quick view
          </h3>
        </header>
        <div className={P.productBoxSeatContent}>
          <p className={P.category}>{niche || 'iphones'}</p>
          <h3 className={P.title}>{title}</h3>
          <p className={P.price}>{formatPrice(productPrice)}</p>
          <div className={P.btnContainer}>
            <button className={P.btn} onClick={() => handleClick(_id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
