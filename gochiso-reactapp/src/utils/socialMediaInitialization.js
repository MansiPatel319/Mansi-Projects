/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
export const facebookInitialization = () => {
  window.fbAsyncInit = function () {
    window.FB.init({
      // eslint-disable-next-line no-undef
      appId: process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v8.0',
      frictionlessRequests: true,
      level: 'debug',
      viewMode: 'website',
    });

    window.FB.AppEvents.logPageView();
  };
  (function (d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};
