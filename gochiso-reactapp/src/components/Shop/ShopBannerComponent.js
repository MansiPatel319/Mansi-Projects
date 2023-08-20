/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ButtonElement from '../../UI/ButtonElement';
import SocialLinkComponent from '../Common/SocialLinkComponent';
import 'owl.carousel/dist/assets/owl.carousel.css';
import ImageElement from '../../UI/ImageElement';

function ShopBannerComponent({ shopDetails }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [bannerImages, setBannerImages] = useState([]);
  useEffect(() => {
    let images = [];
    images.push(shopDetails.restaurant.cover_image);
    images = [...images, ...shopDetails.restaurant.other_image];
    setBannerImages(images);
  }, [shopDetails]);
  return (
    <>

      <section
        className="banner-shop-section"
      >
        <div className="banner-slider-shop-div">
          <div className="banner-slider-shop-inner-div">

            <div className="container container-1030">
              <div className="row">
                <div className="col-lg-12 col-md-12">

                  <div className="shop-banner-slider-root">
                    {
                      bannerImages
                      && bannerImages.length > 0 && (

                      <OwlCarousel
                        className="owl-carousel owl-theme shop-banner-owl"
                        id="category-slider-owl"
                        carouselKey={`carousel_${Math.random()}`}
                        loop={bannerImages.length > 1}
                        nav
                        navText={[
                          '<span class="span-roundcircle left-roundcircle"><span class="bg-custom-icon arrow-left-icon"> </span></span>',
                          '<span class="span-roundcircle right-roundcircle"><span class="bg-custom-icon arrow-right-icon"> </span></span>',
                        ]}
                        dots={bannerImages.length > 1}
                        dotsEach={false}
                        stagePadding={0}
                        margin={2}
                        center
                        autoplay={false}
                        slideSpeed={300}
                        smartSpeed={1000}
                        responsive={{
                          0: {
                            items: 1,
                            nav: false,
                            margin: 2,
                          },
                          600: {
                            items: 1,
                            slideBy: 1,
                          },
                          1000: {
                            items: 1.1,
                            slideBy: 1,
                          },
                          1600: {
                            items: 1.1,
                            slideBy: 1,
                          },
                        }}
                      >
                        {
                          bannerImages.map((item) => (
                            <div className="item">
                              <div className="shop-slider-box">
                                <div className="shop-img-thumb-div">
                                  <ImageElement
                                    src={item}
                                    className="img-fluid img-responsive"
                                    alt="image"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
}
                      </OwlCarousel>
                      )
                    }
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="banner-shop-div">
          <div className="container container-1030">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="banner-shop-root-div">
                  <div className="heading-title-div">
                    <h1>{shopDetails.restaurant.name}</h1>
                  </div>

                  <div className="banner-shop-cate-social-div">
                    <div className="banner-shop-cate-social-row">

                      <div className="bshop-cate-social-left">
                        <ul className="card-category-list-ul">
                          <li>
                            {shopDetails.restaurant.actionkeywords.length > 0 && (
                            <button type="button" className="filter-link">
                              <span
                                className="span-text"
                                style={{ textTransform: 'capitalize' }}
                              >
                                {shopDetails.restaurant.actionkeywords[0].name}
                              </span>
                            </button>
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className="bshop-cate-social-right">
                        {(shopDetails.restaurant.social_instagram
                        || shopDetails.restaurant.social_facebook
                         || shopDetails.restaurant.social_website) && (
                         <div className="social-div">
                           <ul className="social-ul-list">
                             {shopDetails.restaurant.social_website && (
                             <li>
                               <SocialLinkComponent
                                 link={
                     shopDetails.restaurant
                       .social_website
                   }
                                 className="social-link social-globe-link"
                                 spanTag={
                                   <span className="bg-custom-icon globe-icon black-icon" />
                   }
                               />
                             </li>
                             )}
                             {shopDetails.restaurant.social_facebook && (
                             <li>
                               <SocialLinkComponent
                                 link={
                     shopDetails.restaurant
                       .social_facebook
                   }
                                 className="social-link"
                                 spanTag={
                                   <span className="bg-custom-icon facebook-icon black-icon" />
                   }
                               />
                             </li>
                             )}
                             {shopDetails.restaurant
                               .social_instagram && (
                               <li>
                                 <SocialLinkComponent
                                   link={
                     shopDetails.restaurant
                       .social_instagram
                   }
                                   className="social-link"
                                   spanTag={
                                     <span className="bg-custom-icon instagram-icon black-icon" />
                   }
                                 />
                               </li>
                             )}
                           </ul>
                         </div>
                        ) }

                        {shopDetails.restaurant.online_store_url && (

                          <div className="btn-div">
                            <a href={shopDetails.restaurant.online_store_url} target="_blank" rel="noreferrer">
                              <ButtonElement type="button" className="btn btn-transparent-custom" label={getLangValue(strings.ONLINE_STORE, lang)} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default ShopBannerComponent;
