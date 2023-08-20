/* eslint-disable no-case-declarations */
import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import './assets/css/bootstrap.min.css';
import './assets/fonts/muli/muli.css';
import './assets/css/feather.min.css';
import './assets/css/all.min.css';
import './assets/css/animate.css';
import './assets/css/splide.min.css';
import './assets/css/style.css';
import './assets/css/custom.dev.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './UI/Loader/Loader';
import setLanguage from './actions/setLanguage';
import PrivateRoute from './services/PrivateRoute';

const HomeRedirect = lazy(() => import('./pages/HomeRedirect'));
const Main = lazy(() => import('./components/Main'));
const Map = lazy(() => import('./components/Map/MainMapComponent'));
const Shop = lazy(() => import('./components/Shop/MainShopComponent'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileCommunity = lazy(() => import('./pages/ProfileCommunity'));
const Demo = lazy(() => import('./pages/DemoComponent'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const EmailConfirmation = lazy(() => import('./pages/EmailConfirmation'));
const AddPlace = lazy(() => import('./components/AddPlace/AddPlaceComponent'));

function App() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.defaultLanguage.lang);

  useEffect(() => {
    if (
      navigator.language.toLowerCase() === 'ja' || navigator.language.toLowerCase() === 'ja-jp'
    ) {
      dispatch(setLanguage('jp'));
    } else {
      dispatch(setLanguage('en'));
    }
  }, []);

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    switch (pathArray[1]) {
      case 'en':
        const newURLEn = pathArray.join('/');
        return <Redirect to={newURLEn} />;
      case 'jp':
        dispatch(setLanguage('jp'));
        const newURLJp = pathArray.join('/');
        return <Redirect to={newURLJp} />;
      default:
        return <Redirect to="/" />;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path="/" component={HomeRedirect} />
          <Route exact path="/:lng/" component={Main} />
          <Route exact path="/:lng/map" component={Map} />
          <Route exact path="/:lng/shop/:id" component={Shop} />
          <Route exact path="/:lng/demo" component={Demo} />
          <Route exact path="/:lng/login" component={Login} />
          <Route exact path="/:lng/signup" component={Signup} />
          <Route exact path="/:lng/forgot-password" component={ForgotPassword} />
          <Route exact path="/:lng/password-reset/:token" component={ResetPassword} />
          <Route exact path="/:lng/email-confirmed" component={EmailConfirmation} />
          <Route exact path="/:lng/add-place" component={AddPlace} />
          <PrivateRoute
            exact
            path="/:lng/profile"
            component={Profile}
            lang={lang}
          />
          <PrivateRoute
            exact
            path="/:lng/community"
            component={ProfileCommunity}
            lang={lang}
          />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
