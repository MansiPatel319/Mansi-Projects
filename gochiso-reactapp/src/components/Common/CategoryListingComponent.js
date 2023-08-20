/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import setSearchKeyword from '../../actions/searchKeyword';
import images from '../../resources/images';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ImageElement from '../../UI/ImageElement';
import ListElement from '../../UI/ListElement';

function CategoryListingComponent({
  shopId,
  imgSrc,
  catTitle,
  rating,
  sust_keywords,
  shop_keywords,
  withDistance,
  filterplace,
  distance,
  walk_time,
  cycle_time }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleWordClick = (e, word) => {
    e.preventDefault();
    const data = {
      query: word,
    };
    dispatch(setSearchKeyword(data));
    history.push(`/${lang}/map`);
  };
  return (
    <>
      <div className="category-img-thumb">
        <div className="img-thumb">
          <Link to={`/${lang}/shop/${shopId}`} className="link">
            <ImageElement
              src={imgSrc}
              className="img-fluid img-responsive"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="category-content-div">
        <div className="category-content-row">
          <div className="category-content-top-div">
            <div className="category-content-top-left">
              <h3>
                <Link to={`/${lang}/shop/${shopId}`} className="link">
                  { catTitle}
                </Link>
              </h3>
            </div>
            <div className="category-content-top-right">
              <div className="rating-div">
                <span className="icon-span">
                  <ImageElement
                    src={images.GoogleLogo}
                    className="img-fluid"
                    alt="icon"
                  />
                </span>
                <span className="text">
                  { rating
                    ? parseFloat(rating).toPrecision(2)
                    : 'NA'}
                </span>
              </div>
            </div>
          </div>

          <div className="card-category-inner">
            <ul className="card-category-list-ul">
              { sust_keywords
                 && sust_keywords
                   .slice(0, 3)
                   .map((word) => (
                     <ListElement
                       key={word.id}
                       className="list-link"
                       word={word.name}
                       onWordClick={handleWordClick}
                     />
                   ))}
              { shop_keywords
                 && shop_keywords
                   .slice(0, 2)
                   .map((word) => (
                     <ListElement
                       key={word.id}
                       className="list-link"
                       word={lang === 'en' ? word.name.en : word.name.jp}
                       onWordClick={handleWordClick}
                     />
                   ))}
            </ul>
          </div>

          { withDistance && (
            <div className="card-bottom-cate-inner">
              <ul className="card-bottom-cate-list-ul">
                { filterplace === 'online-store' ? (
                  <li>
                    <div className="list-div">
                      <span className="span-text">
                        {getLangValue(strings.ONLINE_STORE_1, lang)}
                      </span>
                    </div>
                  </li>

                ) : (
                  <>

                    <li>
                      <div className="list-div">
                        <span className="span-icon">
                          <span className="bg-custom-icon placeholder-icon" />
                        </span>
                        <span className="span-text">
                          { distance === 'NA'
                            ? distance
                            : `${distance} ${getLangValue(
                              strings.AWAY,
                              lang,
                            )}`}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="list-div">
                        <span className="span-icon">
                          <span className="bg-custom-icon pedestrian-man-icon" />
                        </span>
                        <span className="span-text">
                          { walk_time === 'NA'
                            ? walk_time
                            : `${walk_time} ${getLangValue(
                              strings.MINS,
                              lang,
                            )}`}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="list-div">
                        <span className="span-icon">
                          <span className="bg-custom-icon bicycle-icon" />
                        </span>
                        <span className="span-text">
                          { cycle_time === 'NA'
                            ? cycle_time
                            : `${cycle_time} ${getLangValue(
                              strings.MINS,
                              lang,
                            )}`}
                        </span>
                      </div>
                    </li>
                    {
                       filterplace === 'both' && (
                       <li>
                         <div className="list-div">
                           <span className="span-text">
                             {getLangValue(strings.ONLINE_STORE_1, lang)}
                           </span>
                         </div>
                       </li>
                       )
                    }
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryListingComponent;
