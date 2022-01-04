import React from 'react'
import { Link } from 'react-router-dom'
import R from '../css/Relatedproducts.module.css'

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className={R.relatedProducts}>
      <h2>Related products</h2>
      <div className={R.row}>
        {relatedProducts.map(items => (
          <Link to={`/product/${items._id}`} key={items._id}>
            <div className={R.col}>
              <div className={R.imgContainer}>
                <img src={items.image} alt={items.title} />
              </div>
              <footer>
                <h3>{items.title}</h3>
                <p>${items.price}</p>
              </footer>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
