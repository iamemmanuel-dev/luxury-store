import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoginModal from '../components/LoginModal'
import Modal from '../components/Modal'
import Nav from '../components/Nav'
import NewsLetter from '../components/NewsLetter'
import Products from '../components/Products'
import ShopFilter from '../components/shopFilter'
import S from '../css/Shop.module.css'
import { Fetch_Products } from '../redux/reducers/productsReducer'

const Shop = () => {
  const dispatch = useDispatch()
  const {
    isModalOpen,
    fetch_product_state: { isLoading, error, data },
  } = useSelector(state => state.products)

  const { isLoginModalOpen } = useSelector(state => state.cart)

  const closeLoginModal = e => {
    if (
      e.target.className?.startsWith(`LoginModal_overlay`) ||
      e.target.className?.startsWith(`LoginModal_loginBtn`)
    ) {
      return dispatch({ type: `CLOSE_LOGIN_MODAL` })
    }
  }

  useEffect(() => {
    dispatch(Fetch_Products())
  }, [])

  return (
    <>
      <Nav />
      <Header />
      <section>
        <div id={S.container}>
          <div className={S.row}>
            <div className={S.col_1}>
              <ShopFilter data={data} />
            </div>
            <div className={S.col_2}>
              <header className={S.col_2_mainHeader}>
                <select>
                  <option value='default'>Default sorting</option>
                  <option value='ascending'>A-Z</option>
                  <option value='descending'>Z-A</option>
                  <option value='price'>sort by price</option>
                </select>

                <h3>Showing all {data.length} products</h3>
              </header>

              <div className={S.productsDisplayRow}>
                {isLoading ? (
                  <div className='spinnerContainer'>
                    <img src='/images/loading.jpg' alt='loading spinner' />
                  </div>
                ) : error ? (
                  <div className='errorAlert'>
                    <h2>{error}</h2>
                  </div>
                ) : (
                  data.map(items => <Products key={items._id} {...items} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsLetter />
      <Footer />
      {isModalOpen && <Modal />}
      {isLoginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}
    </>
  )
}

export default Shop
