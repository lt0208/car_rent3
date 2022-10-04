import React from 'react'

const Headers = () => {
  return (
    <div className="card text-center">
  <div className="card-header">
    <ul className="nav nav-pills card-header-pills">
      <li className="nav-item">
        <a className="nav-link" href="/all-cars">All Cars</a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link" href="/all-cars/:available">Available Cars</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="/all-requests">All Requests</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/all-requests/:submitted">Submitted Requests</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="/all-requests/customer/:customerId">Customer Account</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      
    </ul>
  </div>
  
</div>
  )
}

export default Headers;