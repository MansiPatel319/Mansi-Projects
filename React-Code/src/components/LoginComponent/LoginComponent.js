import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { tokenExpire } from '../../services/auth';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { Helmet } from "react-helmet";
import LoginFormComponent from './LoginFormComponent';
import { useLocation } from 'react-router-dom';
function LoginComponent({ linkTextName }) {

  let location = useLocation();
  const userPixelPageviedata = () => {
    const url = getUrl('PageView');
    var geturl=`${url}?eventName=ViewContent&eventUrl=${location.pathname}`;
    return get(geturl, true)
      .then((response) => {
        const {
          data: { code },
        } = response;
        switch (code) {
          case 201:
         
            break;
          case 400:
           
            break;
          default:
           
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    userPixelPageviedata();
  }, [location.pathname]);

  return (
    <React.Fragment>
        <Helmet>
        <script>
          {
            ` !(function(f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function() {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '599100727404477');
            fbq('track', 'ViewContent' ,  {eventID: 'viewcontent.16'});`
          }
        </script>
      </Helmet>

      <LoginFormComponent isSignup={linkTextName} />
    </React.Fragment>
  );
}

export default LoginComponent;


LoginComponent.propTypes = {
  linkTextName: PropTypes.string,
}
