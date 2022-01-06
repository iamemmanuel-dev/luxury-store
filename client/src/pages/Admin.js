import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaProductHunt,
  FaDashcube,
  FaList,
  FaSearch,
  FaCaretRight,
  FaCaretLeft,
} from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import AdminAllProducts from '../components/AdminAllProducts'
import Dashboard from '../components/Dashboard'
import Orders from '../components/Orders'
import A from '../css/Admin.module.css'
import DeleteModal from '../components/DeleteModal'
import Nav from '../components/Nav'

const Admin = props => {
  const dispatch = useDispatch()
  const { notification } = useSelector(state => state.addProds)

  const [isDashboardActive, setIsDashboardActive] = useState(false)
  const [isAddProductsActive, setIsAddProductActive] = useState(false)
  const [isOrdersActive, setIsOrdersActive] = useState(false)
  const [isAllProductsActive, setIsAllProductsActive] = useState(false)
  const [active, setActive] = useState('dashboard')
  const [isOpen, setIsOpen] = useState(false)

  const panel = useRef()

  const handleToggle = () => {
    panel.current.classList.toggle('togglePanel')
    setIsOpen(!isOpen)
  }

  const handlePanelLinkClick = e => {
    document
      .querySelectorAll(`.Admin_col_1_content_list__2JppZ`)
      .forEach(el => {
        el.classList.remove(`active_`)
        e.currentTarget.classList.add(`active_`)
      })

    setActive(e.currentTarget.dataset.id)
  }

  const handleClickToEdit = () => {
    dispatch({ type: `EDIT_ON` })
    document
      .querySelectorAll(`.Admin_col_1_content_list__2JppZ`)
      .forEach(el => {
        el.classList.remove(`active_`)
        document.getElementById('addProducts').click()
      })
  }

  const handleClickToDelete = id => {
    dispatch({ type: `OPEN_MODAL`, payload: id })
  }

  useEffect(() => {
    switch (active) {
      case 'dashboard':
        setIsDashboardActive(true)
        setIsAddProductActive(false)
        setIsOrdersActive(false)
        setIsAllProductsActive(false)
        break
      case 'addProducts':
        setIsAddProductActive(true)
        setIsOrdersActive(false)
        setIsDashboardActive(false)
        setIsAllProductsActive(false)
        break
      case 'order':
        setIsOrdersActive(true)
        setIsDashboardActive(false)
        setIsAddProductActive(false)
        setIsAllProductsActive(false)
        break
      case 'products':
        setIsAllProductsActive(true)
        setIsOrdersActive(false)
        setIsDashboardActive(false)
        setIsAddProductActive(false)
    }
  }, [active])

  return (
    <>
      <Nav />
      <section id={A.adminArea}>
        <div className={A.container}>
          <div className={A.col_1} ref={panel}>
            <div className={A.logoContainer}>
              <h1>Luxury-buy</h1>
            </div>
            <div className={A.col_1_content}>
              <ul className={A.col_1_content_UL}>
                <li
                  className={`${A.col_1_content_list} active_`}
                  onClick={handlePanelLinkClick}
                  data-id='dashboard'
                >
                  <div className={A.col_1_iconContainer}>
                    <FaDashcube />
                  </div>
                  <p>Dashboard</p>
                </li>

                <li
                  className={A.col_1_content_list}
                  onClick={handlePanelLinkClick}
                  data-id='addProducts'
                  id='addProducts'
                >
                  <div className={A.col_1_iconContainer}>
                    <FaProductHunt />
                  </div>
                  <p>
                    {' '}
                    {`${
                      notification.isEditOn ? 'Edit product' : 'Add products'
                    }`}
                  </p>
                </li>

                <li
                  className={A.col_1_content_list}
                  onClick={handlePanelLinkClick}
                  data-id='products'
                >
                  <div className={A.col_1_iconContainer}>
                    <FaProductHunt />
                  </div>
                  <p>Products</p>
                </li>

                <li
                  className={A.col_1_content_list}
                  onClick={handlePanelLinkClick}
                  data-id='order'
                >
                  <div className={A.col_1_iconContainer}>
                    <FaList />
                  </div>
                  <p>Orders</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={A.col_2}>
            <div className={A.toggleBtn} onClick={handleToggle}>
              {isOpen ? <FaCaretLeft /> : <FaCaretRight />}
            </div>
            <header>
              <h2>
                Welcome, <span className={A.adminName}>Emmanuel</span>
              </h2>
              <div className={A.headRight}>
                <form className={A.dashboardForm}>
                  <div className={A.searchContainer}>
                    <input
                      type='text'
                      className={A.searchInput}
                      placeholder='search for products..'
                    />
                    <FaSearch />
                  </div>

                  <div className={A.profileImgContainer}>
                    <label htmlFor='file'>
                      <div className={A.imgContainer}>
                        <img src='/images/girl.jpeg' alt='admin image' />
                      </div>
                    </label>
                    <input type='file' id='file' className={A.fileInput} />
                  </div>
                </form>
              </div>
            </header>

            <div className={A.col_2_content}>
              {isDashboardActive && <Dashboard />}
              {isAddProductsActive && <AddProduct />}
              {isOrdersActive && <Orders />}
              {isAllProductsActive && (
                <AdminAllProducts
                  handleClick={handleClickToEdit}
                  handleDelete={handleClickToDelete}
                />
              )}
            </div>
          </div>
        </div>
        {notification.isModalOpen && <DeleteModal />}
      </section>
    </>
  )
}

export default withRouter(Admin)
