import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
// import '../../assets/css/all.min.css';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { toast } from 'react-toastify';
import Loader from "../UI/Loader/Loader";
import { useParams } from 'react-router-dom';
import noFilterIocnImg from "../../assets/images/icons-filter/icon-01.png";
toast.configure();
function FilterComponent({ handleSetKeywords }) {
  const params = useParams();
  const [keywordsList, setkeywordsList] = useState('');
  const [activeKeywords, setactiveKeywords] = useState([]);
  const [isLoading, setIsLoadning] = useState(false);
  let result = [];
  let keywordData;
  let activeKeywordsData = [];

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
    handleSetKeywords(activeKeywords);
    for (let i = 0; i < activeKeywords.length; i++) {
      result[i] = keywordsList.find(x => x.id === activeKeywords[i]);
    }
    localStorage.setItem("keywordData", JSON.stringify(result));
  };

  const getKeywordsData = () => {
    setIsLoadning(true);
    const url = getUrl('getKeywordsDetails');
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setkeywordsList(data);
              let keywordsData = JSON.parse(localStorage.getItem("keywordData"))
              if (keywordsData === null) {
                data.map((item) => {
                  if (item.keyword === params.keyword) {
                    activeKeywords.push(item.id);
                    setactiveKeywords(activeKeywords);
                  }
                  return item;
                })
              }
              else if (keywordsData !== undefined || keywordsData !== null) {
                keywordData = JSON.parse(localStorage.getItem("keywordData"));
                for (let i = 0; i < keywordData.length; i++) {
                  activeKeywordsData.push(keywordData[i].id);
                }
                setactiveKeywords(activeKeywordsData);
                handleSetKeywords(activeKeywordsData);
                if (keywordData.length === 0) {
                  setkeywordsList(data);
                }
              }
            }
            break;
          case 400:
            toast.error(message);
            break;
          default:
            toast.error(message);
        }
      })
      .catch((error) => {
        setIsLoadning(false);
        toast.error(error);
      });
  };

  const selectAllCategory = () => { setactiveKeywords([]); handleSetKeywords([]); localStorage.setItem("keywordData", ""); activeKeywordsData.push(""); }

  useEffect(() => {
    getKeywordsData();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="filter-category-root-div">
        <div className="filter-category-inner">
          <ul className="filter-list-ul">
            <li className={activeKeywords.length === 0 ? 'active' : ''}>
              <Link to="#" className="filter-link" onClick={selectAllCategory}>
                All
                {/* {activeKeywords.length === 0 ? (
                  <span className="cancel-icon-span">
                    <i className="fe fe-x cross-icon"></i>
                  </span>
                ) : (
                  ''
                )} */}
              </Link>
            </li>
            {keywordsList.length > 0 &&
              keywordsList.map((data) => {
                return (
                  <li
                    className={`${activeKeywords.includes(data.id) ? 'active' : ''}`}
                    key={data.id}
                    onClick={(e) => {
                      handleKeywordSelect(e, data.id);
                    }}
                  >
                    <Link to="#" className="filter-link">
                      <span className="icon-img-span">
                        <img src={data.image === null || data.image === undefined || data.image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? noFilterIocnImg : data.image} alt="img" className="img-fluid" />
                      </span>
                      <span className="span-text">
                        {data.keyword}
                      </span>

                      {/* {activeKeywords.includes(data.id) ? (
                        <span className="cancel-icon-span">
                          <i className="fe fe-x cross-icon"></i>
                        </span>
                      ) : (
                        ''
                      )} */}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FilterComponent;

FilterComponent.propTypes = {
  handleSetKeywords: PropTypes.func,
};
