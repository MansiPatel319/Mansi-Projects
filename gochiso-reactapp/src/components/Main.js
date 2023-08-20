/* eslint-disable no-unused-expressions */
import React from 'react';
import HeaderComponent from './Header/HeaderComponent';
import DashboardMiddleComponent from './Homepage/DashboardMiddleComponent';
import '../assets/css/home-style.css';
// import SplashScreen from '../pages/SplashScreen';
// import useCheckScreen from './Common/useCheckScreen';

function Main() {
  // const { isMobile } = useCheckScreen();
  // const [showSplash, setShowSplash] = useState(false);
  // let x = 0;
  // useEffect(() => {
  //   if (isMobile) {
  //     setShowSplash(true);
  //     const splashScreenInterval = setInterval(() => {
  //       x += 500;
  //       if (x === 5000) {
  //         setShowSplash(false);
  //         clearInterval(splashScreenInterval);
  //       }
  //     }, 500);
  //     () => { clearInterval(splashScreenInterval); };
  //   }
  // }, []);
  return (
    <>

      <div id="wrapper" className="wrapper home-wrapper w-100">
        <HeaderComponent />
        <div className="main-middle-area">
          <DashboardMiddleComponent />
        </div>
      </div>

    </>
  );
}

export default Main;
