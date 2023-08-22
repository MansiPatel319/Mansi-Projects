import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function SortingDropdownComponent({ handleSetFilterSearchValue }) {
  const [isDropDown, setisDropDown] = useState(false);
  const [isDataValue, setDataValue] = useState('');
  const classFilterCategories = [{ 'id': 1, 'name': 'Popular', 'value': 'popular' }, { 'id': 2, 'name': 'Newest to Oldest', 'value': 'new_first' }, { 'id': 3, 'name': 'Oldest to Newest', 'value': 'old_first' }];

  const handleSortingButton = () => {
    setisDropDown(!isDropDown);
  };
  const handleOnClick = (name, value) => {
    setDataValue(name);
    handleSetFilterSearchValue(value);
    setisDropDown(false);
  };
  return (
    <React.Fragment>
      <div
        id="sorting-select"
        className={`dropup dropselect drop-select-custom ${isDropDown ? 'show' : ''}`}
      >
        <input type="hidden" name="sorting" value="" />
        <button
          className="btn btn-transaparent dropdown-toggle"
          type="button"
          id="sorting-select-btn"
          data-toggle="dropdown"
          aria-expanded={isDropDown ? 'true' : 'false'}
          onClick={handleSortingButton}
        >
          <span className="bg-custom-icon sort-down-icon"></span>
          <span className="dropdown-label">
            {isDataValue ? isDataValue : <span className="text-hidden">Sorting</span>}
          </span>
        </button>
        <div
          className={`dropdown-menu ${isDropDown ? 'show' : ''}`}
          role="menu"
          aria-labelledby="option-post-cleanup"
        >
          <ul>
            {classFilterCategories.length > 0 && classFilterCategories.map((data, i) => {
              return (
                <li key={i}>
                  <Link
                    to="#"
                    className="dropdown-item"
                    data-value={data.name}
                    role="menuitem"
                    tabIndex="-1"
                    data-selected={isDataValue === data.name ? 'selected' : ''}
                    onClick={() => handleOnClick(data.name, data.value)}
                  >
                    {data.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SortingDropdownComponent;

SortingDropdownComponent.propTypes = {
  handleSetFilterSearchValue: PropTypes.func
}
