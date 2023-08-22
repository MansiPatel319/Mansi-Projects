/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
require('dotenv').config();

import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivteRoutes from './PrivteRoutes';
import { setLanguage } from './Store/Actions';
import AppContext from './Store/AppContext';

const Tooltip = lazy(() => import('./Pages/Tooltip'));
const StoreExamples = lazy(() => import('./Pages/StoreExample'));
const ReactMemo = lazy(() => import('./Pages/ReactMemo'));
const WithOutUseCallBackORMemo = lazy(() =>
  import('./Pages/WithOutUseCallBackORMemo'),
);
const ReactUseCallBack = lazy(() => import('./Pages/ReactUseCallBack'));
const ListingDemo = lazy(() => import('./Pages/ListingDemo'));
const WebPConverter = lazy(() => import('./Pages/WebPConverter'));
const ValidationCommonForm = lazy(() => import('./Pages/ValidationCommonForm'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const PageNotFound = lazy(() => import('./Pages/Auth/PageNotFound'));
const CustomHooksExample = lazy(() => import('./Pages/CustomHooksExample'));
const MemoAndCallbackFuncation = lazy(() =>
  import('./Pages/MemoAndCallbackFuncation'),
);

function Routes() {
  const [, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (
      navigator.language.toLowerCase() === 'ja' ||
      navigator.language.toLowerCase() === 'ja-jp'
    ) {
      // dispatch(setLanguage('jp'));
      setLanguage(dispatch, 'jp');
    } else {
      setLanguage(dispatch, 'en');
    }
  }, []);

  return (
    <Router>
      <Suspense fallback="Loading...">
        <Switch>
          <Route exact path="/" component={Tooltip} />
          <PrivteRoutes exact path="/storeExample" component={StoreExamples} />
          <PrivteRoutes exact path="/reactMemo" component={ReactMemo} />
          <PrivteRoutes
            exact
            path="/reactWithOutHooks"
            component={WithOutUseCallBackORMemo}
          />
          <PrivteRoutes
            exact
            path="/reactCallback"
            component={ReactUseCallBack}
          />
          <PrivteRoutes
            exact
            path="/reactListingDemo"
            component={ListingDemo}
          />
          <PrivteRoutes
            exact
            path="/reactWebPConverter"
            component={WebPConverter}
          />
          <PrivteRoutes
            exact
            path="/validationCommonForm"
            component={ValidationCommonForm}
          />
          <Route exact path="/login" component={Login} />
          <PrivteRoutes
            exact
            path="/customhook"
            component={CustomHooksExample}
          />
          <PrivteRoutes
            exact
            path="/memo_and_callback"
            component={MemoAndCallbackFuncation}
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
