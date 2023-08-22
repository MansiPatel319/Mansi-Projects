import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropDownList from '../../UI/DropDownList/DropDownList';
import FavoriteCreatorListComponent from './FavoriteCreatorListComponent';
import FavouriteClassListComponent from './FavouriteClassListComponent';
import ExclusiveCoursePopUpMpdalComponent from '../../ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent'; 
// import { get } from '../../../network/requests';
// import { getUrl } from '../../../network/url';
// 
// import { toast } from 'react-toastify';

function UserFavouritesComponent() {
  const [selectedOption, setSelectedOption] = useState('Classes');
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isModalActive, setisModalActive] = useState(false);
  const favCategoryOption = [
    { label: 'Classes', value: 'Classes' },
    { label: 'Instructors', value: 'Instructors' },
  ];
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const containerStyle = {
    width: '100%!important',
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: 0,
    position: 'relative',
    verticalAlign: ' middle',
  };
  let controlStyle = {
    borderRadius: !isOpenDropDown ? '12px' : '12px 12px 0px 0px',
    padding: '5px 48px 5px 12px',
    background: '#1e1e27',
    border: '1px solid #282a33',
    minHeight: '56px',
    fontWeight: '600',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '0px',
  };
  const valueContainerStyle = {
    color: 'rgb(255 255 255 / 75%)',
    lineHeight: '32px',
    paddingRight: '33px',
    display: 'block',
    paddingLeft: '8px',
    overflow: 'hidden',
    textCverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  const placeholderStyle = {
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '600',
    fontSize: '16px',
  };
  const indicatosContainerStyle = {
    borderRadius: '0 0 0 0',
    height: '44px',
    width: '44px',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '1px',
    right: '1px',
  };
  const indicatorContainerStyle = {
    border: 'none',
    top: 'auto',
    left: 'auto',
    position: 'relative',
    margin: '0',
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px 0 0',
    fontSize: '24px',
    color: '#acacac',
    fontFamily: 'Feather',
  };
  const menuStyle = {
    backgroundColor: '#1e1e27',
    margin: 0,
    padding: 0,
    borderRadius: '0px 0px 12px 12px',
  };
  const menuListStyle = {
    margin: 0,
    padding: 0,
    borderRadius: '0px 0px 12px 12px',
  };
  const optionStyle = {
    background: '#1e1e27',
    color: 'rgb(255 255 255 / 75%)',
    colorActive: '#fff',
    padding: '15px 22px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    lineHeight: ' 25px',
    fontWeight: '500',
    fontSize: '16px',
    letterSpacing: '0.5px',

    // background:'transperent',
  };
  const dropdownIndicatorStyle = {};
  const svgStyle = {
    height: '44px',
    width: '50px',
  };
  const handleClickDropDown = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };
  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  };
  // const getUserPlans = () => {
  //   const url = getUrl('user-plan');
  //   get(url, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 200:
  //           if (status === true) {
  //             // setisPlanPurchased(true);
  //           }
  //           break;
  //         case 400:
  //           // if (userCreatorData.flag_login) {
  //           setisModalActive(true);
  //           // }
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //       }
  //     })
  //     .catch(() => {
  //       // toast.error('Something went wrong', {
  //       //   pauseOnHover: false,
  //       //   position: toast.POSITION.TOP_RIGHT,
  //       // });
  //     });
  //   // setisModalActive(true);
  // };

  const getFavouriteInstructor = () => {};
  useEffect(() => {
    getFavouriteInstructor();
  }, []);

  return (
    <React.Fragment>
      <div className="container container-1200">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="our-card-classes-div favourites-list-div mb-custom-bottom">
              <div className="heading-div">
                <div className="heading-inner-div">
                  <div className="heading-title-row">
                    <div className="heading-title-left">
                      <h2>Favourites</h2>
                    </div>
                    <div className="heading-title-right">
                      <div className="form-group select2-form-group select2-new-group">
                        <div className="select-box select-custom2 select-custom2-general round-12">
                          <DropDownList
                            value={selectedOption}
                            onChange={handleOptionChange}
                            options={favCategoryOption}
                            placeholder="Classes"
                            className="js-select2"
                            id="select-filter"
                            containerStyle={containerStyle}
                            controlStyle={controlStyle}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            handleClick={handleClickDropDown}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selectedOption.value === 'Instructors' ? (
                <FavoriteCreatorListComponent />
              ) : (
                <FavouriteClassListComponent  />
              )}
                             {isModalActive ? (
          <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
        ) : (
          ''
          )}
          </div>
      </div>
      </div>
      </div>
    </React.Fragment>
  );
}

export default UserFavouritesComponent;

UserFavouritesComponent.propTypes = {
  tabElements: PropTypes.object,
};
