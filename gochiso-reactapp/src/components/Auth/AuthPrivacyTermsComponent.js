import React from 'react';
import { useSelector } from 'react-redux';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';

function AuthPrivacyTermsComponent() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      <div className="bottom-row-prag">
        <p>
          {lang === 'en' ? (
            <>
              {`${getLangValue(strings.BY_LOGGING_IN, lang)}`}
              {(getLangValue(strings.YOU_AGREE_TO_OUR, lang))}
              <a href={lang === 'en' ? 'https://www.mamoru.earth/terms-and-conditions' : 'https://www.mamoru.earth/terms-and-conditions?lang=ja'} target="_blank" className="btn btn-link" rel="noreferrer">
                {getLangValue(strings.TERMS_OF_SERVICE, lang)}
              </a>
 &nbsp;
              {getLangValue(strings.AND, lang)}
              <a href={lang === 'en' ? 'https://www.mamoru.earth/privacy-policy' : 'https://www.mamoru.earth/privacy-policy?lang=ja'} target="_blank" className="btn btn-link" rel="noreferrer">
                {getLangValue(strings.PRIVACY_POLICY, lang)}
              </a>
            </>
          ) : (
            <>
              {getLangValue(strings.BY_LOGGING_IN, lang)}
              <a href={lang === 'en' ? 'https://www.mamoru.earth/terms-and-conditions' : 'https://www.mamoru.earth/terms-and-conditions?lang=ja'} target="_blank" className="btn btn-link" rel="noreferrer">
                {getLangValue(strings.TERMS_OF_SERVICE, lang)}
              </a>
            &nbsp;
              {getLangValue(strings.AND, lang)}
              <a href={lang === 'en' ? 'https://www.mamoru.earth/privacy-policy' : 'https://www.mamoru.earth/privacy-policy?lang=ja'} target="_blank" className="btn btn-link" rel="noreferrer">
                {getLangValue(strings.PRIVACY_POLICY, lang)}
              </a>
              {(getLangValue(strings.YOU_AGREE_TO_OUR, lang))}
            </>
          )}

        </p>
      </div>
    </>
  );
}

export default AuthPrivacyTermsComponent;
