import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {
  FaAlignLeft,
  FaShoppingCart,
  FaWindowClose,
  FaUserCheck,
} from 'react-icons/fa'
import { NavLink, Link } from 'react-router-dom'
import NavStyles from '../css/Nav.module.css'
import { printOptions } from '../redux/axiosHelper'

const Nav = props => {
  const {
    User: { isAuthenticated, user },
  } = useSelector(state => state.auth)

  const { cart } = useSelector(state => state.cart)

  const [isShowing, setIsShowing] = useState(false)

  const handleNavDisplay = () => setIsShowing(true)
  const hideNav = () => setIsShowing(false)

  const logoutUser = async () => {
    const res = await axios(printOptions(`GET`, `/api/logout`))
    const { status } = res.data
    if (status === `success`) {
      props.history.replace(`/`)
      window.location.reload(true)
    } else {
      window.alert(`Something went wrong, please try again`)
    }
  }

  useEffect(() => {
    document
      .querySelectorAll(`.Nav_navLink__2iVtu`)
      .forEach(el => el.addEventListener(`click`, () => setIsShowing(false)))
  }, [])

  return (
    <nav className={NavStyles.navbar}>
      <div className={NavStyles.navHeader}>
        <Link to='/'>
          <div className={NavStyles.logoContainer}>
            <img src='/images/logo.jpg' alt='logo' className={NavStyles.logo} />
          </div>
        </Link>
        <div className={NavStyles.navIconsContainer}>
          <FaAlignLeft
            className={NavStyles.navIcon}
            onClick={handleNavDisplay}
          />
          <Link to='/cart'>
            <div className={NavStyles.cartIconContainer}>
              <FaShoppingCart
                className={NavStyles.navIcon}
                id={NavStyles.cartIcon}
              />
              <span className={NavStyles.navAmt}>
                {/* {user ? user.cart.length : 0} */}
                {cart.length}
              </span>
            </div>
          </Link>

          {isAuthenticated && (
            <div className={NavStyles.profileContainer}>
              <FaUserCheck className={NavStyles.navIcon} />
              <p>
                Welcome,{' '}
                <span className='style_this'>
                  {user.username ? user.username : user.name}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={NavStyles.navCenter}>
        <div
          className={NavStyles.navLinksContainer}
          style={{ display: isShowing ? 'grid' : 'none' }}
        >
          <FaWindowClose className={NavStyles.navCloseBtn} onClick={hideNav} />
          <ul className={NavStyles.navUL}>
            <li className={NavStyles.navList}>
              <NavLink to='/' className={NavStyles.navLink}>
                Home
              </NavLink>
            </li>

            <li className={NavStyles.navList}>
              <NavLink to='/shop' className={NavStyles.navLink}>
                Shop
              </NavLink>
            </li>

            <li className={NavStyles.navList}>
              <NavLink to='/' className={NavStyles.navLink}>
                Featured products
              </NavLink>
            </li>

            <li className={NavStyles.navList}>
              <NavLink to='/' className={NavStyles.navLink}>
                Best Sellers
              </NavLink>
            </li>

            {!isAuthenticated && (
              <li className={NavStyles.navList}>
                <NavLink to='/signin' className={NavStyles.navLink}>
                  Sign in
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li
                className={NavStyles.navList}
                id={NavStyles.logoutBtn}
                onClick={logoutUser}
              >
                Sign out
              </li>
            )}

            {isAuthenticated && user.role === 'admin' && (
              <li className={NavStyles.navList}>
                <NavLink to='/admin' className={NavStyles.navLink}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Nav)
