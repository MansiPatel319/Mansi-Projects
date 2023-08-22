import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import "../../assets/css/select2.min.css";
import "../../assets/css/select-custom.css";
import "../../assets/css/select2-custom.css";
import '../../assets/css/style.css';
import "../../assets/css/user/user-favourites-style.css";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserFavouritesComponent from '../../components/Users/UserFavouritesComponent/UserFavouritesComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from "../../components/Footer/FooterComponent";


function UserFavourites() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push('/user-favourites');
    }
  }, []);
  return (
    <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
      <UserHomeHeaderComponent headerClass="header-div header-div2 header-color-2 clearfix" />
      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
          <div className="pattern-inner-div pattern-upricing-inner-div">
            <section className="our-card-classes-section search-feed-card-classes-section favourites-list-section">
              <UserFavouritesComponent tabName="favoriteClassList" />
            </section>
          </div>
        </div>
      </div>
      <FooterComponent auth />
    </div>
  );
}

export default UserFavourites;
