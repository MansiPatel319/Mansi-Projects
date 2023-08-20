/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';

function ShopSummaryComponent({ shopDetails }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      {shopDetails.restaurant
        && shopDetails.restaurant.description && (
          <div className="desc-div">
            <h2>{getLangValue(strings.SUMMARY, lang)}</h2>

            <div className="prag-div">
              <p>{shopDetails.restaurant.description}</p>
            </div>
          </div>
      )}
    </>
  );
}

export default ShopSummaryComponent;
