import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { get } from "../../../network/requests";
import { getUrl } from "../../../network/url";
import { toast } from 'react-toastify';
import CategoryFirstComponent from "./CategoryFirstComponent";
import CategorySecondComponent from "./CategorySecondComponent";
import CategoryThirdComponent from "./CategoryThirdComponent";

toast.configure();
function ClassByDifferentCategoriesComponent({ searchKeyword, handleISUpdateKeyword, isKeyword, searchInput }) {
  const [keywordsData, setkeywordsData] = useState([]);

  const getKeywords = () => {
    const url = getUrl("getKeywordsDetails");
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              if (searchKeyword === "" || searchKeyword.length === 0) {
                setkeywordsData(data);
                handleISUpdateKeyword();
              }
              else {
                const commanKeywordIds = data.filter((word) => searchKeyword.includes(word.id));
                setkeywordsData(commanKeywordIds);
                handleISUpdateKeyword();
              }
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch(() => {
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  useEffect(() => {
    getKeywords();
  }, [searchKeyword, isKeyword]);

  return (
    <div className="container container-1200">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          {keywordsData && keywordsData.length >= 3 && <>
            <CategoryFirstComponent keyWord={keywordsData[0]} searchKey={searchInput} />
            <CategorySecondComponent keyWord={keywordsData[1]} searchKey={searchInput} />
            <CategoryThirdComponent keyWord={keywordsData[2]} searchKey={searchInput} />
          </>}
          {keywordsData && keywordsData.length === 2 && <>
            <CategoryFirstComponent keyWord={keywordsData[0]} searchKey={searchInput} />
            <CategorySecondComponent keyWord={keywordsData[1]} searchKey={searchInput} />
          </>}
          {keywordsData && keywordsData.length === 1 && <>
            <CategoryFirstComponent keyWord={keywordsData[0]} searchKey={searchInput} />
          </>}
        </div>
      </div>
    </div>
  );
}

export default ClassByDifferentCategoriesComponent;

ClassByDifferentCategoriesComponent.propTypes = {
  searchKeyword: PropTypes.any,
  handleISUpdateKeyword: PropTypes.func,
  isKeyword: PropTypes.bool,
  searchInput: PropTypes.string
}