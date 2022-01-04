import axios from 'axios'
import { printOptions } from '../axiosHelper'

const authState = {
  credentials: {
    username: '',
    password: '',
    confirmedPassword: '',
  },
  User: {
    isAuthenicated: false,
    isLoading: false,
    errorMsg: '',
    user: null,
  },
}

export const Signup_User = data => async dispatch => {
  try {
    const res = await axios(printOptions(`POST`, `/api/signup`, data))
    const { status, message, user } = res.data
    switch (status) {
      case 'fail':
        return dispatch({ type: 'AUTH_FAIL', payload: message, data })
      case 'success':
        return dispatch({ type: 'AUTH_SUCCESS', payload: user })
    }
  } catch (error) {
    console.log(error)
  }
}

export const Signin_User = data => async dispatch => {
  try {
    const res = await axios(printOptions(`POST`, `/api/signin`, data))
    const { status, user } = res.data
    console.log(user)
    if (status === `authorized`)
      dispatch({ type: 'AUTH_SUCCESS', payload: user })
  } catch (error) {
    dispatch({
      type: 'SIGNIN_AUTH_FAIL',
      payload: 'Incorrect username or password',
    })
  }
}

export const getAuthStatus = () => async dispatch => {
  try {
    const res = await axios(printOptions(`GET`, `/api/current_user`))
    const { user } = res.data
    user
      ? dispatch({ type: `SET_USER_AUTH_TRUE`, payload: user })
      : dispatch({ type: `SET_USER_AUTH_FALSE` })
  } catch (err) {
    console.log(err)
  }
}

const authReducer = (state = authState, { type, payload, data }) => {
  switch (type) {
    case 'SET_AUTH_CREDENTIALS':
      return {
        ...state,
        credentials: { ...state.credentials, ...payload },
      }

    case 'AUTH_FAIL':
      return {
        ...state,
        User: {
          ...state.User,
          errorMsg:
            payload === 'existing_username'
              ? `Username "${data.username}" has already been taken. Please choose another.`
              : payload === 'mismatch'
              ? `Passwords do not match, please check credentials and make sure they match.`
              : '',
        },
      }

    case 'AUTH_SUCCESS':
      return {
        ...state,
        User: {
          ...state.User,
          errorMsg: '',
          isAuthenticated: true,
          user: payload,
        },
      }

    case 'SIGNIN_AUTH_FAIL':
      return {
        ...state,
        User: {
          ...state.User,
          errorMsg: payload,
        },
      }

    case 'SET_USER_AUTH_TRUE':
      return {
        ...state,
        User: {
          ...state.User,
          user: payload,
          isAuthenticated: true,
        },
      }

    case 'SET_USER_AUTH_FALSE':
      return {
        ...state,
        User: {
          ...state.User,
          user: null,
          isAuthenticated: false,
        },
      }

    default:
      return state
  }
}

export default authReducer
