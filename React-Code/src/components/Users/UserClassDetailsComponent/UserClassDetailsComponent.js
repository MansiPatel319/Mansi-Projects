import React, { useState, useEffect } from 'react';
import '../../../assets/css/owl-slider-style.css';
import UserClassDetailsBannerComponent from './UserClassDetailsBannerComponent';
import { useParams, useHistory } from 'react-router-dom';
import { getUrl } from '../../../network/url';
import { get } from "../../../network/requests";
import { toast } from 'react-toastify';
import { tokenExpire } from "../../../services/auth";
import Loader from "../../../components/UI/Loader/Loader";
import UserSimilarClassComponent from "../../Users/UserSimilarClassComponent/UserSimilarClassComponent";
import FooterComponent from "../../Footer/FooterComponent";
toast.configure();
function UserClassDetailsComponent() {
  const params = useParams();
  const history = useHistory();
  const keywords = [];
  const [isLoading, setisLoading] = useState(false);
  const [keywordsArray, setKeywords] = useState('');

  const handleLoader = (isDataLoading) => {
    setisLoading(isDataLoading);
  }

  const getUserCreatorClassData = () => {
    const url = getUrl("userCreatorClassDetails");
    return get(`${url}/${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              for (let i = 0; i < data.class_keywords.length; i++) {
                keywords.push(data.class_keywords[i].id);
              }
              setKeywords(keywords.toString());
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
        tokenExpire(error.response, history);
      });
  }


  useEffect(() => {
    getUserCreatorClassData();
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <section className="single-course-section">
        <UserClassDetailsBannerComponent creatorId={params.id} />
      </section>
      <section className="single-course-similar-classes-section pb-100px" id="single-course-similar-classes-section">
        {keywordsArray && keywordsArray.length > 0 && <UserSimilarClassComponent searchKeyword={keywordsArray} handleLoader={handleLoader} creatorId={params.id} />}
      </section>
      <FooterComponent auth />
    </React.Fragment>
  );
}

export default UserClassDetailsComponent;
