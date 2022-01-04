import React from 'react'
import { Link } from 'react-router-dom'
import M from '../css/LoginModal.module.css'

const LoginModal = ({ closeLoginModal, dispatch }) => {
  return (
    <div className={M.overlay} onClick={closeLoginModal}>
      <div className={M.modalCenter}>
        <span>Oops!</span>
        <h2>You're not logged in. Please login to add items to cart</h2>
        <Link to='/signin' className={M.loginBtn}>
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default LoginModal
