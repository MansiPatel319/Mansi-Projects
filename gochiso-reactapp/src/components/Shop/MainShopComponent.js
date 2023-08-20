/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShopBannerComponent from './ShopBannerComponent';
import '../../assets/css/shop-style.css';
import ShopMiddleComponent from './ShopMiddleComponent';
import HeaderComponent from '../Header/HeaderComponent';
import { getUrl } from '../../network/urls';
import { get } from '../../network/requests';
import Loader from '../../UI/Loader/Loader';

toast.configure();

function MainShopComponent() {
  const params = useParams();
  const [shopDetailsData, setshopDetailsData] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const getShopDetailsData = () => {
    setisLoading(true);
    const url = getUrl('restaurant-details');
    return get(
      `${url}lang=${lang}&restaurant_id=${
        params.id
      }&api_token=${localStorage.getItem('token')}`,
      false,
    )
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              setshopDetailsData(data);
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
        setisLoading(false);
        const { message } = error;
        toast.error(message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    getShopDetailsData();
  }, [lang]);

  return (
    <>
      {isLoading && <Loader />}
      {shopDetailsData && (
        <div id="wrapper" className="wrapper shop-wrapper w-100">
          {lang === 'en' ? (
            <Helmet>
              <title>{shopDetailsData.restaurant.name}</title>
              <meta
                name="description"
                content={shopDetailsData.restaurant.description}
              />
            </Helmet>
          ) : (
            <Helmet>
              <title>{shopDetailsData.restaurant.name}</title>
              <meta
                name="description"
                content={shopDetailsData.restaurant.description}
              />
            </Helmet>
          )}
          <HeaderComponent withSearch />
          <div className="main-middle-inner-area">
            <ShopBannerComponent shopDetails={shopDetailsData} />
            <section className="shop-content-middle-section">
              <div className="shop-content-middle-div">
                <div className="container container-830">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <ShopMiddleComponent
                        shopDetails={shopDetailsData}
                        getShopDetailsData={getShopDetailsData}
                        setisLoading={setisLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default MainShopComponent;
