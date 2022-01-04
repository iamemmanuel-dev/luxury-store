import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import D from '../css/dashboard.module.css'
import { populateDashboard } from '../redux/reducers/adminDashboard'

const Dashboard = () => {
  const dashboard = useSelector(state => state.adminDashboard)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(populateDashboard())
  }, [])

  return (
    <div className={D.row}>
      <div className={D.card_1}>
        <h2>
          <span className={D.number}>10</span>
          <span className={D.text}>Products</span>
        </h2>
      </div>
      <div className={D.card_2}>
        <h2>
          <span className={D.number}>4</span>
          <span className={D.text}>Orders</span>
        </h2>
      </div>
      <div className={D.card_3}>
        <h2>
          <span className={D.number}>3</span>
          <span className={D.text}>Completed</span>
        </h2>
      </div>
      <div className={D.card_4}>
        <h2>
          <span className={D.number}>1</span>
          <span className={D.text}>Pending</span>
        </h2>
      </div>
    </div>
  )
}

export default Dashboard
