import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import HS from '../css/Header_.module.css'

const Header_ = () => {
  return (
    <header id={HS.mainHeader}>
      <div className={HS.headerContent}>
        <div className={HS.iconContainer}>
          <FaTwitter />
          <FaInstagram />
          <FaFacebook />
        </div>
        <h1>
          <span className={HS.mainText}>
            Unbeatable <span className='style_this'>Luxury</span>
          </span>
          <span className={HS.subText}>
            <span
              className='style_this'
              style={{
                fontSize: '2.34rem',
                fontWeight: 'bolder',
              }}
            >
              Discover
            </span>{' '}
            a whole world of luxury, elegance and beauty
          </span>
        </h1>
        <Link to='/shop' className={HS.btn}>
          Shop now
        </Link>
      </div>
    </header>
  )
}

export default Header_
