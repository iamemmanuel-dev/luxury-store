import React from 'react'
import { FaTruckMoving, FaWarehouse, FaHandshake, FaStar } from 'react-icons/fa'
import D from '../css/Delivery.module.css'

const DeliveryInfo = () => {
  return (
    <div className={D.deliverySection}>
      <div className='container'>
        <div className={D.deliveryCenter}>
          <div className={D.deliveryBox}>
            <div className={D.deliveryIconContainer}>
              <FaTruckMoving />
            </div>
            <h3>Free shipping</h3>
          </div>

          <div className={D.deliveryBox}>
            <div className={D.deliveryIconContainer}>
              <FaWarehouse />
            </div>
            <h3>Great handling</h3>
          </div>

          <div className={D.deliveryBox}>
            <div className={D.deliveryIconContainer}>
              <FaHandshake />
            </div>
            <h3>Great return policy</h3>
          </div>

          <div className={D.deliveryBox}>
            <div className={D.deliveryIconContainer}>
              <FaStar />
            </div>
            <h3>100% satisfaction</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryInfo
