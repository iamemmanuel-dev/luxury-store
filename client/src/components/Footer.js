import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa'
import F from '../css/Footer.module.css'
import { printOptions } from '../redux/axiosHelper'

const Footer = props => {
  const { isAuthenticated, user } = useSelector(state => state.auth)

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

  return (
    <footer id={F.globalFooter}>
      <div className='container'>
        <div className={F.row}>
          <div className={F.col_1}>
            <h3>Contact us</h3>
            <ul>
              <li>
                <div className={F.iconContainer}>
                  <FaMapMarkerAlt />
                </div>
                <p>
                  luxury street <br /> Abuja, Nigeria
                </p>
              </li>

              <li>
                <div className={F.iconContainer}>
                  <FaEnvelope />
                </div>
                <p>
                  emmanuelademola20@gmail.com <br /> Response within 24 hours
                </p>
              </li>

              <li>
                <div className={F.iconContainer}>
                  <FaPhone />
                </div>
                <p>(+234) 813 777 3611</p>
              </li>
            </ul>
          </div>
          <div className={F.col_2}>
            <h3>Quick links</h3>
            <ul className={F.navUL}>
              <li className={F.navList}>
                <NavLink to='/' className={F.navLink}>
                  Home
                </NavLink>
              </li>

              <li className={F.navList}>
                <NavLink to='/shop' className={F.navLink}>
                  Shop
                </NavLink>
              </li>

              <li className={F.navList}>
                <NavLink to='/' className={F.navLink}>
                  Featured products
                </NavLink>
              </li>

              <li className={F.navList}>
                <NavLink to='/' className={F.navLink}>
                  Best Sellers
                </NavLink>
              </li>

              {!isAuthenticated && (
                <li className={F.navList}>
                  <NavLink to='/signin' className={F.navLink}>
                    Sign in
                  </NavLink>
                </li>
              )}

              {isAuthenticated && (
                <li className={F.navList} id={F.logoutBtn} onClick={logoutUser}>
                  Sign out
                </li>
              )}

              {isAuthenticated && user.role === 'admin' && (
                <li className={F.navList}>
                  <NavLink to='/admin' className={F.navLink}>
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className={F.col_3}>
            <h3>Connect</h3>
            <div className={F.iconsContainer}>
              <FaInstagram />
              <FaFacebook />
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default withRouter(Footer)
