import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Error from './pages/Error'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Signin from './pages/Signin'
import ProductPage from './pages/ProductPage'
import { getAuthStatus } from './redux/reducers/authReducer'
import { fetchCartItems } from './redux/reducers/cartReducer'

const App = () => {
  const {
    User: { isAuthenticated, user },
  } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthStatus())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user._id))
    }
  }, [user])

  return (
    <Router>
      <Route exact path='/signin'>
        <Signin />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/shop'>
        <Shop />
      </Route>
      <Route exact path='/product/:id'>
        <ProductPage />
      </Route>
      <Route exact path='/cart'>
        <Cart />
      </Route>
      <Route exact path='/checkout'>
        <Checkout />
      </Route>
      <Route exact path='/admin'>
        {/* {isAuthenticated && user.role === 'admin' ? <Admin /> : <Error />} */}
        {isAuthenticated ? <Admin /> : <Error />}
      </Route>
    </Router>
  )
}

export default App
