import React, { useState } from 'react';
import ExclusiveCoursePopUpMpdalComponent from '../../ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
import UserHomeBannerComponent from '../UserHomeComponent/UserHomeBannerComponent';
import ListOfClasses from './ListOfClasses';

function UserClassesComponent() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchInput, setsearchInput] = useState('');
  const [isModalActive, setisModalActive] = useState(false);

  const handleSetKeywords = (keywordData) => {
    const searchKey = keywordData === "" ? "" : keywordData.toString();
    setSearchKeyword(searchKey);
  };

  const handleSearchInput = (searchResult) => {
    setsearchInput(searchResult);
  }

  const getUserPlans = () => {
    setisModalActive(false);
  };

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  };

  return (
    <>
      <UserHomeBannerComponent
        handleSetKeywords={handleSetKeywords}
        handleSearchInput={handleSearchInput}
      />
      <section className="our-card-classes-section search-feed-card-classes-section">
        <ListOfClasses searchKeyword={searchKeyword} searchInput={searchInput} isHandleOpenModal={getUserPlans} />
      </section>
      {isModalActive ? (
          <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
        ) : (
          ''
        )}
    </>
  );
}
export default UserClassesComponent;
