/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import setFilterCategoryData from '../../actions/setFilterCategoryData';
import {
  SetPlaceTypeKyword,
} from '../../actions/SetPlaceTypeKyword';
import setSustainKeyword from '../../actions/setSustainKeyword';
import { get } from '../../network/requests';
import { getUrl } from '../../network/urls';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import CheckboxElement from '../../UI/CheckboxElement';
import Loader from '../../UI/Loader/Loader';

toast.configure();

function CategoryFiltersComponent({
  words,
  sustainKeyword,
  setcategoryData,
  setsustainData,
  categoryData,
  sustainData }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const dispatch = useDispatch();
  const placeTypeData = useSelector(
    (state) => state.placeKeyword.placeTypekeyword,
  );
  const [isLoading, setIsLoading] = useState(false);

  const getFilterCategoryData = () => {
    setIsLoading(true);

    const url = getUrl('filter-category-list');
    return get(`${url}lang=${lang}&page_id=add-place`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setIsLoading(false);

        switch (code) {
          case 200:
            if (status === 'true') {
              setcategoryData(data.actionkeywords);
              setsustainData(data.shopkeywords);
            }
            break;
          case 400:
            toast.error(messages, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(
              lang === 'en'
                ? process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_EN
                : process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_JP,
              {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              },
            );
        }
      })
      .catch((error) => {
        setIsLoading(false);

        const { message } = error;
        toast.error(message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleCategorySelect = (id) => {
    const updateKeyword = [...words];
    if (!updateKeyword.includes(id)) {
      if (updateKeyword.indexOf(id) === -1) {
        updateKeyword.length = 0;
        updateKeyword.push(id);
      }
    } else {
      const index = updateKeyword.indexOf(id);
      updateKeyword.splice(index, 1);
    }
    dispatch(setFilterCategoryData(updateKeyword));
  };

  const handleCheckboxSelectPlacetype = (id) => {
    const updatePlaceCheckKeyword = [...placeTypeData];

    updatePlaceCheckKeyword.map((item, i) => {
      if (item.id === id) {
        item.is_selected = !item.is_selected;
        if (item.is_selected) {
          updatePlaceCheckKeyword[i] = item;
        } else {
          updatePlaceCheckKeyword[i] = item;
        }
      }

      return item;
    });
    dispatch(SetPlaceTypeKyword(updatePlaceCheckKeyword));
  };

  const handleCheckboxSelect = (id) => {
    const updateCheckKeyword = [...sustainKeyword];
    if (!updateCheckKeyword.includes(id)) {
      if (updateCheckKeyword.indexOf(id) === -1) {
        updateCheckKeyword.push(id);
      }
    } else {
      const indexCheck = updateCheckKeyword.indexOf(id);
      updateCheckKeyword.splice(indexCheck, 1);
    }
    dispatch(setSustainKeyword(updateCheckKeyword));
  };
  useEffect(() => {
    getFilterCategoryData();
  }, [lang]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="col-bx filter-map-col mobile-hidden-mm">
        <div className="filter-map-div">
          <div
            className="filter-map-inner-div wow fadeInLeft"
            data-wow-duration="2s"
          >
            <div className="category-filter-map-box">
              <div className="cf-map-box-header-div">
                <h2>{getLangValue(strings.MAP_CATEGORY, lang)}</h2>
              </div>

              <div className="cf-map-box-body-div">
                <div className="filter-new-list-div">
                  <ul className="filter-new-list-ul">
                    <li className={words.length === 0 ? 'active' : ''}>
                      <button
                        type="button"
                        className="filter-link"
                        onClick={() => dispatch(setFilterCategoryData([]))}
                      >
                        {getLangValue(strings.ALL, lang)}
                      </button>
                    </li>

                    {categoryData
                    && categoryData.map((obj) => (
                      <li
                        key={obj.id}
                        className={words.includes(obj.id) ? 'active' : ''}
                      >
                        <button
                          type="button"
                          className="filter-link"
                          onClick={() => handleCategorySelect(obj.id)}
                        >
                          <span className="span-text">{obj.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="category-ss-map-box">
              <div className="cf-map-box-header-div">
                <h2>{getLangValue(strings.MAP_PLACETYPE, lang)}</h2>
              </div>

              <div className="cf-map-box-body-div">
                <div className="custom-checkbox-root-div">
                  {placeTypeData
                  && placeTypeData.length > 0
                  && placeTypeData.map((obj) => (
                    <div
                      key={obj.id}
                      className="custom-control custom-checkbox custom-checkbox-new"
                    >

                      <CheckboxElement
                        inputClassName="custom-control-input"
                        inputId={obj.id}
                        inputName="Placetype"
                        checked={obj.is_selected}
                        labelClassName="custom-control-label"
                        labelHtmlFor={obj.id}
                        labelText={getLangValue(obj.name, lang)}
                        onSelect={() => handleCheckboxSelectPlacetype(obj.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="category-ss-map-box">
              <div className="cf-map-box-header-div">
                <h2>{getLangValue(strings.MAP_SUST_CATEGORY, lang)}</h2>
              </div>

              <div className="cf-map-box-body-div">
                <div className="custom-checkbox-root-div">
                  {sustainData
                  && sustainData.map((obj, index) => (
                    <div
                      key={obj.id}
                      className="custom-control custom-checkbox custom-checkbox-new"
                    >
                      <CheckboxElement
                        inputClassName="custom-control-input"
                        inputId={`custom-checkbox-ss0${index + 10000}`}
                        inputName="sustainability"
                        labelClassName="custom-control-label"
                        labelHtmlFor={`custom-checkbox-ss0${index + 10000}`}
                        labelText={obj.name}
                        onSelect={() => handleCheckboxSelect(obj.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryFiltersComponent;
