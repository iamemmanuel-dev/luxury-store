import axios from 'axios'
import { printOptions } from '../axiosHelper'

const cartState = {
  isLoginModalOpen: false,
  isLoading: true,
  tax: 5,
  flatRate: 10,
  shippingCost: 0,
  cart: [],
}

export const handleAddToCart = (productID, userID) => async dispatch => {
  dispatch({ type: `ADDING_TO_CART` })
  try {
    const res = await axios(
      printOptions(`POST`, `/api/user/cart?user=${userID}`, { productID })
    )
    const { message, cart } = res.data
    message
      ? dispatch({ type: `TERMINATE_FETCHING` })
      : dispatch({ type: `FETCH_CART_COMPLETE`, payload: cart })
  } catch (err) {
    console.log(err)
  }
}

export const fetchCartItems = userID => async dispatch => {
  try {
    const res = await axios(
      printOptions(`GET`, `/api/user/cart?user=${userID}`)
    )

    const { cart } = res.data
    dispatch({ type: `FETCH_CART_COMPLETE`, payload: cart })
  } catch (err) {
    console.log(err)
  }
}

export const handleCartItemDeletion = (userID, productID) => async dispatch => {
  try {
    const res = await axios(
      printOptions(
        `DELETE`,
        `/api/user/cart?user=${userID}&product=${productID}`
      )
    )
    const { payload } = res.data
    dispatch({ type: `DELETION_COMPLETE`, payload })
  } catch (err) {
    alert(`Something went wrong!`)
    console.log(err)
  }
}

export const proceedToCheckout =
  (cart, { user, shipCost, cartTotal }) =>
  async dispatch => {
    try {
      const res = await axios(
        printOptions(
          `PUT`,
          `/api/user/cart?cart=${JSON.stringify(cart)}&userID=${
            user._id
          }&shipCost=${shipCost}&cartTotal=${cartTotal}`
        )
      )

      const { cart: newCart, payLoad } = res.data
      dispatch({ type: 'UPDATE_CART', payload: newCart, config: payLoad })
    } catch (err) {
      console.log(err)
      alert(`something went wrong`)
    }
  }

const reducer = (state = cartState, { type, payload, config }) => {
  switch (type) {
    case 'OPEN_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalOpen: true,
      }

    case 'CLOSE_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalOpen: false,
      }

    case 'ADDING_TO_CART':
      return {
        ...state,
        isLoading: true,
      }

    case 'FETCH_CART_COMPLETE':
      return {
        ...state,
        isLoading: false,
        cart: payload,
      }

    case 'TERMINATE_FETCHING':
      return {
        ...state,
        isLoading: false,
      }

    case 'DELETION_COMPLETE':
      return {
        ...state,
        cart: payload,
      }

    case 'SET_SHIPPING_COST':
      return {
        ...state,
        shippingCost: payload,
      }

    case 'HANDLE_INCREMENT':
      const cart_INC = state.cart.map(items =>
        items._id === payload ? { ...items, amount: items.amount + 1 } : items
      )
      return {
        ...state,
        cart: cart_INC,
      }

    case 'HANDLE_DECREMENT':
      const cart_DEC = state.cart.map(items =>
        items._id === payload && items.amount > 1
          ? { ...items, amount: items.amount - 1 }
          : items
      )
      return {
        ...state,
        cart: cart_DEC,
      }

    case 'UPDATE_CART':
      return {
        ...state,
        cart: payload,
        shippingCost: config.shippingCost,
      }

    default:
      return state
  }
}

export default reducer
