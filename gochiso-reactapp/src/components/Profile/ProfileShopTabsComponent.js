/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ImageElement from '../../UI/ImageElement';

function NavTab(data) {
  return (
    <li className="nav-item">
      <Link
        className={data.linkClassName}
        data-toggle="tab"
        to="#"
        onClick={data.linkOnClick}
      >
        {data.linkTitle}
      </Link>
    </li>
  );
}

function ProfileShopTabsComponent(props) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [activeTab, setactiveTab] = useState('visited');

  return (
    <>
      <div className="general-tabs-div">
        <div className="general-header-div">
          <ul className="nav nav-tabs">
            <NavTab
              linkClassName={
                activeTab === 'visited' ? 'nav-link active' : 'nav-link'
              }
              linkOnClick={() => setactiveTab('visited')}
              linkTitle={getLangValue(strings.VISITED, lang)}
            />
            <NavTab
              linkClassName={
                activeTab === 'recommendation' ? 'nav-link active' : 'nav-link'
              }
              linkOnClick={() => setactiveTab('recommendation')}
              linkTitle={getLangValue(strings.RECOMMENDATIONS, lang)}
            />
          </ul>
        </div>

        <div className="general-tab-body-div">
          <div className="tab-content">
            {props.visitedRestaurantsData &&
            props.visitedRestaurantsData.length > 0 ? (
              <div
                id="pro-visited-tab"
                className={
                  activeTab === 'visited'
                    ? 'tab-pane fade active show'
                    : 'tab-pane fade'
                }
              >
                <div className="tab-pane-inner-div">
                  <div className="card-listing-box-root">
                    {props.visitedRestaurantsData.map((obj) => (
                      <div className="card-listing-box" key={obj.id}>
                        <div className="card-listing-row">
                          <div className="category-img-thumb">
                            <div className="img-thumb">
                              <Link to={`/${lang}/shop/${obj.id}`} className="link">
                                <ImageElement
                                  src={obj.cover_image_thumb}
                                  className="img-fluid img-responsive"
                                  alt="img"
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="category-content-div">
                            <div className="category-content-row">
                              <div className="category-content-top-div">
                                <h3>
                                  <Link to={`/${lang}/shop/${obj.id}`} className="link">
                                    {obj.name}
                                  </Link>
                                </h3>
                              </div>

                              <div className="card-category-inner">
                                <ul className="card-category-list-ul">
                                  {obj.actionkeywords
                                    .slice(0, 2)
                                    .map((inst) => (
                                      <li key={inst.id}>
                                        <Link to="#" className="list-link">
                                          {inst.name}
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'visited' ? (
                  <div className="empty-state-main-profile-div">
                    <div className="empty-state-root-div">
                      <p>
                        <span className="block">
                          {getLangValue(strings.NO_RESULTS_FOUND, lang)}
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}

            {props.recommendedShopsData &&
            props.recommendedShopsData.length > 0 ? (
              <div
                id="pro-recommendations-tab"
                className={
                  activeTab === 'recommendation'
                    ? 'tab-pane fade active show'
                    : 'tab-pane fade'
                }
              >
                <div className="tab-pane-inner-div">
                  <div className="card-listing-box-root">
                    <InfiniteScroll
                      dataLength={props.recommendedShopsData.length}
                      next={props.nextRecommendedShopData}
                      hasMore
                    >
                      {props.recommendedShopsData.map((inst) => (
                        <div className="card-listing-box" key={inst.id}>
                          <div className="card-listing-row">
                            <div className="category-img-thumb">
                              <div className="img-thumb">
                                <Link to={`/${lang}/shop/${inst.id}`} className="link">
                                  <ImageElement
                                    src={
                                      inst.restaurantData.cover_image ||
                                      inst.userData.user_image
                                    }
                                    className="img-fluid img-responsive"
                                    alt="img"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="category-content-div">
                              <div className="category-content-row">
                                <div className="category-content-top-div">
                                  <h3>{inst.review}</h3>
                                </div>

                                <div className="card-category-inner">
                                  <ul className="card-category-list-ul">
                                    <li style={{ textTransform: 'capitalize' }}>
                                      <Link to="#" className="list-link">
                                        {inst.type}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'recommendation' ? (
                  <div className="empty-state-main-profile-div">
                    <div className="empty-state-root-div">
                      <p>
                        <span className="block">
                          {getLangValue(strings.NO_RESULTS_FOUND, lang)}
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileShopTabsComponent;
