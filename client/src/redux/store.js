import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import dashboardReducer from './reducers/adminDashboard'
import addProductsReducer from './reducers/adminProducts'
import authReducer from './reducers/authReducer'
import productsReducer from './reducers/productsReducer'
import cartReducer from './reducers/cartReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  addProds: addProductsReducer,
  products: productsReducer,
  cart: cartReducer,
  adminDashboard: dashboardReducer,
})

export default createStore(rootReducer, applyMiddleware(reduxThunk))
