import React, { Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/Redux';
import PrivteRoutes from './PrivteRoutes';
import UserPrivateRoute from './UserPrivateRoute';
import CreatorPrivateRoutes from './CreatorPrivateRoutes';
import './assets/css/bootstrap.min.css';
import './assets/css/dev.style.css';
import './assets/css/all.min.css';
import './assets/fonts/gilroy/gilroy-style.css';
import './assets/css/modal-style.css';
import './assets/fonts/moderat/moderat-style.css';
import './assets/css/custom.dev.css';

import Loader from './components/UI/Loader/Loader';
// const Main = lazy(() => import('./pages/Main'));
const CreatorsDetails = lazy(() => import('./pages/CreatorsDetails'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const CreatorDetail = lazy(() => import('./pages/CreatorDetail'));
const UserHome = lazy(() => import('./pages/user/UserHome'));
const UserFavourite = lazy(() => import('./pages/user/UserFavourites'));
const USerLiveStream = lazy(() => import('./pages/user/UserLiveStream'));
const UserClasses = lazy(() => import('./pages/user/UserClasses'));
const UserCreators = lazy(() => import('./pages/user/UserCreators'));
const UserMaterial = lazy(() => import('./pages/user/UserMaterials'));
const UserProfileSettings = lazy(() => import('./pages/user/UserProfileSettings'));
const UserClassDetails = lazy(() => import('./pages/user/UserClassDetails'));
const FlexiblePlans = lazy(() => import('./pages/user/FlexiblePlans'));
const UserBookSeat = lazy(() => import('./pages/user/UserBookSeat'));
const UserOneToOneBooking = lazy(() => import('./pages/user/UserBookOneToOne'));
const UserPaymentDetails = lazy(() => import('./pages/user/UserPaymentDetails'));
const UserPaymentDetailsSuccessfull = lazy(() =>
  import('./pages/user/UserPaymentDetailsSuccessfull'),
);
const UserCreatorsDetails = lazy(() => import('./pages/user/UserCreatorsDetails'));
const ThanksForJoiningLiveStream = lazy(() => import('./pages/user/ThanksForJoiningLiveStream'));
const UserChat = lazy(() => import('./pages/user/UserChat'));
const SelectCategoryQuestion = lazy(() => import('./pages/SelectCategoryQuestion'));
const UserCreatorClassDetail = lazy(() => import('./pages/user/UserCreatorClassDetail'));
const UserMaterialsDetails = lazy(() => import('./pages/user/UserMaterialsDetails'));
const CreatorScheduleStream = lazy(() => import('./pages/creator/CreatorScheduleStream'));
const CreatorHome = lazy(() => import('./pages/creator/CreatorHome'));
const CreatorMyUploads = lazy(() => import('./pages/creator/CreatorMyUploads'));
const CreatorMyEarnings = lazy(() => import('./pages/creator/CreatorMyEarnings'));
const CreatorAffiliateMyEarnings = lazy(() =>
  import('./pages/creator/CreatorAffiliateEarningDetails'),
);
const CreatorOneToOneEarning = lazy(() => import('./pages/creator/CreatorOneToOneEarning'));
const CreatorLiveStreaEarning = lazy(() => import('./pages/creator/CreatorLiveStreamEarnings'));
const CreatorTransferFunds = lazy(() => import('./pages/creator/CreatorTransferFunds'));
const CreatorsProfileSettings = lazy(() => import('./pages/creator/CreatorProfileSettings'));
const CreatorAddClass = lazy(() => import('./pages/creator/CreatorAddAClass'));
const CreatorAddMaterial = lazy(() => import('./pages/creator/CreatorAddMaterial'));
const CreatorChat = lazy(() => import('./pages/creator/CreatorChat'));
const CreatorAffilliate = lazy(() => import('./pages/creator/CreatorAffilliate'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const SetpasswordActiveAcc = lazy(() => import('./pages/SetpasswordActiveAcc'));
const UserPurchases = lazy(() => import('./pages/user/UserPurchase'));
const UserLiveStreamChat = lazy(() => import('./pages/user/UserLiveStreamChat'));
const CreatorLiveStreamChat = lazy(() => import('./pages/creator/CreatorLiveStreamChat'));
const FeedSearch = lazy(() => import('./pages/user/FeedSearch'));
const UserTerms = lazy(() => import('./pages/user/UserTerms'));
const CreatorTerms = lazy(() => import('./pages/creator/CreatorTerms'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const AwsUpload = lazy(() => import('./AwsFileUploader'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route exact path="/" component={Login} />
            <Route exact path="/user-terms-of-service" component={UserTerms} />
            <Route exact path="/instructor-terms-of-service" component={CreatorTerms} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/creators-details" component={CreatorsDetails} />
            <Route exact path="/:slag/login" component={Login} />
            <Route exact path="/user/signup/:slag/login" component={Login} />
            <Route exact path="/:name/signup" component={Signup} />
            <Route exact path="/:name/signup/:uuid" component={Signup} />
            <Route exact path="/creator-detail/:id" component={CreatorDetail} />
            <Route exact path="/user-home" component={UserHome} />
            <Route exact path="/user-feed-search/:keyword" component={FeedSearch} />
            <PrivteRoutes exact path="/user-favourites" component={UserFavourite} />
            <UserPrivateRoute exact path="/user-live-stream" component={USerLiveStream} />
            <Route exact path="/user-creator-class-detail/:id" component={UserCreatorClassDetail} />
            <UserPrivateRoute exact path="/user-classes" component={UserClasses} />
            <UserPrivateRoute exact path="/user-class-details/:id" component={UserClassDetails} />
            <UserPrivateRoute exact path="/user-creators" component={UserCreators} />
            <UserPrivateRoute
              exact
              path="/user-creators-details/:id"
              component={UserCreatorsDetails}
            />
            <UserPrivateRoute exact path="/user-material" component={UserMaterial} />
            <Route exact path="/user-materials-details/:id" component={UserMaterialsDetails} />
            <PrivteRoutes exact path="/user-profile-setting" component={UserProfileSettings} />
            <PrivteRoutes exact path="/flexible-plans" component={FlexiblePlans} />
            <Route exact path="/pricing" component={FlexiblePlans} />
            <Route exact path="/user-book-a-seat/:id" component={UserBookSeat} />
            <Route exact path="/user-one-to-one-book/:id" component={UserOneToOneBooking} />
            <PrivteRoutes exact path="/user-payment-details" component={UserPaymentDetails} />
            <PrivteRoutes
              exact
              path="/user-payment-details-successfull"
              component={UserPaymentDetailsSuccessfull}
            />

            <Route exact path="/:slag/forgot-password" component={ForgotPassword} />
            <Route exact path="/user/forgot-password/:uuid" component={ResetPassword} />
            <Route exact path="/user-setpassword/:token" component={SetpasswordActiveAcc} />
            <PrivteRoutes exact path="/user-purchase" component={UserPurchases} />
            <Route exact path="/user-livestream-chat/:streamId" component={UserLiveStreamChat} />
            <Route
              exact
              path="/thanks-for-joining-live-stream/:id"
              component={ThanksForJoiningLiveStream}
            />
            <Route exact path="/user-chat/:date/:sessionId" component={UserChat} />
            {/* <Route exact path="/user-chat" component={UserChat} /> */}
            <UserPrivateRoute
              exact
              path="/select-category-question"
              component={SelectCategoryQuestion}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-schedule-stream"
              component={CreatorScheduleStream}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-schedule-stream/edit/:id"
              component={CreatorScheduleStream}
            />
            <CreatorPrivateRoutes exact path="/creator-home" component={CreatorHome} />
            <CreatorPrivateRoutes
              exact
              path="/creator-my-uploads/:slug"
              component={CreatorMyUploads}
            />
            <CreatorPrivateRoutes exact path="/creator-my-earnings" component={CreatorMyEarnings} />
            <CreatorPrivateRoutes
              exact
              path="/creator-affiliate-earnings"
              component={CreatorAffiliateMyEarnings}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-one-to-one-earnings"
              component={CreatorOneToOneEarning}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-live-stream-earnings"
              component={CreatorLiveStreaEarning}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-transfer-funds"
              component={CreatorTransferFunds}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-profile-setting"
              component={CreatorsProfileSettings}
            />
            <CreatorPrivateRoutes exact path="/creator-add-a-class" component={CreatorAddClass} />
            <CreatorPrivateRoutes
              exact
              path="/creator-add-a-class/edit/:id"
              component={CreatorAddClass}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-add-material"
              component={CreatorAddMaterial}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-add-material/edit/:id"
              component={CreatorAddMaterial}
            />
            <CreatorPrivateRoutes
              exact
              path="/creator-affilliate/:slug"
              component={CreatorAffilliate}
            />
            <CreatorPrivateRoutes exact path="/creator-chat/:sessionId" component={CreatorChat} />
            <CreatorPrivateRoutes
              exact
              path="/creator-livestream-chat/:streamId"
              component={CreatorLiveStreamChat}
            />
            {/* <Route exact path="/creator-chat" component={CreatorChat} /> */}
            <Route exact path="/aws-upload" component={AwsUpload} />
          </Suspense>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
