/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get, put } from '../../../network/requests';
import ProfileUploaderComponent from './ProfileUploaderComponent';
import SocialInputButtons from './SocialInputButtons';
import ProfileInput from './ProfileInput';
import Loader from '../../UI/Loader/Loader';
import { useDispatch } from 'react-redux';
import { setCreatorData } from '../../../actions/usersAction';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import skillImage from '../../../assets/images/icons-filter/icon-01.png';
import DropDownList from '../../UI/DropDownList/DropDownList';

toast.configure();
const ProfileSettingTabComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pageUploadImage, setpageUploadImage] = useState('');
  const [otherSkill, setOtherSkill] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [imgSizeError, setimgSizeError] = useState('');
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [countryname, setCountryName] = useState();
  const [profileDetails, setProfileDetails] = useState({
    firstname: '',
    lastname: '',
    dec_yourself: '',
    key_skill: '',
    affiliation_link: '',
    flag_image: '',
    flag_name: '',
  });
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [decYourselfNameErr, setDecYourselfNameErr] = useState('');
  const [countryId, setCountryId] = useState('');
  const [socialUrl, setSocialUrl] = useState({
    instagramurl: '',
    facebookurl: '',
    youtubeurl: '',
    // googleurl: '',
    creator_website_url: '',
  });
  const [socialUrlErr, setSocialUrlErr] = useState({
    instagramurlErr: '',
    facebookurlErr: '',
    youtubeurlErr: '',
    // googleurlErr: '',
    creator_website_urlErr: '',
  });
  const [country, setCountry] = useState();
  const [countryerror, setCountryError] = useState('')
  const [optionCountry, setOptionCountry] = useState([]);
  const containerStyle = {
    position: 'relative',
    width: '90px !important',
  };
  let controlStyle = {
    width: 'inherit !important',
    background: 'transparent !important',
    border: 'none',
    borderRadius: '2px',
    position: 'relative',
    cursor: 'pointer',
    padding: '5px 5px',
  };
  const valueContainerStyle = {
    padding: '2px 2px !important',
    color: 'inherit',
    textDecoration: 'none',
    overflow: 'hidden',
    display: 'block',
    fontWeight: 'bol',
  };
  const indicatorContainerStyle = {
    border: 'none !important',
    display: 'inline-block',
    width: '12px',
    height: '6px',
    right: '16px',
  };
  const singleValueStyle = {
    width: '34px',
    height: '24px',
    // background: '#fff',
    // border: '1px solid #d9d9d9',
    borderRadius: '4px',
    objectFit: 'contain',
    marginLeft: '0px',
    marginRight: '0px'
  };
  const menuStyle = {
    margin: 0,
    padding: 0,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #2d2d391a',
  };
  const menuListStyle = {
    margin: 0,
    padding: 0,
  };
  const optionStyle = {
    borderBottom: '1px solid #2d2d391a',
    background: '#fff',
    // borderBottom: '0px',
    padding: '5px',
    // height: '40px',
    // width: '65px',
  };
  const dropdownIndicatorStyle = {};
  const checkCountry = (brand) => {
    optionCountry.forEach((item) => {
      if (item.value.toLowerCase() === brand.toLowerCase()) {
        handleChangeCountrySelect(item);
        // break;
      }
      else {
        // handleChangeCountrySelect({value:'',label:''})
      }

    });

  };
  const handleChangeCountrySelect = (item) => {
    setCountry(item.value)
    setCountryId(item.id);
    setCountryName({
      value: item.value,
      label: <img src={item.label.props.src} style={{ width: '34px', height: '24px', objectFit: 'cover' }} />,
    });
    setCountryError('')

  };

  const handleClickEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };
  const handleChangeCountryText = (value) => {
    setCountry(value)
    checkCountry(value)
    setCountryError('')
  }
  // const handleBlurCountryText = () => {
  //   optionCountry.forEach((item) => {
  //     if (item.value.toLowerCase() !== country.toLowerCase()) {
  //       setCountry("")
  //       setCountryName(null)
  //       // setCountryError("You Country is not in country list")
  //       // handleChangeCountrySelect({value:'',label:''})
  //       // break;
  //     }
  //     else {
  //       handleChangeCountrySelect(item);
  //     }

  //   });
  // }
  // const handleAddSkill = (e,skillNew) => {
  //   e.preventDefault()
  //   if (skillNew !== '') {
  //     setKeywordsList(keywordsList.concat({keyword:skillNew}));
  //     setIsEditProfile(true)
  //   }
  // };

  const handleProfileUploader = (event) => {
    setimgSizeError('');
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const maxAllowedSize = Math.round(img.size / 1024);
      if (maxAllowedSize >= 5120) {
        setimgSizeError('Please select a file less than 5mb');
      } else {
       
        setIsLoading(true);
        const url = getUrl('creator_profile');
        const formData = new FormData();
        formData.append('profile_image', img);
        put(url, formData, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            setIsLoading(false);
            switch (code) {
              case 201:
                if (status === true) {
                  getProfileDetails();
                  toast.success(message, {
                    pauseOnHover: false,
                    position: toast.POSITION.TOP_RIGHT,
                  });
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
          .catch((error) => {
            setIsLoading(false);
            tokenExpire(error.response, history);
          });
      }
    }
  };
  const handleChangeProfileDetails = (evt) => {
    const value = evt.target.value;
    switch (evt.target.name) {
      case 'firstname':
        if (evt.target.value === '') {
          setFirstNameErr("First Name is required")
          setProfileDetails({
            ...profileDetails,
            [evt.target.name]: '',
          });
        } else {
          setFirstNameErr("")
          setProfileDetails({
            ...profileDetails,
            [evt.target.name]: value,
          });
        }
        break;
      case 'lastname':
        if (evt.target.value === '') {
          setLastNameErr("Last Name is required")
          setProfileDetails({
            ...profileDetails,
            [evt.target.name]: '',
          });
        } else {
          setLastNameErr("")
          setProfileDetails({
            ...profileDetails,
            [evt.target.name]: value,
          });
        }
        break;
      default:
        setProfileDetails({
          ...profileDetails,
          [evt.target.name]: value,
        });
        break;
    }
    // setProfileDetails({
    //   ...profileDetails,
    //   [evt.target.name]: value,
    // });
  };
  const onHandleChangeSocial = (evt) => {
    const value = evt.target.value;
    // eslint-disable-next-line no-useless-escape
    const urlRegx = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (value === '') {
      setSocialUrlErr({
        ...socialUrlErr,
        [`${evt.target.name}Err`]: '',
      });
      setSocialUrl({
        ...socialUrl,
        [evt.target.name]: '',
      });
    } else {
      if (value !== '' && !urlRegx.test(value)) {
        setSocialUrlErr({
          ...socialUrlErr,
          [`${evt.target.name}Err`]: 'Enter a valid URL.',
        });
        setSocialUrl({
          ...socialUrl,
          [evt.target.name]: value,
        });
      } else {
        if (!/^https?:\/\//i.test(value)) {
          const url = 'https://' + value;
          //setPostLink(url);
          setSocialUrl({
            ...socialUrl,
            [evt.target.name]: url,
          });
          setSocialUrlErr({
            ...socialUrlErr,
            [`${evt.target.name}Err`]: '',
          });
        } else {
          setSocialUrl({
            ...socialUrl,
            [evt.target.name]: value,
          });
          setSocialUrlErr({
            ...socialUrlErr,
            [`${evt.target.name}Err`]: '',
          });
        }
      }
    }
  };
  const getProfileDetails = () => {
    setIsLoading(true);
    const url = getUrl('creator_profile');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              dispatch(setCreatorData(data));
              const profileData = {
                ...socialUrl,
              
                instagramurl: data.instagram_url,
                facebookurl: data.facebook_url,
                youtubeurl: data.youtube_url,
                creator_website_url: data.creator_website_url,
              };
              setProfileDetails({
                ...profileDetails,
                firstname: data.first_name,
                lastname: data.last_name,
                dec_yourself: data.description,
                key_skill: data.key_skill,
                affiliation_link: data.affiliation_link,
                flag_image: data.country.country_flag,
                flag_name: data.country.country_name,
              });
              if (data.country.country_flag !== null) {
                setCountryName({
                  value: data.country.country_name,
                  label: (<img src={data.country.country_flag} style={{ height: '24px', width: '34px', objectFit: 'cover' }}   />)
                })
              }

              setCountry(data.country.country_name)
              setSocialUrl(profileData);
              setpageUploadImage(data.profile_image);
              setOtherSkill(data.other_skills);
              setFirstNameErr("")
              setLastNameErr("")
              setDecYourselfNameErr("")
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
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  const getKeywordsData = () => {
    setIsLoading(true);
    const url = getUrl('getKeywordsDetails');
    get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setKeywordsList(data);
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
        setIsLoading(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const getCountryList = () => {
    setIsLoading(true);
    const url = getUrl('country-list');
    get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setOptionCountry(
                data.map((item) => ({
                  value: item.country_name,
                  label: <img src={item.country_flag} style={{ height: '50px', width: '50px', marginRight: '5px' }} />,
                  id: item.id
                })),
              );
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
        setIsLoading(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    getProfileDetails('');
    getKeywordsData();
    getCountryList();
  }, []);
  const isFormValidation = () => {
    let isValid = true;
    if (profileDetails.firstname === '') {
      setFirstNameErr("First name is required");
      isValid = false
    }
    if (profileDetails.lastname === '') {
      setLastNameErr("Last name is required");
      isValid = false
    }

    if (profileDetails.dec_yourself !== '' && profileDetails.dec_yourself.length >= 1001) {
      setDecYourselfNameErr("Please enter maximum 1000 charcter")
      isValid = false
    }
    // eslint-disable-next-line no-useless-escape
    const urlRegx = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (
      socialUrl.facebookurl !== '' &&
      socialUrl.facebookurl !== null &&
      !urlRegx.test(socialUrl.facebookurl)
    ) {
      setSocialUrlErr({
        ...socialUrlErr,
        facebookurlErr: 'Enter a valid URL.',
      });
      isValid = false;
    }
    if (
      socialUrl.youtubeurl !== '' &&
      socialUrl.youtubeurl !== null &&
      !urlRegx.test(socialUrl.youtubeurl)
    ) {
      setSocialUrlErr({
        ...socialUrlErr,
        youtubeurlErr: 'Enter a valid URL.',
      });
      isValid = false;
    }
    if (
      socialUrl.instagramurl !== '' &&
      socialUrl.instagramurl !== null &&
      !urlRegx.test(socialUrl.instagramurl)
    ) {
      setSocialUrlErr({
        ...socialUrlErr,
        instagramurlErr: 'Enter a valid URL.',
      });
      isValid = false;
    }
    // if (
    //   socialUrl.googleurl !== '' &&
    //   socialUrl.googleurl !== '' &&
    //   !urlRegx.test(socialUrl.googleurl)
    // ) {
    //   setSocialUrlErr({
    //     ...socialUrlErr,
    //     googleurlErr: 'Enter a valid URL.',
    //   });
    //   isValid = false;
    // }
    if (
      socialUrl.creator_website_url !== '' &&
      socialUrl.creator_website_url !== '' &&
      !urlRegx.test(socialUrl.creator_website_url)
    ) {
      setSocialUrlErr({
        ...socialUrlErr,
        creator_website_urlErr: 'Enter a valid URL.',
      });
      isValid = false;
    }
    // if (country !== '') {
    //   setCountryError('Country Must be select')
    //   isValid = false;
    // }
    if (countryerror !== '') {
      isValid = false;

    }
    return isValid;
  };
  const handleOnSaveProfileDetails = () => {
    const isValid = isFormValidation();
    if (isValid) {
      const url = getUrl('creator_profile');
      const updateProfileData = JSON.stringify({
        first_name: profileDetails.firstname,
        last_name: profileDetails.lastname,
        description: profileDetails.dec_yourself,
        affiliation_link: profileDetails.affiliation_link,
        key_skill: profileDetails.key_skill,
        other_skills: otherSkill,
        youtube_url: socialUrl.youtubeurl,
        instagram_url: socialUrl.instagramurl,
        // google_url: socialUrl.googleurl,
        facebook_url: socialUrl.facebookurl,
        creator_website_url: socialUrl.creator_website_url,
        country_details: countryId
      });
      setIsLoading(true);
      put(url, updateProfileData, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          setIsLoading(false);
          switch (code) {
            case 201:
              if (status === true) {
                getProfileDetails();
                setDecYourselfNameErr('')
                toast.success(message, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
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
        .catch((error) => {
          setIsLoading(false);
          tokenExpire(error.response, history);
        });
    }
  };
  const handleSelectedKeyword = (e, skillName) => {
    e.preventDefault();
    if (!otherSkill.includes(skillName)) {
      if (otherSkill.indexOf(skillName) === -1) {
        otherSkill.push(skillName);
      }
    } else {
      let index = otherSkill.indexOf(skillName);
      otherSkill.splice(index, 1);
    }
    setOtherSkill(otherSkill);
  };
  // const handleCopyUrl = (e) => {
  //   e.preventDefault();
  //   var copyLink = document.getElementsByClassName('text-container')[0];
  //   copyLink.select();
  //   document.execCommand('copy');
  // };
  return (
    <div className="tab-pane-inner">
      {isLoading && <Loader />}
      <div className="edit-profile-div">
        <div className="edit-common-form-div">
          <form>
            <div className="container container-770">
              <div className="row mlr-10">
                <div className="col-lg-12 col-md-12 plr-10 ">
                  <ProfileUploaderComponent
                    pageUploadImage={pageUploadImage}
                    handleProfileUploader={handleProfileUploader}
                    errorMessage={imgSizeError}
                  />
                </div>
                {!isEditProfile && (
                  <>
                    <div className="col-lg-12 col-md-12 default-flex-profile plr-10">
                      <div className="text-content-tb-profile-div">
                        <div className="heading-bx">
                          <h2>{`${profileDetails.firstname} ${profileDetails.lastname}`}</h2>

                          <div className="ip-creators-content-profile">
                            <h3>
                              {profileDetails && profileDetails.flag_image !== null && (
                                <>
                                  <span className="img-span">
                                    <img
                                      src={profileDetails.flag_image || ''}
                                      className="img-fluid"
                                      alt="countryImg"
                                    />
                                  </span>
                                  {' '}
                                  <span className="txt-span">  {profileDetails.flag_name !== null ? profileDetails.flag_name : ''} </span>
                                </>
                              )}
                            </h3>
                          </div>

                          <div className="social-icon-div-profile-root">
                            <ul className="social-ul">
                              {socialUrl.instagramurl === '' || socialUrl.instagramurl === null || socialUrl.instagramurl === undefined ?
                                null :
                                <li>
                                  <a href={socialUrl.instagramurl} className="social-link" target="blank" >
                                    <i className="fab fa-instagram"></i>
                                  </a>
                                </li>
                              }

                              {socialUrl.facebookurl === '' || socialUrl.facebookurl === null || socialUrl.facebookurl === undefined ?
                                null :
                                <li>
                                  <a href={socialUrl.facebookurl} className="social-link" target="blank">
                                    <i className="fab fa-facebook-f"></i>
                                  </a>
                                </li>
                              }


                              {socialUrl.youtubeurl === '' || socialUrl.youtubeurl === null || socialUrl.youtubeurl === undefined ?
                                null :
                                <li>
                                  <a href={socialUrl.youtubeurl} className="social-link" target="blank">
                                    <i className="fab fa-youtube"></i>
                                  </a>
                                </li>
                              }


                              {socialUrl.creator_website_url === '' || socialUrl.creator_website_url === undefined || socialUrl.creator_website_url === null ?
                                null :
                                <li>
                                  <a href={socialUrl.creator_website_url} className="social-link" target="blank">
                                    <i className="fas fa-globe"></i>
                                  </a>
                                </li>
                              }

                            </ul>
                          </div>
                        </div>
                        <div className="desc-div">
                          <p>{profileDetails.description}</p>
                        </div>

                        <div className="filter-category-root-div filter-category-root-left-div">
                          <div className="filter-category-inner">
                            <ul className="filter-list-ul">
                              {keywordsList.length > 0 && (
                                <>
                                  {keywordsList.map((skill, index) => {
                                    return otherSkill.includes(skill.keyword) ? (
                                      <li key={index}>
                                        <Link to="#" className="filter-link">
                                          <>
                                            <span className="icon-img-span">
                                              <img
                                                src={skill.image || skillImage}
                                                alt="img"
                                                className="img-fluid"
                                              />
                                            </span>
                                            <span className="span-text">{skill.keyword}</span>
                                          </>
                                        </Link>
                                      </li>
                                    ) : null;
                                  })}
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        !isEditProfile
                          ? 'col-lg-12 col-md-12 default-flex-profile plr-10'
                          : 'col-lg-12 col-md-12 default-flex-profile plr-10 d-none'
                      }
                    >
                      <div className="submit-bottom-div">
                        <div className="submit-bottom-div-row pt-30">
                          <Link
                            href="#"
                            className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel btn-save"
                            id="edit-profile-btn-link"
                            onClick={() => handleClickEditProfile()}
                          >
                            Edit Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                className={
                  isEditProfile ? 'form-general-root pt-20 ' : 'form-general-root pt-20 d-none'
                }
                id="edit-profile-form"
              >
                <div className="row mlr-10">
                  <div className="col-lg-6 col-md-6 plr-10">
                    <div className="form-group mb-36">
                      <label className="label-text">First name</label>
                      <ProfileInput
                        className="form-group-control"
                        readOnly={false}
                        placehoder="First Name"
                        name="firstname"
                        value={profileDetails.firstname}
                        onHandleChange={handleChangeProfileDetails}
                      />
                    </div>
                    {firstNameErr !== '' ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '18px',
                          margin: '-25px 0px 25px 0px',
                        }}
                      >
                        {firstNameErr}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-lg-6 col-md-6 plr-10">
                    <div className="form-group mb-36">
                      <label className="label-text">Last name</label>
                      <ProfileInput
                        className="form-group-control"
                        readOnly={false}
                        placehoder="Last Name"
                        name="lastname"
                        value={profileDetails.lastname}
                        onHandleChange={handleChangeProfileDetails}
                      />
                    </div>
                    {lastNameErr !== '' ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '18px',
                          margin: '-25px 0px 25px 0px',
                        }}
                      >
                        {lastNameErr}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 plr-10">
                    <div className="form-group country-flag-form-group">
                      <label className="label-text">Country</label>
                      <div className="form-group-control">
                        <ProfileInput
                          className="form-group-control"
                          readOnly={false}
                          placehoder="Country"
                          name="country"
                          value={country}
                          onHandleChange={(e) => handleChangeCountryText(e.target.value)}
                        >
                          <div className="select-flag-dropdown-div">
                            <div className="dropdown-select-card" id="myDropdown">
                              <DropDownList
                                value={countryname}
                                onChange={handleChangeCountrySelect}
                                options={optionCountry}
                                placeholder=""
                                className="js-select2"
                                id="select-filter"
                                containerStyle={containerStyle}
                                controlStyle={controlStyle}
                                valueContainerStyle={valueContainerStyle}
                                indicatorContainerStyle={indicatorContainerStyle}
                                optionStyle={optionStyle}
                                menuStyle={menuStyle}
                                menuListStyle={menuListStyle}
                                dropdownIndicatorStyle={dropdownIndicatorStyle}
                                singleValueStyle={singleValueStyle}
                                isSearchable={false}
                              />
                            </div>
                          </div>
                          <div className={`invalid-feedback ${countryerror !== '' ? ' invalid-feedback d-block' : ''}`}>{countryerror}</div>
                        </ProfileInput>
                      </div>

                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 plr-10">
                    <div className="form-group form-group-textarea-ct-general mb-30">
                      <div className="input-control-row">
                        <textarea
                          name="dec_yourself"
                          value={profileDetails.dec_yourself}
                          onChange={handleChangeProfileDetails}
                          className="form-control form-textarea"
                          placeholder="Describe yourself"
                          rows="4"
                        ></textarea>
                        <span className="tl-icon-span">
                          <span className="bg-custom-icon write-pen-new-icon"></span>
                        </span>

                        {/* <div className="abs-top-left">
                          <button className="edit-btn-icon">
                            <i className="bg-custom-icon edit-pencil-icon"></i>
                          </button>
                        </div> */}
                      </div>
                    </div>
                    {decYourselfNameErr !== '' &&
                      <div
                        style={{
                          color: 'red',
                          fontSize: '18px',
                          margin: '-25px 0px 25px 0px',
                        }}
                      >
                        {decYourselfNameErr}
                      </div>
                    }
                  </div>
                  <div className="col-lg-12 col-md-12 plr-10">
                    <div className="form-group form-group-with-btn mb-30">
                      <label className="label-text">Skills</label>
                      <ProfileInput
                        className="input-control-row"
                        readOnly={false}
                        placehoder="Add your key skill"
                        name="key_skill"
                        value={profileDetails.key_skill}
                        onHandleChange={handleChangeProfileDetails}
                      >
                        {/* <div className="abs-right-top">
                          <button className="btn btn-common-primary btn-add" onClick={(e)=>handleAddSkill(e,profileDetails.key_skill)}>
                            <span className="material-icons-outlined">add</span> Add
                          </button>
                        </div> */}
                      </ProfileInput>

                      <div className="category-control-row category-control-row01">
                        <div className="category-inner">
                          <ul className="category-list-ul">
                            {keywordsList.length > 0 && (
                              <>
                                {keywordsList.map((skill, index) => {
                                  return (
                                    <li
                                      className={`${otherSkill.includes(skill.keyword) ? 'active' : ''
                                        }`}
                                      key={index}
                                      onClick={(e) => handleSelectedKeyword(e, skill.keyword)}
                                    >
                                      <Link to="#" className="filter-link">
                                        {skill.keyword}
                                        {otherSkill.includes(skill.keyword) ? (
                                          <button className="cancel-icon-span">
                                            <i className="fe fe-x cross-icon"></i>
                                          </button>
                                        ) : null}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </>
                            )}
                            {/* <li>
                            <a href="#" className="filter-link">
                              +Add new
                            </a>
                          </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 plr-10">
                    <div className="form-group form-group-edit form-group-edit-social-acc">
                      <label htmlFor="">Add URLs:</label>

                      <div className="row mlr-10">
                        <div className="col-lg-6 col-md-6 plr-10">
                          <SocialInputButtons
                            name="instagramurl"
                            socialIcon="fab fa-instagram"
                            readOnly={false}
                            placehoder="Instagram URL"
                            value={socialUrl.instagramurl}
                            onHandleChange={onHandleChangeSocial}
                          />
                          {socialUrlErr.youtubeurlErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: ' 0 0 5px 0px',
                              }}
                            >
                              {socialUrlErr.youtubeurlErr}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-lg-6 col-md-6 plr-10">
                          <SocialInputButtons
                            socialIcon="fab fa-facebook-f"
                            readOnly={false}
                            placehoder="Facebook URL"
                            name="facebookurl"
                            value={socialUrl.facebookurl}
                            onHandleChange={onHandleChangeSocial}
                          />
                          {socialUrlErr.facebookurlErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: ' 0 0 5px 0px',
                              }}
                            >
                              {socialUrlErr.facebookurlErr}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-lg-6 col-md-6 plr-10">
                          <SocialInputButtons
                            socialIcon="fab fa-youtube"
                            readOnly={false}
                            placehoder="Youtube URL"
                            name="youtubeurl"
                            value={socialUrl.youtubeurl}
                            onHandleChange={onHandleChangeSocial}
                          />
                          {socialUrlErr.instagramurlErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: ' 0 0 5px 0px',
                              }}
                            >
                              {socialUrlErr.instagramurlErr}
                            </div>
                          ) : null}
                        </div>

                        {/* <div className="col-lg-6 col-md-6 plr-10">
                          <SocialInputButtons
                            socialIcon="fab fa-google-plus-g"
                            readOnly={false}
                            placehoder="Google URL"
                            name="googleurl"
                            value={socialUrl.googleurl}
                            onHandleChange={onHandleChangeSocial}
                          />
                          {socialUrlErr.googleurlErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: ' 0 0 5px 0px',
                              }}
                            >
                              {socialUrlErr.googleurlErr}
                            </div>
                          ) : null}
                        </div> */}
                        <div className="col-lg-6 col-md-6 plr-10">
                          <SocialInputButtons
                            socialIcon="fas fa-globe"
                            readOnly={false}
                            placehoder="Creator Website URL"
                            name="creator_website_url"
                            value={socialUrl.creator_website_url}
                            onHandleChange={onHandleChangeSocial}
                          />
                          {socialUrlErr.creator_website_urlErr !== '' ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '18px',
                                margin: ' 0 0 5px 0px',
                              }}
                            >
                              {socialUrlErr.creator_website_urlErr}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-12 col-md-12 plr-10">
                    <div className="form-group mb-30">
                      <label className="font-weight-700">
                        <span className="text">Affiliate Url:</span>
                      </label>
                      <div className="form-group form-group-edit">
                        <div className="input-control-row">
                          <input
                            readOnly={true}
                            className="form-control text-container"
                            name="affilaiteUrl"
                            value={profileDetails.affiliation_link}
                          />
                          <div className="abs-top-right">
                            <Link
                              to="#"
                              onClick={(e) => {
                                handleCopyUrl(e);
                              }}
                            >
                              <i className="fas fa-clone edit-copy-icon"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-12 plr-10">
                    <div className="submit-bottom-div">
                      <div className="submit-bottom-div-row">
                        {/* <a href="#" className="btn btn-common-black btn-black-cancel mr-20">
                        Cancel
                      </a> */}
                        <Link
                          href="#"
                          onClick={() => handleClickEditProfile()}
                          className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel mr-24"
                          id="cancel-edit-profile-btn"
                        >
                          Cancel
                        </Link>

                        <Link
                          onClick={handleOnSaveProfileDetails}
                          to="#"
                          className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-cancel btn-save mr-24"
                          id="cancel-edit-profile-btn"
                        >
                          Save
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingTabComponent;
