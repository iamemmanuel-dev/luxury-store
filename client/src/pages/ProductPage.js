import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaHandshake, FaShieldAlt, FaStar } from 'react-icons/fa'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import RelatedProducts from '../components/RelatedProducts'
import ProductPageHeader from '../components/ProductPageHeader'
import S from '../css/ProductPage.module.css'
import { Fetch_Products } from '../redux/reducers/productsReducer'
import NewsLetter from '../components/NewsLetter'

const ProductPage = () => {
  let product
  let relatedProducts

  const { id } = useParams()
  const {
    fetch_product_state: { isLoading, error, data },
  } = useSelector(state => state.products)
  const dispatch = useDispatch()

  if (data.length > 0) {
    product = data.find(el => el._id === id)
    relatedProducts = data.filter(
      el => el._id !== id && el.niche === product.niche
    )
  }

  const getBG = () => {
    switch (product.niche) {
      case 'iphones':
        return `/images/iphoneBG2.jpg`
      case 'macbooks':
        return `/images/macBG4.jpg`
      case 'rolex':
        return `/images/rolexBG1.jpg`
    }
  }

  useEffect(() => {
    dispatch(Fetch_Products())
  }, [])

  return (
    <>
      <Nav />
      {isLoading ? (
        <div className={S.centerItem}>
          <div className={S.spinnerContainer}>
            <img src='/images/loading.jpg' alt='loading spinner' />
          </div>
          <h2>Loading ...</h2>
        </div>
      ) : error ? (
        <div className={S.centerItem}>
          <div className={S.errorContainer}>
            <h2>Something went wrong!</h2>
            <Link to='/shop'>Go back</Link>
          </div>
        </div>
      ) : (
        data.length > 0 && (
          <>
            <ProductPageHeader bg={getBG()} />
            <section>
              <div className='container'>
                <div className={S.row}>
                  <div className={S.col_1}>
                    <div className={S.imgContainer}>
                      <img src={product.image} alt={product.title} />
                    </div>
                  </div>
                  <div className={S.col_2}>
                    <header>
                      <div className={S.titleContainer}>
                        <h3>{product.title}</h3>
                        {new Array(+product.rating).fill().map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p>${product.price}</p>
                    </header>
                    <div className={S.col_2_desc}>
                      <p>{product.description}</p>
                    </div>
                    <div className={S.col_2_shippingDisplay}>
                      <h4>Free shipping</h4>
                      <h4>To US via china post registered air mail</h4>
                      <p>Estimated delivery: 10-14days</p>
                    </div>

                    <div className={S.col_2_btnContainer}>
                      <input type='number' name='productCount' min={1} />
                      <button>Add to cart</button>
                    </div>

                    <div className={S.col_2_guaranteeBox}>
                      <div>
                        <div className={S.iconContainer}>
                          <FaShieldAlt />
                        </div>
                        <div>
                          <h4>60 days protection</h4>
                          <p>Money back guarantee</p>
                        </div>
                      </div>
                      <div>
                        <div className={S.iconContainer}>
                          <FaHandshake />
                        </div>
                        <div>
                          <h4>24/7 Guarantee</h4>
                          <p>Support guarantee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <RelatedProducts relatedProducts={relatedProducts} />
              </div>
            </section>
            <NewsLetter />
            <Footer />
          </>
        )
      )}
    </>
  )
}

export default ProductPage
