import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import A from '../css/AdminAllProd.module.css'
import { Fetch_Products } from '../redux/reducers/productsReducer'

const AdminAllProducts = ({ handleClick, handleDelete }) => {
  const { fetch_product_state } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Fetch_Products())
  }, [])

  return (
    <>
      <table className={A.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {fetch_product_state.isLoading ? (
          <div className='spinnerContainer'>
            <img src='/images/loading.jpg' alt='loading spinner' />
          </div>
        ) : fetch_product_state.error ? (
          <div className='errorAlert'>
            <h2>{fetch_product_state.error}</h2>
          </div>
        ) : (
          <tbody>
            {fetch_product_state.data.map(el => (
              <tr key={el._id}>
                <td>{el.title}</td>
                <td className={A.imgContainer}>
                  <img src={el.image} alt={el.title} />
                </td>
                <td>
                  <Link to={`/admin?id=${el._id}`} onClick={handleClick}>
                    edit
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/admin?id=${el._id}`}
                    onClick={() => handleDelete(el._id)}
                  >
                    delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  )
}

export default AdminAllProducts
