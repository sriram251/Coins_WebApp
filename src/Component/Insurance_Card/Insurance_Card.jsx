import React from 'react'
import { Link } from 'react-router-dom';

import "./Insurance_Card.css"
function InsuranceCard({ scheme }) {
  return (
    <div  key={scheme.scheme_id} className="blog-card">
          <h2 className="blog-title">{scheme.scheme_name}</h2>
          <p className="blog-excerpt">{`${scheme.description.substring(0, 150)}...`}</p>
          <p className="blog-category">{scheme.category && <span className="category-tag">{scheme.category.category_name}</span>}</p>
          <Link to={"/InsuraceScheme/"+scheme.scheme_id} className="read-more">
            View
          </Link>
    </div>
  )
}

export default InsuranceCard