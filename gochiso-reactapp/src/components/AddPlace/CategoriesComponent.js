/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const CategoriesComponent = ({ categories, onClickCatgory, inputRef }) => {
  return (
    <>
      {categories && categories.length > 0 && categories.map((category) => (
        <div className="custom-label-box" key={category.id}>
          <input
            type="checkbox"
            className="custom-control-input d-none"
            id={category.id}
            name={category.name}
            checked={category.is_selected === '1'}
            onClick={(e) => onClickCatgory(e, category.id)}
            ref={inputRef}
          />
          <label className="custom-label" htmlFor={category.id}>
            {category.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default CategoriesComponent;
