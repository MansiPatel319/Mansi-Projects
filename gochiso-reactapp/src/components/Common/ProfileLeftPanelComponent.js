/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import { tokenExpire } from '../../services/Auth';

toast.configure();

function LeftPanelLink(data) {
  return (
    <li className={data.listClassName}>
      <a
        href={data.linkUrl}
        className={data.linkClassName}
        onClick={data.linkOnClick || ''}
        target={data.target}
      >
        {data.linkTitle}
      </a>
    </li>
  );
}

function ProfileLeftPanelComponent() {
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const onLogoutClickHandler = () => {
    tokenExpire(400, history);
    toast.success(getLangValue(strings.SUCCESS_LOGOUT, lang), {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <div className="profile-left-div col-lg-3 col-md-4 plr-10">
        <div className="profile-left-root">
          <div className="profile-left-root-row">
            <div className="profile-left-top-div">
              <div className="heading-div">
                <h1>{getLangValue(strings.MY_PROFILE, lang)}</h1>
              </div>

              <div className="tab-custom-div">
                <div className="tab-custom-row">
                  <ul className="tab-custom-list">
                    <LeftPanelLink
                      listClassName={
                        window.location.pathname === `/${lang}/profile` ? 'active' : ''
                      }
                      linkUrl={`/${lang}/profile`}
                      linkClassName="tab-link"
                      linkTitle={getLangValue(strings.MY_PAGE, lang)}
                    />
                    <LeftPanelLink
                      listClassName={
                        window.location.pathname === `/${lang}/community`
                          ? 'active'
                          : ''
                      }
                      linkUrl={`/${lang}/community`}
                      linkClassName="tab-link"
                      linkTitle={getLangValue(strings.COMMUNITY, lang)}
                    />
                  </ul>
                </div>
              </div>
            </div>

            <div className="profile-left-bottom-div">
              <div className="link-custom-div">
                <div className="link-custom-row">
                  <ul className="link-custom-list">
                    <LeftPanelLink
                      listClassName=""
                      linkUrl="#"
                      linkClassName="link"
                      linkTitle={getLangValue(strings.ACCOUNT_SETTINGS, lang)}
                    />
                    <LeftPanelLink
                      listClassName=""
                      linkUrl={lang === 'en' ? 'https://www.mamoru.earth/contact-us' : 'https://www.mamoru.earth/contact-us?lang=ja'}
                      linkClassName="link"
                      linkTitle={getLangValue(strings.SEND_US_FEEDBACK, lang)}
                      target="_blank"
                    />
                    <LeftPanelLink
                      listClassName=""
                      linkUrl={lang === 'en' ? 'https://www.mamoru.earth/support' : 'https://www.mamoru.earth/faq-jp'}
                      linkClassName="link"
                      linkTitle={getLangValue(strings.FAQ, lang)}
                    />
                    <LeftPanelLink
                      listClassName=""
                      linkUrl={lang === 'en' ? 'https://www.mamoru.earth/privacy-policy' : 'https://www.mamoru.earth/privacy-policy?lang=ja'}
                      linkClassName="link"
                      linkTitle={getLangValue(strings.PRIVACY_POLICY, lang)}
                      target="_blank"

                    />
                    <LeftPanelLink
                      listClassName=""
                      linkUrl={lang === 'en' ? 'https://www.mamoru.earth/terms-and-conditions' : 'https://www.mamoru.earth/terms-and-conditions?lang=ja'}
                      linkClassName="link"
                      linkTitle={getLangValue(strings.TERMS_OF_SERVICE, lang)}
                      target="_blank"

                    />
                    <LeftPanelLink
                      listClassName=""
                      linkUrl="#"
                      linkClassName="link"
                      linkTitle={getLangValue(strings.LOGOUT, lang)}
                      linkOnClick={onLogoutClickHandler}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileLeftPanelComponent;
