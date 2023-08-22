import React, { useEffect } from 'react';
import {Helmet} from "react-helmet";
import BannerComponent from './BannerComponent';
import OurClassesComponent from './OurClassesComponent';
import BlockMiddelBanner from './BlockMiddelBanner';
import MeetTheCreatorsComponent from './MeetTheCreatorsComponent';
import TestimonialsComponent from './TestimonialsComponent';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { tokenExpire } from '../../services/auth';
import { useLocation } from 'react-router-dom'
const MainComponent = () => {
  let location = useLocation();
  var eventname="";
  var eventid="";
  if(location.pathname==="/"){
    eventname="PageView";
    eventid="pageview.11";
  }
 
  const userPixelPageviedata = () => {

    const url = getUrl('PageView');
    return get(`${url}?eventName=PageView&eventUrl=/`, true)
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
  }, []);
  return (
    <>
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
    fbq('track', '${eventname}', {eventID: '${eventid}'});`


   }
    </script>
    </Helmet>
    <div className="main-middle-area pt-custom-0">
      <section className="main-banner-section">
        <BannerComponent />
      </section>
      <section className="our-classes-section" id="our-classes-section">
        <OurClassesComponent />
      </section>
      <div className="block-classes-common-pattern-root">
        <BlockMiddelBanner />
      </div>
      <section className="meet-the-creators-section">
        <MeetTheCreatorsComponent />
      </section>
      <section className="testimonials-section" id="testimonials-section">
        <TestimonialsComponent />
      </section>
    </div>
    </>
  );
};

export default MainComponent;
