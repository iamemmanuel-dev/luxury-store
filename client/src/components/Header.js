import React, { useEffect, useRef } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom'
import HeaderStyles from '../css/Header.module.css'
import Nav from './Nav'

const Header = () => {
  const dotsContainer = useRef()

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
              className={HeaderStyles.bannerImg}
              id={HeaderStyles.bannerImg_1}
              alt='image'
            />
            <img
              src='/images/macBG3.jpg'
              className={HeaderStyles.bannerImg}
              id={HeaderStyles.bannerImg_2}
              alt='image'
            />
            <img
              src='/images/rolex1.jpg'
              className={HeaderStyles.bannerImg}
              id={HeaderStyles.bannerImg_3}
              alt='image'
            />
          </div>

          <div className={HeaderStyles.dotsContainer} ref={dotsContainer}>
            <div className={HeaderStyles.dot}></div>
            <div className={HeaderStyles.dot}></div>
            <div className={HeaderStyles.dot}></div>
            <div className={HeaderStyles.dot}></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
