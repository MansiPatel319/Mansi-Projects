/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function ShopCategoryKeywordComponent({ shopDetails }) {
  const keywords = shopDetails.restaurant && [
    ...shopDetails.restaurant.shopkeywords,
    ...shopDetails.restaurant.actionkeywords,
  ];

  return (
    <div className="card-category-custom-div">
      <ul className="card-category-list-ul">
        {keywords
          && keywords.map((obj) => (
            <li key={obj.id}>
              <Link to="#" className="list-link">
                {obj.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ShopCategoryKeywordComponent;
