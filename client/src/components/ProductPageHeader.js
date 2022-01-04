import React from 'react'
import { Link } from 'react-router-dom'
import S from '../css/ProductPageHeader.module.css'

const ProductPageHeader = ({ bg }) => {
  return (
    <header id={S.mainHeader}>
      <div className={S.header_row}>
        <div className={S.header_col_1}>
          <h1>
            <span className={S.mainText}>
              Intro<span>ducing</span> <br />
            </span>

            <span className={S.subText}>Luxury Buy</span>

            <p>
              Pre-order with interest free with a $90 <br /> deposit on an
              endless Mobile data plan
            </p>
          </h1>

          <Link to='/shop' className={S.cta}>
            Go back
          </Link>
        </div>
        <div className={S.header_col_2}>
          <div className={S.banner}>
            <img
              src={bg}
              className={S.bannerImg}
              id={S.bannerImg_1}
              alt='image'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default ProductPageHeader
