/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getPlaceType,
  getOwnerType,
} from '../../constants/placeCategories';
import { get, post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ButtonElement from '../../UI/ButtonElement';
import InputElement from '../../UI/InputElement';
import Loader from '../../UI/Loader/Loader';
import ThankyouModalComponent from '../Common/ThankyouModalComponent';
import CategoriesComponent from './CategoriesComponent';

toast.configure();
const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);

const AddPlaceFormLeftComponent = () => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  const nameRef = useRef(null);
  const placeCategoryRef = useRef(null);
  const placeTypeRef = useRef(null);
  const sustainableCategoryRef = useRef(null);
  const imageRef = useRef(null);
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [placeCategories, setPlaceCategories] = useState([]);
  const [sustainableCategory, setSustainableCategory] = useState([]);
  const [placeType, setPlacetype] = useState([]);
  const [owner, setOwner] = useState([]);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState([]);
  const [selectedSustainableCategory, setSelectedSustainableCategory] = useState([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState([]);
  const [isOwner, setIsOwner] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [twitterUrl, setTwiiterUrl] = useState('');
  const [onlineStoreUrl, setOnlineStoreUrl] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [instagramUrlError, setInstagramUrlError] = useState('');
  const [facebookUrlError, setFacebookUrlError] = useState('');
  const [twitterUrlError, setTwiiterUrlError] = useState('');
  const [onlineStoreUrlError, setOnlineStoreUrlError] = useState('');
  const [selectedPlaceCategoryError, setSelectedPlaceCategoryError] = useState('');
  const [
    selectedSustainableCategoryError,
    setSelectedSustainableCategoryError,
  ] = useState([]);
  // console.log('selectedPlaceCategory', selectedPlaceCategory);
  const [selectedPlaceTypeError, setSelectedPlaceTypeError] = useState('');
  const [isOwnerError, setIsOwnerError] = useState('');
  const [imageError, setImageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  function onSelectFile(e) {
    let tempUrl = [];
    setImageError('');
    if (!e.target.files || e.target.files.length === 0) {
      //   setSelectedFile(undefined);
      setImageError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));

      return;
    }

    tempUrl = [...previewUrl];
    if (e.target.files.length === 1) {
      if (e.target.files.length + tempUrl.length > 8) {
        setImageError(getLangValue(strings.MAX_SIZE_UPLOAD, lang));
        return;
      }
      if (!e.target.files[0].type.match('image.*')) {
        setImageError(getLangValue(strings.WRONG_IMAGE_TYPE, lang), lang);
        return;
      }
      if (tempUrl.find((itemtemp) => itemtemp.name === e.target.files[0].name)) {
        return;
      }
      tempUrl.push(e.target.files[0]);
    } else if (e.target.files.length > 1) {
      if (e.target.files.length + tempUrl.length > 8) {
        setImageError(getLangValue(strings.MAX_SIZE_UPLOAD, lang));
        return;
      }
      Array.from(e.target.files).forEach((item) => {
        if (!item.type.match('image.*')) {
          setImageError(getLangValue(strings.WRONG_IMAGE_TYPE, lang));
          return;
        }
        if (tempUrl.find((itemtemp) => itemtemp.name === item.name)) {
          return;
        }

        tempUrl.push(item);
      });
      findDuplicates(tempUrl);
    }
    setPreviewUrl([...tempUrl]);
  }
  const onClickPlaceCategories = (e, id) => {
    // e.preventDefault();
    setSelectedPlaceCategoryError('');
    let updateCheckKeyword = [...selectedPlaceCategory];
    const tempCategory = [...placeCategories];
    tempCategory.map((item) => {
      if (item.id === id) {
        item.is_selected = item.is_selected === '0' ? '1' : '0';
        if (item.is_selected === '1') {
          updateCheckKeyword = [item.id];
        } else {
          const indexCheck = updateCheckKeyword.indexOf(item.id);
          updateCheckKeyword.splice(indexCheck, 1);
        }
      } else {
        item.is_selected = '0';
      }
      setSelectedPlaceCategory(updateCheckKeyword);
      return item;
    });
    setPlaceCategories(tempCategory);
  };
  const onClickSustainableCategories = (e, id) => {
    // e.preventDefault();
    setSelectedSustainableCategoryError('');
    const tempCategory1 = [...sustainableCategory];
    const updateCheckKeyword = [...selectedSustainableCategory];

    tempCategory1.map((item) => {
      if (item.id === id) {
        item.is_selected = item.is_selected === '0' ? '1' : '0';
        if (item.is_selected === '1') {
          updateCheckKeyword.push(item.id);
        } else {
          const indexCheck = updateCheckKeyword.indexOf(item.id);
          updateCheckKeyword.splice(indexCheck, 1);
        }
        setSelectedSustainableCategory(updateCheckKeyword);
      }
      return item;
    });
    setSustainableCategory(tempCategory1);
  };
  const onClickPlaceType = (e, id) => {
    // e.preventDefault();
    setSelectedPlaceTypeError('');

    const tempCategory1 = [...placeType];
    const updateCheckKeyword = [...selectedPlaceType];
    tempCategory1.map((item) => {
      if (item.id === id) {
        item.is_selected = item.is_selected === '0' ? '1' : '0';
        if (item.is_selected === '1') {
          updateCheckKeyword.push(item);
        } else {
          const indexCheck = updateCheckKeyword.indexOf(item);
          updateCheckKeyword.splice(indexCheck, 1);
        }
        setSelectedPlaceType(updateCheckKeyword);
      }
      return item;
    });
    setPlacetype(tempCategory1);
  };
  const onClickOwner = (e, id) => {
    setIsOwnerError('');
    const tempCategory1 = [...owner];
    tempCategory1.map((item) => {
      if (item.id === id) {
        item.is_selected = item.is_selected === '0' ? '1' : '0';
        if (item.is_selected === '1') {
          setIsOwner(item.label);
        }
      } else {
        item.is_selected = '0';
      }
      return item;
    });
    setOwner(tempCategory1);
  };
  const handleCancelImage = (i) => {
    const tempPreviewUrl = [...previewUrl];
    tempPreviewUrl.forEach((item, index) => {
      if (index === i) {
        tempPreviewUrl.splice(index, 1);
      }
    });
    if (tempPreviewUrl.length <= 8) {
      setImageError('');
    }
    setPreviewUrl(tempPreviewUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setNameError('');
        if (value === '') {
          setNameError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
        }
        setName(value);
        break;
      case 'description':
        setDescriptionError('');
        if (value === '') {
          setDescriptionError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
        }
        setDescription(value);
        break;
      case 'website':
        setWebsiteError('');
        if (value === '') {
          setWebsiteError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
        } else if (!pattern.test(value)) {
          setWebsiteError(getLangValue(strings.INVALID_URL, lang));
        }
        setWebsite(value);
        break;
      case 'instagramUrl':
        setInstagramUrlError('');
        // if (value === '') {
        //   setInstagramUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
        // } else

        if (value !== '' && !pattern.test(value)) {
          setInstagramUrlError(getLangValue(strings.INVALID_URL, lang));
        }
        setInstagramUrl(value);
        break;

      case 'facebookUrl':
        setFacebookUrlError('');
        // if (value === '') {
        //   setFacebookUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
        // } else
        if (value !== '' && !pattern.test(value)) {
          setFacebookUrlError(getLangValue(strings.INVALID_URL, lang));
        }
        setFacebookUrl(value);
        break;

      case 'twitterUrl':
        setTwiiterUrlError('');
        // if (value === '') {
        //   setTwiiterUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
        // } else
        if (value !== '' && !pattern.test(value)) {
          setTwiiterUrlError(getLangValue(strings.INVALID_URL, lang));
        }
        setTwiiterUrl(value);
        break;

      case 'onlineStoreUrl':
        setOnlineStoreUrlError('');
        // if (value === '') {
        //   setOnlineStoreUrlError(
        //     getLangValue(strings.ERR_FIELD_REQUIRED, lang),
        //   );
        // } else
        if (value !== '' && !pattern.test(value)) {
          setOnlineStoreUrlError(getLangValue(strings.INVALID_URL, lang));
        }
        setOnlineStoreUrl(value);
        break;

      default:
        break;
    }
  };
  const errorfocus = (ref, pos) => window.scrollTo(pos, ref.current);

  const isFormValidation = () => {
    let isValid = true;
    if (previewUrl.length > 8) {
      setImageError(getLangValue(strings.MAX_SIZE_UPLOAD, lang));
      isValid = false;
    } else {
      setImageError('');
    }
    // else if (imageError === getLangValue(strings.WRONG_IMAGE_TYPE, lang)) {
    //   isValid = false;
    // }

    if (name === '') {
      setNameError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    if (selectedPlaceCategory.length < 1) {
      setSelectedPlaceCategoryError(
        getLangValue(strings.ERR_FIELD_REQUIRED, lang),
      );
      isValid = false;
    }
    if (selectedSustainableCategory.length < 1) {
      setSelectedSustainableCategoryError(
        getLangValue(strings.ERR_FIELD_REQUIRED, lang),
      );
      isValid = false;
    }
    if (selectedPlaceType.length < 1) {
      setSelectedPlaceTypeError(
        getLangValue(strings.ERR_FIELD_REQUIRED, lang),
      );
      isValid = false;
    }
    if (description === '') {
      setDescriptionError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    if (website === '') {
      // errorfocus(websiteref);
      setWebsiteError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    } else if (!pattern.test(website)) {
      setWebsiteError(getLangValue(strings.INVALID_URL, lang));
      isValid = false;
    }
    // if (instagramUrl === '') {
    //   setInstagramUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
    //   isValid = false;
    // } else
    if (instagramUrl !== '' && !pattern.test(instagramUrl)) {
      setInstagramUrlError(getLangValue(strings.INVALID_URL, lang));
      isValid = false;
    }

    // if (facebookUrl === '') {
    //   setFacebookUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
    //   isValid = false;
    // } else
    if (facebookUrl !== '' && !pattern.test(facebookUrl)) {
      setFacebookUrlError(getLangValue(strings.INVALID_URL, lang));
      isValid = false;
    }

    // if (twitterUrl === '') {
    //   setTwiiterUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
    //   isValid = false;
    // } else
    if (twitterUrl !== '' && !pattern.test(twitterUrl)) {
      setTwiiterUrlError(getLangValue(strings.INVALID_URL, lang));
      isValid = false;
    }
    // if (onlineStoreUrl === '') {
    //   setOnlineStoreUrlError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
    //   isValid = false;
    // } else

    if (onlineStoreUrl !== '' && !pattern.test(onlineStoreUrl)) {
      setOnlineStoreUrlError(getLangValue(strings.INVALID_URL, lang));
      isValid = false;
    }
    if (isOwner === '') {
      setIsOwnerError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }

    return isValid;
  };
  const handleSubmit = () => {
    const isValid = isFormValidation();
    const token = localStorage.getItem('token');
    if (isValid) {
      setIsLoading(true);

      // do api call here
      const AddPlaceData = new FormData();
      for (let i = 0; i < previewUrl.length; i += 1) {
        AddPlaceData.append('images[]', previewUrl[i]);
      }
      // AddPlaceData.append('images', previewUrl);
      AddPlaceData.append('name', name);
      AddPlaceData.append('description', description);
      AddPlaceData.append('social_website', website);
      AddPlaceData.append('social_instagram', instagramUrl);
      AddPlaceData.append('social_facebook', facebookUrl);
      AddPlaceData.append('social_twitter', twitterUrl);
      AddPlaceData.append('online_store_url', onlineStoreUrl);
      AddPlaceData.append('isOwner', isOwner);
      AddPlaceData.append('shopkeywords', selectedPlaceCategory);
      AddPlaceData.append('actionkeywords', selectedSustainableCategory);
      AddPlaceData.append('lang', lang);
      AddPlaceData.append('offline', placeType[0].is_selected === '1' ? 1 : 0);
      AddPlaceData.append('online', placeType[1].is_selected === '1' ? 1 : 0);
      const url = getUrl('add-shop');
      post(`${url}?api_token=${token}`, AddPlaceData, false)
        .then((response) => {
          const {
            data: { messages, status, code },
          } = response;
          setIsLoading(false);
          switch (code) {
            case 200:
              if (status === 'true') {
                setShowSuccessModal(true);
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
          // tokenExpire(error.response, history);
        });
    } else {
      if (nameError !== '') {
        errorfocus(nameRef, 0);
      } else if (imageRef !== '') {
        errorfocus(imageRef, 0);
      } else if (selectedPlaceCategoryError !== '') {
        errorfocus(placeCategoryRef, 0);
      } else if (selectedPlaceTypeError !== '') {
        errorfocus(placeTypeRef, 0);
      } else if (selectedSustainableCategoryError !== '') {
        errorfocus(sustainableCategoryRef, 400);
      }
    }
  };
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
              setPlaceCategories(data.actionkeywords);
              setSustainableCategory(data.shopkeywords);
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
        console.log('error', error);
        const { message } = error;
        toast.error(message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    history.push('/');
  };

  useEffect(() => {
    const placetype = getPlaceType(lang);
    const ownerType = getOwnerType(lang);
    getFilterCategoryData();
    setPlacetype(placetype);
    setOwner(ownerType);
  }, [lang]);
  return (
    <>
      {isLoading && <Loader /> }
      {showSuccessModal && (
      <ThankyouModalComponent
        title={getLangValue(strings.THANKYOU_FOR_YOUR_SUBMISSION, lang)}
        description={getLangValue(strings.WE_WILL_REVIEW_IT, lang)}
        handleClose={handleCloseSuccessModal}
      />
      )}
      <div className="add-place-left-root">
        <div className="add-place-left-inner">
          <div className="title-div">
            <h1>{getLangValue(strings.ADD_PLACE, lang)}</h1>
          </div>

          <div className="form-custom-div">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="file-div">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      multiple
                      onChange={(e) => {
                        onSelectFile(e);
                      }}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      <i className="bg-custom-icon image-icon" />

                      {getLangValue(strings.ADD_PHOTOS_1, lang)}
                    </label>
                  </div>
                  <div className="img-list-div">
                    <div className="row mlr-8">
                      {previewUrl.map((image, i) => (
                        <div className="col-lg-3 col-md-3 col-6 plr-8">
                          <div className="image-bx">
                            <div className="cancel-div">
                              <ButtonElement
                                type="button"
                                className="btn btn-link btn-cancel"
                                label={<i className="fe fe-x" />}
                                onClick={() => handleCancelImage(i)}
                              />
                            </div>
                            <div className="image-bx-inner">
                              <img
                                src={URL.createObjectURL(image)}
                                alt="img"
                                className="img-fluid img-object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {imageError !== '' ? (
                      <div className="invalid-feedback d-block">{imageError}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.NAME, lang)}
                  </label>
                  <InputElement
                    inputRef={nameRef}
                    divClassName="input-control-div"
                    className="form-control"
                    type="text"
                    inputName="name"
                    inputValue={name}
                    valueOnChange={handleChange}
                  />
                  {nameError !== '' ? (
                    <div className="invalid-feedback d-block">{nameError}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group mb-20">
                  <label className="label">
                    {getLangValue(strings.PLACE_CATEGORY, lang)}
                  </label>
                  <div className="input-control-div custom-label-box-root">
                    <CategoriesComponent
                      categories={placeCategories}
                      onClickCatgory={onClickPlaceCategories}
                      inputRef={placeCategoryRef}
                    />
                    {selectedPlaceCategoryError !== '' ? (
                      <div className="invalid-feedback d-block">
                        {selectedPlaceCategoryError}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group mb-20">
                  <label className="label">
                    {getLangValue(strings.PLACE_TYPE, lang)}
                  </label>
                  <div className="input-control-div custom-label-box-root">
                    <CategoriesComponent
                      categories={placeType}
                      onClickCatgory={onClickPlaceType}
                      inputRef={placeTypeRef}
                    />
                    {selectedPlaceTypeError !== '' ? (
                      <div className="invalid-feedback d-block">
                        {selectedPlaceTypeError}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group mb-20">
                  <label className="label">
                    {getLangValue(strings.SUSTAINABILITY_CATEGORY, lang)}
                  </label>
                  <div className="input-control-div custom-label-box-root">
                    <CategoriesComponent
                      categories={sustainableCategory}
                      onClickCatgory={onClickSustainableCategories}
                      inputRef={sustainableCategoryRef}

                    />
                    {selectedSustainableCategoryError !== '' ? (
                      <div className="invalid-feedback d-block">
                        {selectedSustainableCategoryError}
                      </div>
                    ) : null}
                  </div>

                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.DESCRIPTION, lang)}
                  </label>
                  <InputElement
                    divClassName="input-control-div"
                    className="form-control"
                    type="text"
                    inputName="description"
                    inputValue={description}
                    valueOnChange={handleChange}
                  />
                  {descriptionError !== '' ? (
                    <div className="invalid-feedback d-block">
                      {descriptionError}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.WEBSITE, lang)}
                  </label>
                  <div className="input-control-div input-control-copy-div">
                    <input
                      type="text"
                      className="form-control"
                      name="website"
                      value={website}
                      onChange={handleChange}
                    />
                    <ButtonElement
                      type="button"
                      className="btn-span-icon"
                      label={<span className="bg-custom-icon chain-icon" />}
                    />

                  </div>
                  {websiteError !== '' ? (
                    <div className="invalid-feedback d-block">{websiteError}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.INSTAGRAM, lang)}
                  </label>
                  <div className="input-control-div input-control-copy-div">
                    <input
                      type="text"
                      className="form-control"
                      name="instagramUrl"
                      value={instagramUrl}
                      onChange={handleChange}
                    />
                    <ButtonElement
                      type="button"
                      className="btn-span-icon"
                      label={<span className="bg-custom-icon chain-icon" />}
                    />
                    {/* <button className="btn-span-icon">
                    <span className="bg-custom-icon chain-icon" />
                  </button> */}
                  </div>
                  {instagramUrlError !== '' ? (
                    <div className="invalid-feedback d-block">
                      {instagramUrlError}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.FACEBOOK, lang)}
                  </label>
                  <div className="input-control-div input-control-copy-div">
                    <input
                      type="text"
                      className="form-control"
                      name="facebookUrl"
                      value={facebookUrl}
                      onChange={handleChange}
                    />
                    <ButtonElement
                      type="button"
                      className="btn-span-icon"
                      label={<span className="bg-custom-icon chain-icon" />}
                    />
                    {/* <button className="btn-span-icon">
                    <span className="bg-custom-icon chain-icon" />
                  </button> */}
                  </div>
                  {facebookUrlError !== '' ? (
                    <div className="invalid-feedback d-block">
                      {facebookUrlError}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.TWITTER, lang)}
                  </label>
                  <div className="input-control-div input-control-copy-div">
                    <input
                      type="text"
                      className="form-control"
                      name="twitterUrl"
                      value={twitterUrl}
                      onChange={handleChange}
                    />
                    <ButtonElement
                      type="button"
                      className="btn-span-icon"
                      label={<span className="bg-custom-icon chain-icon" />}
                    />
                    {/* <button className="btn-span-icon">
                    <span className="bg-custom-icon chain-icon" />
                  </button> */}
                  </div>
                  {twitterUrlError !== '' ? (
                    <div className="invalid-feedback d-block">
                      {twitterUrlError}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.ONLINE_STORE_URL, lang)}
                  </label>
                  <div className="input-control-div input-control-copy-div">
                    <input
                      type="text"
                      className="form-control"
                      name="onlineStoreUrl"
                      value={onlineStoreUrl}
                      onChange={handleChange}
                    />
                    <ButtonElement
                      type="button"
                      className="btn-span-icon"
                      label={<span className="bg-custom-icon chain-icon" />}
                    />
                  </div>
                  {onlineStoreUrlError !== '' ? (
                    <div className="invalid-feedback d-block">
                      {onlineStoreUrlError}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="label">
                    {getLangValue(strings.ARE_YOU_OWNER, lang)}
                  </label>
                  <div className="input-control-div custom-label-box-root">
                    <CategoriesComponent
                      categories={owner}
                      onClickCatgory={onClickOwner}
                    />
                    {isOwnerError !== '' ? (
                      <div className="invalid-feedback d-block">
                        {isOwnerError}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="button-group-div">
                  <ButtonElement
                    type="button"
                    className="btn btn-general-common btn-submit"
                    label={getLangValue(strings.SUBMIT, lang)}
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlaceFormLeftComponent;
