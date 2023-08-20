/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery.js/dist/css/lightgallery.css';
import { LightgalleryItem, LightgalleryProvider, useLightgallery } from 'react-lightgallery';
import ImageElement from '../../UI/ImageElement';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ButtonElement from '../../UI/ButtonElement';

const OpenButtonWithHook = () => {
  const { openGallery } = useLightgallery();
  return (
    <ButtonElement className="btn btn-white-common btn-show-photos" id="open-show-photos-light-box" label="View all photos" onClick={() => openGallery('group1')} />
  );
};
function ShopPhotosComponent({ shopDetails }) {
  const [dyanmicEl, setDynamicEl] = useState([]);
  const lang = useSelector((state) => state.defaultLanguage.lang);

  useEffect(() => {
    setDynamicEl(shopDetails.photos.images);
  }, []);

  return (
    <>
      {dyanmicEl && dyanmicEl.length > 0 && (
        <div className="photos-div">
          <div className="photos-header-div">
            <h2>{getLangValue(strings.PHOTOS, lang)}</h2>
          </div>

          <div className="photos-root-div">
            <div className="row">
              <div className="col-md-12">
                <div className="gallery-light-box-root">
                  <div className="gallery-light-box">
                    <LightgalleryProvider
                      plugins={[lgAutoplay]}
                      speed={500}
                      progressBar
                      zoom={false}
                      pager={false}
                      fullScreen={false}
                      share={false}
                      counter
                      autoplayControls
                      galleryClassName="fixed-size-container"
                    >
                      <div className="row mlr-5 light-gallery-row">
                        {dyanmicEl.map((obj, index) => (
                          <>
                            {index < 4 ? (

                              <LightgalleryItem itemClassName="col-lg-6 col-md-6 plr-5" group="group1" src={obj.url} thumb={obj.url}>

                                <Link to="#" className="light-gallery-link">
                                  <ImageElement
                                    src={obj.url}
                                    className="img-fluid img-responsive img-object-cover"
                                    alt=""
                                  />
                                </Link>
                              </LightgalleryItem>
                            )
                              : (
                                <LightgalleryItem itemClassName="col-lg-6 col-md-6 d-none plr-5" group="group1" src={obj.url} thumb={obj.url}>

                                  <Link to="#" className="light-gallery-link">
                                    <ImageElement
                                      src={obj.url}
                                      className="img-fluid img-responsive img-object-cover"
                                      alt=""
                                    />
                                  </Link>
                                </LightgalleryItem>

                              )}
                          </>
                        ))}
                      </div>
                      {dyanmicEl.length > 4 && (

                      <div className="view-all-btn-div">

                        <OpenButtonWithHook />
                      </div>
                      )}

                    </LightgalleryProvider>
                    {/* <LightGallery
                      className="row mlr-5 light-gallery-row"
                      galleryId="dynamic-gallery-demo"
                      speed={500}
                      download={false}
                      progressBar
                      zoom={false}
                      pager={false}
                      fullScreen={false}
                      share={false}
                      addClass="fixed-size-container"
                      plugins={[lgAutoplay]}

                    >
                      {dyanmicEl.map((obj) => (
                        <>

                          <div
                            key={obj.id}
                            className="col-lg-6 col-md-6 plr-5"
                            data-responsive={obj.url}
                            data-src={obj.url}
                          >
                            <Link to="#" className="light-gallery-link">
                              <ImageElement
                                src={obj.url}
                                className="img-fluid img-responsive img-object-cover"
                                alt=""
                              />
                            </Link>
                          </div>

                        </>
                      ))}
                    </LightGallery>
                    {props.shopDetails.photos.images.length > 4 && (

                      <div className="view-all-btn-div">
                        <ButtonElement
                        className="btn btn-white-common btn-show-photos"
                         id="open-show-photos-light-box" label="View all photos"
                          onClick={(e) => handleOpenDynamicGallary(e)} />
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopPhotosComponent;
