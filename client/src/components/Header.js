import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom'
import HeaderStyles from '../css/Header.module.css'

const Header = () => {
  return (
    <header id={HeaderStyles.mainHeader}>
      <div className={HeaderStyles.header_row}>
        <div className={HeaderStyles.header_col_1}>
          <h1>
            <span className={HeaderStyles.mainText}>
              Intro<span>ducing</span> <br />
            </span>

            <span className={HeaderStyles.subText}>Luxury Buy</span>

            <p>
              Pre-order with interest free with a $90 <br /> deposit on an
              endless Mobile data plan
            </p>
          </h1>

          <Link to='/shop' className={HeaderStyles.cta}>
            Shop now
          </Link>
        </div>
        <div className={HeaderStyles.header_col_2}>
          <div className={HeaderStyles.banner}>
            <img
              src='/images/iphoneBG1.jpg'
              // src='/images/BG2.jpg'
              className={HeaderStyles.bannerImg}
              alt='image'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
