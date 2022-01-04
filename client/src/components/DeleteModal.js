import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import M from '../css/DeleteModal.module.css'
import { confirmProductDelete } from '../redux/reducers/adminProducts'

const DeleteModal = props => {
  const overlay = useRef()
  const dispatch = useDispatch()

  const {
    fetch_product_state: { data },
  } = useSelector(state => state.products)

  const {
    notification: { modalID, deletionStatus },
  } = useSelector(state => state.addProds)

  const product = data.find(el => el._id === modalID)

  const handleClick = e => {
    if (
      e.target.className.startsWith('DeleteModal_overlay') &&
      deletionStatus !== 'initialized' &&
      deletionStatus !== 'completed'
    ) {
      dispatch({ type: 'CLOSE_MODAL' })
      props.history.replace(`/admin`)
    }
  }

  const confirmDelete = () => dispatch(confirmProductDelete(modalID))

  const content = () => {
    switch (deletionStatus) {
      case 'uninitialized':
        return (
          <>
            <h2>Are you sure you want to delete this product?</h2>
            <div className={M.btnContainer}>
              <button
                className={M.btn_1}
                onClick={() => {
                  dispatch({ type: 'CLOSE_MODAL' })
                  props.history.replace(`/admin`)
                }}
              >
                No, Go back
              </button>
              <button className={M.btn_2} onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </>
        )
      case 'initialized':
        return (
          <div className={M.deletionAlert}>
            <h2>Please wait while product is being deleted</h2>
            <div className={M.spinnerContainer}>
              <img src='images/loading.jpg' alt='loading spinner' />
            </div>
          </div>
        )
      case 'completed':
        return (
          <div className={M.deletionAlert}>
            <h2>Product deleted successfully!</h2>
            <div className={M.spinnerContainer}>
              <img src='images/success.png' alt='loading spinner' />
            </div>
            <div className={M.btnContainer}>
              <button
                className={M.reloadBtn}
                onClick={() => {
                  props.history.replace(`/admin`)
                  window.location.reload(true)
                }}
              >
                Go back
              </button>
            </div>
          </div>
        )

      case 'failed':
        return (
          <div className={M.deletionAlert}>
            <h2 style={{ color: 'red' }}>
              Action failed! Please go back and retry.
            </h2>
            <div className={M.btnContainer}>
              <button
                onClick={() => {
                  dispatch({ type: 'CLOSE_MODAL' })
                  props.history.replace(`/admin`)
                }}
              >
                Go back
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={M.overlay} ref={overlay} onClick={handleClick}>
      <div className={M.modalCenter}>
        <div className={M.imgContainer}>
          <img src={product.image} alt={product.title} />
        </div>
        {content()}
      </div>
    </div>
  )
}

export default withRouter(DeleteModal)
