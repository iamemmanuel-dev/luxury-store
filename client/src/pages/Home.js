import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Bestsellers from '../components/Bestsellers'
import DeliveryInfo from '../components/DeliveryInfo'
import FeaturedProducts from '../components/FeaturedProducts'
import Header_ from '../components/Header_'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Fetch_Products } from '../redux/reducers/productsReducer'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  const dispatch = useDispatch()
  const {
    fetch_product_state: { isLoading, error, data },
  } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(Fetch_Products())
  }, [])

  return (
    <>
      <Nav />
      <Header_ />
      <DeliveryInfo />
      {isLoading ? (
        <div className='spinnerContainer'>
          <img src='/images/loading.jpg' alt='loading spinner' />
        </div>
      ) : error ? (
        <div className='errorAlert'>
          <h2>{error}</h2>
        </div>
      ) : (
        <FeaturedProducts data={data} />
      )}
      <Banner />

      {isLoading ? (
        <div className='spinnerContainer'>
          <img src='/images/loading.jpg' alt='loading spinner' />
        </div>
      ) : error ? (
        <div className='errorAlert'>
          <h2>{error}</h2>
        </div>
      ) : (
        <Bestsellers data={data} />
      )}
      <NewsLetter />
      <Footer />
    </>
  )
}

export default Home
