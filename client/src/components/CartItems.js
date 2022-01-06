import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { formatPrice } from '../components/Helpers/FormatPrice'
import { handleCartItemDeletion } from '../redux/reducers/cartReducer'
import C from '../css/Cart.module.css'

const CartItems = ({
  _id,
  image,
  title,
  price,
  discountPrice,
  amount,
  userID,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = productID => {
    setIsDeleting(true)
    dispatch(handleCartItemDeletion(userID, productID))
      .then(() => {
        setIsDeleting(false)
      })
      .catch(err => setIsDeleting(false))
  }

  const handleIncrement = id =>
    dispatch({ type: `HANDLE_INCREMENT`, payload: id })
  const handleDecrement = id =>
    dispatch({ type: `HANDLE_DECREMENT`, payload: id })

  return (
    <tr key={_id}>
      <td>
        <div>
          {isDeleting ? (
            <img
              src='/images/loading.jpg'
              alt='spinner'
              className={C.deletionIcon}
            />
          ) : (
            <FaTimes className={C.icon} onClick={() => handleDelete(_id)} />
          )}
        </div>
        <div className={C.imgContainer}>
          <img src={image} alt={title} />
        </div>
        <div className={C.productDetail}>
          <p>{title}</p>
          <h4>
            {discountPrice ? formatPrice(discountPrice) : formatPrice(price)}
          </h4>
        </div>
      </td>

      <td>{discountPrice ? formatPrice(discountPrice) : formatPrice(price)}</td>

      <td className={C.btnContainer}>
        <button onClick={() => handleDecrement(_id)}>-</button>
        <span>{amount}</span>
        <button onClick={() => handleIncrement(_id)}>+</button>
      </td>

      <td>
        {discountPrice
          ? `${formatPrice(parseInt(discountPrice * amount))}`
          : `${formatPrice(parseInt(price * amount))}`}
      </td>
    </tr>
  )
}

export default CartItems
