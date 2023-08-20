import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import images from '../resources/images';
import ImageElement from '../UI/ImageElement';
import '../assets/css/email-confirmation-style.css';
import getLangValue from '../resources/language';
import strings from '../resources/strings';

const EmailConfirmation = () => {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push(`/${lang}/`);
    }, 5000);
  }, []);

  return (
    <div id="wrapper" className="wrapper login-wrapper w-100">

      <div className="main-middle-area pt-custom-0">

        <section className="email-confirmation-section" id="email-confirmation-section">
          <div className="email-confirmation-div">

            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">

                  <div className="email-confirmation-root-div">

                    <div className="ec-logo-div">
                      <Link to="/" className="img-logo-link">
                        <ImageElement
                          src={images.Logo}
                          className="img-fluid img-responsive"
                          alt="logo"
                        />
                      </Link>
                    </div>

                    <div className="heading-div">
                      <h2>{getLangValue(strings.YOUR_EMAIL_IS_CONFIRM, lang)}</h2>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default EmailConfirmation;
