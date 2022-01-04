import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='container errorContent'>
      <h1>
        <span className='err_code'>401</span>
        <span>
          YOU DO NOT HAVE PERMISSION TO ACCESS THIS ROUTE!{' '}
          <Link to='/signin'>Login</Link> as{' '}
          <span style={{ color: '#ef3f49', display: 'inline' }}>
            Administrator
          </span>{' '}
          to access resource or <Link to='/'>Go back to home page</Link>
        </span>
      </h1>
    </div>
  )
}

export default Error
