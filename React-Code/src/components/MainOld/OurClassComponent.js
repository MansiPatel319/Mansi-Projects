import React, { useState } from 'react';
import '../../assets/css/style.css';
import '../../assets/css/owl-slider-style.css';
import '../../assets/css/feather.min.css';
import FilterComponent from '../Filter/FilterComponent';
import ClassByCreatorComponent from '../ClassByCreatorComponent/ClassByCreatorComponent';

function OurClassComponent() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSetKeywords = (keywordData) => {
    const searchKey = keywordData === "" ? "" : keywordData.toString();
    setSearchKeyword(searchKey);
  };
  return (
    <>
      <section className="our-classes-section" id="our-classes-section">
        <div className="our-classes-div">
          <div className="heading-div">
            <div className="container container-1000">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="heading-inner-div">
                    <h2>Our Classes</h2>
                    <FilterComponent handleSetKeywords={handleSetKeywords} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ClassByCreatorComponent searchKeyword={searchKeyword} />
        </div>
      </section>
    </>
  );
}

export default OurClassComponent;
