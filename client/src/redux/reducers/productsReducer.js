import axios from 'axios'
import { printOptions } from '../axiosHelper'

const productsState = {
  fetch_product_state: {
    isLoading: false,
    error: '',
    data: [],
  },

  modalID: null,
  isModalOpen: false,
}

export const Fetch_Products = () => async dispatch => {
  dispatch({ type: 'INITIATE_FETCH_PRODUCTS' })
  try {
    const res = await axios(printOptions(`GET`, `/api/products`))
    dispatch({ type: `FETCH_PRODUCTS_SUCCESS`, payload: res.data.products })
  } catch (error) {
    dispatch({ type: `FETCH_PRODUCTS_FAILED` })
  }
}

const reducer = (state = productsState, { type, payload }) => {
  switch (type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        modalID: payload,
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
      }

    case 'INITIATE_FETCH_PRODUCTS':
      return {
        ...state,
        fetch_product_state: {
          isLoading: true,
          error: '',
          data: [],
        },
      }

    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        fetch_product_state: {
          isLoading: false,
          error: '',
          data: payload,
        },
      }

    case 'FETCH_PRODUCTS_FAILED':
      return {
        ...state,
        fetch_product_state: {
          isLoading: false,
          error: 'Something went wrong!',
          data: [],
        },
      }

    default:
      return state
  }
}

export default reducer
