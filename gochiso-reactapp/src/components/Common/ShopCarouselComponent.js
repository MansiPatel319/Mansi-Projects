/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CategoryListingComponent from './CategoryListingComponent';

function ShopCarouselComponent({
  className,
  id,
  carouselKey,
  items,
  margin,
  smartSpeed,
  navText,
  responsive,
  dashboardCarouselData }) {
  return (
    <OwlCarousel
      className={className}
      id={id}
      key={carouselKey}
      loop={false}
      items={items}
      margin={margin}
      smartSpeed={smartSpeed}
      nav
      navText={navText}
      dots={false}
      dotsEach
      slideBy={4}
      responsiveClass
      responsive={responsive}
    >
      { dashboardCarouselData
         && dashboardCarouselData.map((obj) => (
           <div key={obj.id} className="item">
             <div className="category-slider-box">
               <CategoryListingComponent
                 shopId={obj.id}
                 imgSrc={obj.cover_image_thumb}
                 catTitle={obj.name}
                 rating={obj.google_ratings}
                 sust_keywords={obj.keywords}
                 shop_keywords={obj.shopkeywords}
               />
             </div>
           </div>
         ))}
    </OwlCarousel>
  );
}

export default ShopCarouselComponent;
