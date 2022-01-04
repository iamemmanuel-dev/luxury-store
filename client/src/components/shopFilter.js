import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import S from '../css/shopFilter.module.css'
import { formatPrice } from './Helpers/FormatPrice'

const ShopFilter = ({ data }) => {
  const categories = [
    `All`,
    ...new Set(
      data.map(items => (items.niche === '' ? 'iphones' : items.niche))
    ),
  ]
  const DOD = data.filter(el => el.DOD === 'Yes')

  return (
    <div className={S.content}>
      <h2>SHOP</h2>
      <div className={S.breadCrumb}>
        <Link to='/'>Home</Link> / Shop
      </div>

      <div className={S.categoryContainer}>
        <h3>Categories</h3>

        <div className={S.filterBtnsContainer}>
          {categories.length > 2 &&
            categories.map((items, i) => (
              <div className={S.form_group} key={i}>
                <input type='radio' id={items} name='category' />
                <label htmlFor={items}>{items}</label>
              </div>
            ))}
        </div>

        <div className={S.DOD}>
          <h3>
            <span className='style_this'>Deals</span> of the day!
          </h3>
          <ul className={S.DOD_content}>
            {DOD.length > 0 ? (
              DOD.map(items => (
                <li className={S.DOD_list} key={items._id}>
                  <div className={S.DOD_imgContainer}>
                    <img src={items.image} alt={items.title} />
                    <div className={S.DOD_tag}>{items.discount}% off!</div>
                  </div>
                  <div className={S.DOD_info}>
                    <p className={S.DOD_title}>{items.title}</p>
                    <p className={S.DOD_price}>
                      <span className={S.DOD_price_stale}>
                        {formatPrice(items.price)}
                      </span>
                      <span className={S.DOD_price_now}>
                        {formatPrice(items.discountPrice)}
                      </span>
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <h3>No deal of the day</h3>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ShopFilter
