import axios from 'axios'
import { printOptions } from '../axiosHelper'

const formData = () => ({
  title: '',
  description: '',
  slug: '',
  niche: '',
  category: '',
  price: '',
  DOD: '',
  discount: '',
  discountPrice: '',
  rating: '',
  stockCount: '',
  image: '',
  originalImg: '',
})

const products = {
  productsData: formData(),
  notification: {
    isNotificationOn: false,
    alertMsg: '',
    alertBGCol: '',
    isEditOn: false,
    isModalOpen: false,
    modalID: null,
    deletionStatus: 'uninitialized',
  },
}

export const handleAddProducts = (data, id) => async dispatch => {
  try {
    const res = await axios(
      printOptions(`${id ? 'PUT' : 'POST'}`, `/api/products?id=${id}`, data)
    )
    const { status } = res.data
    status === `success`
      ? dispatch({ type: `PRODUCT_ADDED` })
      : dispatch({ type: `PRODUCT_REJECTED` })
  } catch (error) {
    console.log(error)
  }
}

export const handleEdit = id => async dispatch => {
  try {
    const res = await axios(printOptions(`GET`, `/api/products?id=${id}`))

    const product = res.data.product
    dispatch({ type: `READY_EDIT`, payload: product })
  } catch (err) {
    console.log(err)
  }
}

export const confirmProductDelete = id => async dispatch => {
  dispatch({ type: `INITIATE_DELETION` })
  try {
    const res = await axios(printOptions(`DELETE`, `/api/products?id=${id}`))

    const { status } = res.data
    if (status === `success`) {
      dispatch({ type: `DELETEION_COMPLETE` })
    } else {
      dispatch({ type: `DELETION_FAILED` })
    }
  } catch (err) {
    dispatch({ type: `DELETION_FAILED` })
  }
}

const reducer = (state = products, { type, payload, file }) => {
  switch (type) {
    case 'SET_PRODUCTS_VALUE':
      return {
        ...state,
        productsData: {
          ...state.productsData,
          ...payload,
        },
      }

    case 'SET_DISCOUNT_PRICE':
      return {
        ...state,
        productsData: {
          ...state.productsData,
          discountPrice: payload,
        },
      }

    case 'SET_PRODUCT_IMAGE':
      return {
        ...state,
        productsData: {
          ...state.productsData,
          image: payload,
          originalImg: file,
        },
      }

    case 'PRODUCT_ADDED':
      return {
        ...state,
        productsData: formData(),
        notification: {
          isNotificationOn: true,
          alertMsg: `Product added`,
          alertBGCol: `rgb(149, 238, 149)`,
          isEditOn: false,
        },
      }

    case 'PRODUCT_REJECTED':
      return {
        ...state,
        notification: {
          isNotificationOn: true,
          alertMsg: `Something went wrong!`,
          alertBGCol: `rgb(255, 188, 200)`,
        },
      }

    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
        notification: {
          ...state.notification,
          isNotificationOn: false,
        },
      }

    case 'EDIT_ON':
      return {
        ...state,
        notification: {
          ...state.notification,
          isEditOn: true,
        },
      }

    case 'READY_EDIT':
      let data = {}
      for (let k in state.productsData) {
        data[k] = payload[k]
      }

      return {
        ...state,
        productsData: data,
      }

    case 'OPEN_MODAL':
      return {
        ...state,
        notification: {
          ...state.notification,
          isModalOpen: true,
          modalID: payload,
        },
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        notification: {
          ...state.notification,
          isModalOpen: false,
        },
      }

    case 'INITIATE_DELETION':
      return {
        ...state,
        notification: {
          ...state.notification,
          deletionStatus: 'initialized',
        },
      }

    case 'DELETEION_COMPLETE':
      return {
        ...state,
        notification: {
          ...state.notification,
          deletionStatus: 'completed',
        },
      }

    case 'DELETION_FAILED':
      return {
        ...state,
        notification: {
          ...state.notification,
          deletionStatus: 'failed',
        },
      }

    default:
      return state
  }
}

export default reducer
