import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaPhone,
  FaLaptop,
  FaStopwatch,
  FaStar,
  FaArrowLeft,
  FaTruckMoving,
} from 'react-icons/fa'
import { handleAddToCart } from '../redux/reducers/cartReducer'
import M from '../css/modal.module.css'

const Modal = () => {
  const overlay = useRef()
  const {
    fetch_product_state: { data },
    modalID,
  } = useSelector(state => state.products)

  const {
    User: { isAuthenticated, user },
  } = useSelector(state => state.auth)

  const { isLoading } = useSelector(state => state.cart)

  const dispatch = useDispatch()

  const clickedProd = data.find(el => el._id === modalID)

  const handleClick = e => {
    if (e.target.className.startsWith('modal_overlay'))
      dispatch({ type: 'CLOSE_MODAL' })
  }

  const handleClickToAddToCart = _id => {
    if (!isAuthenticated) {
      return dispatch({ type: `OPEN_LOGIN_MODAL` })
    } else if (isLoading) {
      return
    } else {
      dispatch(handleAddToCart(_id, user._id))
    }
  }

  return (
    <div className={M.overlay} ref={overlay} onClick={handleClick}>
      <div className={M.modalCenter}>
        <header className={M.modalHeader}>
          <h4>Luxury</h4>
          <button onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            <FaArrowLeft />
            go back
          </button>
          {clickedProd.niche === '' || clickedProd.niche === 'iphones' ? (
            <FaPhone />
          ) : clickedProd.niche === 'macbooks' ? (
            <FaLaptop />
          ) : (
            <FaStopwatch />
          )}
        </header>
        <div className={M.modalContent}>
          <div className={M.modalImgContainer}>
            <img src={clickedProd.image} alt='product image' />
          </div>
          <div className={M.productInfo}>
            <ul>
              <li>
                <h3 className={M.productInfo_title}>Name</h3>
                <p className={M.productInfo_value}>{clickedProd.title}</p>
              </li>
              <li>
                <h3 className={M.productInfo_title}>Price</h3>
                <p
                  className={M.productInfo_value}
                  style={{ fontWeight: 'bolder' }}
                >
                  ${Number.parseFloat(Number(clickedProd.price).toFixed(2))}
                </p>
              </li>
              <li>
                <h3 className={M.productInfo_title}>Rating</h3>
                <p className={M.productInfo_value}>
                  {new Array(+clickedProd.rating).fill().map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <footer className={M.modalFooter}>
          <div className={M.modalFooter_left}>
            <div className={M.iconContainer}>
              <FaTruckMoving />
            </div>
            <p>Safe shipping</p>
          </div>
          <button onClick={() => handleClickToAddToCart(modalID)}>
            Add to cart
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
