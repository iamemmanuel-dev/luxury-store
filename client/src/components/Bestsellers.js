import React, { useRef, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import BestSeller from '../css/Bestsellers.module.css'

const Bestsellers = ({ data }) => {
  const productsContainer = useRef()
  const productsCenter = useRef()

  let isPressedDown = false
  let cursorXSpace

  const handleMouseDown = e => {
    isPressedDown = true
    cursorXSpace = e.nativeEvent.offsetX - productsCenter.current.offsetLeft
  }

  const handleMouseMove = e => {
    if (!isPressedDown) return
    e.preventDefault()
    productsCenter.current.style.left = `${
      e.nativeEvent.offsetX - cursorXSpace
    }px`

    boundProductsContainer()
  }

  const handleMouseUp = () => {
    isPressedDown = false
  }

  const boundProductsContainer = () => {
    const productsContainer_rect =
      productsContainer.current.getBoundingClientRect()
    const productsCenter_rect = productsCenter.current.getBoundingClientRect()

    if (parseInt(productsCenter.current.style.left) > 0) {
      productsCenter.current.style.left = 0
    } else if (productsCenter_rect.right < productsContainer_rect.right) {
      productsCenter.current.style.left = `-${
        productsCenter_rect.width - productsContainer_rect.width
      }px`
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  return (
    <section id={BestSeller.section}>
      <div className='container'>
        <div className='titleContainer'>
          <h2>
            Best <span className='style_this'>Sellers</span>
          </h2>
        </div>
        <div className={BestSeller.row}>
          <div className={BestSeller.col_1}>
            <h2>
              Our <span className='style_this'>best</span> sellers for the week
            </h2>
          </div>
          <article
            className={BestSeller.productsContainer}
            ref={productsContainer}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <div className={BestSeller.productsCenter} ref={productsCenter}>
              {data
                .filter(items => items.category === 'bestseller')
                .map(items => (
                  <div className={BestSeller.productShow} key={items._id}>
                    <div className={BestSeller.productImgBox}>
                      <img
                        src={items.image}
                        alt='product image'
                        className={BestSeller.productImg}
                      />
                    </div>

                    <h3 className={BestSeller.productTitle}>{items.title}</h3>
                    <div className={BestSeller.ratingContainer}>
                      {new Array(+items.rating).fill().map((_, i) => (
                        <FaStar style={{ color: 'goldenrod' }} key={i} />
                      ))}
                    </div>
                    <div className={BestSeller.productShowFooter}>
                      <button className={BestSeller.addToCartBtn}>
                        Add to cart
                      </button>
                      <h4 className={BestSeller.price}>${items.price}</h4>
                    </div>
                  </div>
                ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Bestsellers
