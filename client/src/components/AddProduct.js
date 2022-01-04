import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import A from '../css/AddProduct.module.css'
import { handleAddProducts, handleEdit } from '../redux/reducers/adminProducts'

const AddProduct = props => {
  const ID = props.location.search.split('=')[1]
  const { productsData, notification } = useSelector(state => state.addProds)
  const dispatch = useDispatch()

  const handleChange = ({ target: { name, value } }) =>
    dispatch({ type: 'SET_PRODUCTS_VALUE', payload: { [name]: value } })

  const calcDiscountPrice = e => {
    const newPrice =
      productsData.price -
      (parseInt(e.target.value) / 100) * parseInt(productsData.price)
    dispatch({ type: `SET_DISCOUNT_PRICE`, payload: newPrice })
  }

  const handleFileUpload = e => {
    if (e.target.files && e.target.files[0]) {
      dispatch({
        type: 'SET_PRODUCT_IMAGE',
        payload: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData()
    Object.keys(productsData).map(k => data.append(k, productsData[k]))
    dispatch(handleAddProducts(data, ID)).then(() =>
      props.history.replace(`/admin`)
    )
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: `CLOSE_NOTIFICATION` })
    }, 3000)
  }, [notification.isNotificationOn])

  useEffect(() => ID && dispatch(handleEdit(ID)), [ID])

  return (
    <>
      <h3>Add new product</h3>
      {notification.isNotificationOn && (
        <div
          className={A.alertBox}
          style={{ backgroundColor: notification.alertBGCol }}
        >
          {notification.alertMsg}
        </div>
      )}

      <form id={A.addProductsForm} onSubmit={handleSubmit}>
        <div className={A.form_group}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={productsData.title}
            required
            onChange={handleChange}
          />
        </div>

        <div className={A.form_group}>
          <label htmlFor='slug'>Slug</label>
          <input
            type='text'
            name='slug'
            value={productsData.slug}
            required
            onChange={handleChange}
          />
        </div>

        <div className={A.form_group}>
          <label htmlFor='desc'>Description</label>
          <textarea
            name='description'
            value={productsData.description}
            onChange={handleChange}
            id='desc'
            cols='30'
            required
            rows='10'
          ></textarea>
        </div>

        <div className={A.form_group}>
          <label htmlFor='niche'>Niche</label>
          <select
            name='niche'
            id='niche'
            required
            value={productsData.niche}
            onChange={handleChange}
          >
            <option value='iphones'>iphones</option>
            <option value='macbooks'>macbooks</option>
            <option value='rolex'>rolex</option>
          </select>
        </div>

        <div className={A.form_group}>
          <label htmlFor='category'>Category</label>
          <select
            name='category'
            id='category'
            required
            value={productsData.category}
            onChange={handleChange}
          >
            <option value='featured'>Featured</option>
            <option value='bestseller'>Bestseller</option>
            <option value='normal'>Normal</option>
          </select>
        </div>

        <div className={A.form_group}>
          <label htmlFor='title'>Price</label>
          <input
            type='text'
            name='price'
            value={productsData.price}
            required
            onChange={handleChange}
          />
        </div>

        <div className={A.form_group}>
          <label htmlFor='dod'>Deal of Day?</label>
          <select
            name='DOD'
            id='dod'
            required
            value={productsData.DOD}
            onChange={handleChange}
          >
            <option value='select'>select</option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>

        {productsData.DOD === 'Yes' && productsData.price && (
          <div className={A.form_group}>
            <label htmlFor='discount'>Discount</label>
            <input
              type='text'
              id='discount'
              placeholder='enter deal of day discount in percent'
              name='discount'
              value={productsData.discount}
              onChange={handleChange}
              onBlur={calcDiscountPrice}
              required
            />
          </div>
        )}

        {productsData.DOD === 'Yes' && productsData.discount && (
          <div className={A.form_group}>
            <label htmlFor='discountPrice'>Discount price</label>
            <input
              type='text'
              value={
                productsData.DOD === 'No' ? '' : productsData.discountPrice
              }
              id='discountPrice'
              name='discountPrice'
            />
          </div>
        )}

        <div className={A.form_group}>
          <label htmlFor='rating'>Rating</label>
          <input
            type='text'
            name='rating'
            value={productsData.rating}
            required
            onChange={handleChange}
          />
        </div>

        <div className={A.form_group}>
          <label htmlFor='stockCount'>Stock count</label>
          <input
            type='text'
            name='stockCount'
            value={productsData.stockCount}
            required
            onChange={handleChange}
          />
        </div>

        <div className={A.form_group}>
          <label htmlFor='productImg'>Upload product image</label>
          <input
            type='file'
            name='originalImg'
            onChange={handleFileUpload}
            id='productImg'
          />
        </div>

        <div className={A.form_group}>
          {productsData.image && (
            <div className={A.imgContainer}>
              <img src={productsData.image} alt='productImage' />
            </div>
          )}
        </div>

        <div className={A.form_group}>
          <button className={A.btn}>submit</button>
        </div>
      </form>
    </>
  )
}

export default withRouter(AddProduct)
