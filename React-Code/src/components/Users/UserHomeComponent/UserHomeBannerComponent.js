import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FilterComponent from '../../Filter/FilterComponent';
import '../../../assets/css/search-banner-style.css';
import '../../../assets/css/style.css';
import '../../../assets/css/user/user-home-style.css';
function UserHomeBannerComponent({ handleSetKeywords, handleSearchInput }) {
  const userData = useSelector((state) => state.authUser.signupData);
  const [searchInput, setsearchInput] = useState('');

  const handleOnChange = (e) => {
    const { value } = e.target;
    setsearchInput(value);
    handleSearchInput(value);
  };

  return (
    <section className="user-main-banner-section" id="user-main-banner-section">
      <div className="user-main-banner-div">
        <div className="heading-div">
          <div className="container container-970">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="heading-inner-div">
                  <div className="content-root">
                    {userData !== null ? (
                      <h1>{`Hi${
                        userData.first_name === undefined ||
                        userData.first_name === null ||
                        userData.last_name === undefined ||
                        userData.last_name === null ||
                        userData.username === undefined ||
                        userData.username === null
                          ? ''
                          : userData.first_name === '' || userData.last_name === ''
                          ? `, ` + userData.username
                          : ', ' + userData.first_name + ' ' + userData.last_name
                      }`}</h1>
                    ) : (
                      ''
                    )}
                    <p>What do you want to learn today?</p>
                  </div>
                  <div className="search-box-div">
                    <div className="search-box-row">
                      <div className="search-group">
                        <button className="btn btn-search-icon">
                          {' '}
                          <i className="bg-custom-icon search-icon-new"></i>{' '}
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search our classes ..."
                          onChange={handleOnChange}
                          value={searchInput}
                        />
                      </div>
                    </div>
                  </div>
                  <FilterComponent handleSetKeywords={handleSetKeywords} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserHomeBannerComponent;

UserHomeBannerComponent.propTypes = {
  handleSetKeywords: PropTypes.func,
  handleSearchInput: PropTypes.func,
};
