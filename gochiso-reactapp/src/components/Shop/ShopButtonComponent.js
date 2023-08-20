/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import setRedirectPath from '../../actions/addRedirection';
import '../../assets/css/profile-style.css';
import { post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ButtonElement from '../../UI/ButtonElement';

toast.configure();

function ShopButtonComponent({ shopDetails, getShopDetailsData, setisLoading }) {
  const { restaurant: { is_favorite, is_visited, id } } = shopDetails;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const addToFavourite = () => {
    setisLoading(true);
    const url = getUrl('add-restaurant-to-favourite');
    const formData = new FormData();
    formData.append('restaurant_id', id);
    formData.append('lang', lang);
    if (localStorage.getItem('token') === null) {
      setisLoading(false);
      dispatch(setRedirectPath(location.pathname));
      return history.push(`/${lang}/login`);
    }
    return post(`${url}?api_token=${localStorage.getItem('token')}`, formData)
      .then((response) => {
        const {
          data: { messages, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              toast.success(messages, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              getShopDetailsData();
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
  const addToVisited = () => {
    setisLoading(true);
    const url = getUrl('add-restaurant-to-visited');
    const formData = new FormData();
    formData.append('restaurant_id', id);
    formData.append('lang', lang);
    if (localStorage.getItem('token') === null) {
      setisLoading(false);
      dispatch(setRedirectPath(location.pathname));
      return history.push(`/${lang}/login`);
    }
    return post(`${url}?api_token=${localStorage.getItem('token')}`, formData)
      .then((response) => {
        const {
          data: { messages, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              toast.success(messages, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              getShopDetailsData();
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
  return (
    <div className="community-button-card-root add-fv-shop-btn-root">
      <div className="btn-row-div">
        <div className="btn-col-div mr-15">
          <div className="community-button-div">
            <ButtonElement
              onClick={() => addToFavourite()}
              className={is_favorite ? 'btn btn-community-button active' : 'btn btn-community-button'}
              label={(
                <>
                  <span className="material-icons-outlined">
                    favorite_border
                  </span>
                  {getLangValue(strings.ADD_TO_FAVORITE, lang)}
                </>
              )}
            />
          </div>
        </div>

        <div className="btn-col-div">
          <div className="community-button-div">
            <ButtonElement
              onClick={() => addToVisited()}
              label={(
                <>
                  <span className="material-icons-outlined">
                    fiber_manual_record
                  </span>
                  {getLangValue(strings.VISITED, lang)}
                </>
            )}
              className={is_visited ? 'btn btn-community-button active' : 'btn btn-community-button'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopButtonComponent;
