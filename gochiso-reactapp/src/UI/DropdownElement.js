/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DropdownElement(props) {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const handleOptionSelect = (title) => {
    props.toggle();
    props.setselectedOption(title);
    if (title === 'Recommended' || title === 'おすすめ') {
      props.setrecommended(1);
      props.setnewest(0);
    }
    if (title === 'Newest' || title === '最新') {
      props.setnewest(1);
      props.setrecommended(0);
    }
    if (title === 'Nearest' || title === '最寄') {
      props.setnewest(0);
      props.setrecommended(0);
    }
  };

  return (
    <div
      ref={props.refOutside}
      id={props.divId}
      className={
        props.dropdownToggle
          ? 'dropdown dropselect drop-select-custom show'
          : 'dropdown dropselect drop-select-custom'
      }
    >
      <input type="hidden" name="sorting" value="" />
      <button
        className="btn btn-transparent dropdown-toggle"
        type="button"
        id="sorting-select-btn"
        data-toggle="dropdown"
        aria-expanded="true"
        onClick={props.toggle}
      >
        <span className="dropdown-label">{props.selectedOption}</span>
      </button>
      <div
        className={
          props.dropdownToggle
            ? 'dropdown-menu dropdown-menu-right show'
            : 'dropdown-menu dropdown-menu-right'
        }
        role="menu"
        aria-labelledby="option-post-cleanup"
      >
        <ul>
          {props.shopFilterOptions &&
            props.shopFilterOptions.map((obj) => (
              <li key={obj.id}>
                <Link
                  to="#"
                  className="dropdown-item"
                  data-value="Recommended"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() =>
                    handleOptionSelect(lang === 'en' ? obj.title : obj.title_jp)
                  }
                >
                  {lang === 'en' ? obj.title : obj.title_jp}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownElement;
