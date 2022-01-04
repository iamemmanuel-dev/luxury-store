import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FP from '../css/Featured.module.css'
import { FaStar } from 'react-icons/fa'

const FeaturedProducts = ({ data }) => {
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
    <section>
      <div className='container'>
        <div className='titleContainer'>
          <h2>
            {' '}
            <span className='style_this'>Featured</span> Products
          </h2>
        </div>

        <article
          className={FP.productsContainer}
          ref={productsContainer}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          <div className={FP.productsCenter} ref={productsCenter}>
            {data
              .filter(items => items.category === 'featured')
              .map(items => (
                <div className={FP.productShow} key={items._id}>
                  <Link to={`/product/${items._id}`}>
                    <>
                      <div className={FP.productImgBox}>
                        <img
                          src={items.image}
                          alt='product image'
                          className={FP.productImg}
                        />
                      </div>

                      <h3 className={FP.productTitle}>{items.title}</h3>
                    </>
                  </Link>
                  <div className={FP.ratingContainer}>
                    {new Array(+items.rating).fill().map((_, i) => (
                      <FaStar style={{ color: 'goldenrod' }} key={i} />
                    ))}
                  </div>
                  <div className={FP.productShowFooter}>
                    <button
                      className={FP.addToCartBtn}
                      onClick={() => alert('Hello')}
                    >
                      Add to cart
                    </button>
                    <h4 className={FP.price}>${items.price}</h4>
                  </div>
                </div>
              ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default FeaturedProducts
