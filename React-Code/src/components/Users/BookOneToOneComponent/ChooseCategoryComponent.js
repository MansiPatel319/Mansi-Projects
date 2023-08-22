import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
function ChooseCategoryComponent({ creatorKeySkill }) {
  const [activeKeywords, setactiveKeywords] = useState([]);
  const handleKeywordSelect = (e, id) => {
    e.preventDefault();
    if (!activeKeywords.includes(id)) {
      if (activeKeywords.indexOf(id) === -1) {
        activeKeywords.push(id);
      }
    } else {
      let index = activeKeywords.indexOf(id);
      activeKeywords.splice(index, 1);
    }
    setactiveKeywords(activeKeywords);
    // handleSetKeywords(activeKeywords);
  };

  return (
    <React.Fragment>
      <div className="category-control-row">
        <div className="category-inner">
          <ul className="category-list-ul">
            {creatorKeySkill && creatorKeySkill.length > 0 &&
              creatorKeySkill.map((data, i) => {
                return (
                  <li className={`${activeKeywords.includes(data.id) ? 'active' : ''}`} key={i} onClick={(e) => {
                    handleKeywordSelect(e, data.id);
                  }}>
                    <Link to="#" className="filter-link">
                      {data}
                      {/* <span className="cancel-icon-span">
                        <i className="fe fe-x cross-icon"></i>
                      </span> */}
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

export default ChooseCategoryComponent;

ChooseCategoryComponent.propTypes = {
  creatorKeySkill: PropTypes.array,
  handleSetKeywords: PropTypes.func
}
