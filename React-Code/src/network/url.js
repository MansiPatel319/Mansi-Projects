const getBaseUrl = () => {
  // eslint-disable-next-line no-undef
  const dev = process.env.NODE_ENV === 'development';
  if (dev) {
    // return "http://3.139.122.63:8000";
    return '';
  } else {
    return '';
  }
};
export const getUrl = (type) => {
  const baseUrl = getBaseUrl();
  switch (type) {
    case 'country-list':
      return `${baseUrl}/user/get-country-list`;
    case 'user_signup':
      return `${baseUrl}/user/signup/`;
    case 'creator_signup':
      return `${baseUrl}/creator/register/`;
    case 'user_login':
      return `${baseUrl}/user/login/`;
    case 'creator_login':
      return `${baseUrl}/creator/login/`;
    case 'logout':
      return `${baseUrl}/user/logout/`;
    case 'getListOfClasses':
      return `${baseUrl}/user/class-filter/`;
    case 'getUserCardDetails':
      return `${baseUrl}/user/card`;
    case 'getCreatorDetails':
      return `${baseUrl}/creator/creator-detail/`;
    case 'getKeywordsDetails':
      return `${baseUrl}/creator/keywords/`;
    case 'request_slot':
      return `${baseUrl}/user/no-slot-available/`;  
    case 'getSearchClassesDetails':
      return `${baseUrl}/user/class-search/`;
    case 'getStreamsData':
      return `${baseUrl}/user/stream-search/`;
    case 'userCreatorClassDetails':
      return `${baseUrl}/creator/class-detail`;
    case 'creatorList':
      return `${baseUrl}/creator/creator-list/`;
    case 'creatorDetails':
      return `${baseUrl}/creator/creator-detail`;
    case 'userMaterials':
      return `${baseUrl}/creator/material-category/`;
    case 'userMaterialDetails':
      return `${baseUrl}/user/material-listing`;
    case 'userClassReviewPost':
      return `${baseUrl}/user/class-review/`;
    case 'getUserSimilarClassFilters':
      return `${baseUrl}/user/class-filter/`;
    case 'getFavClassesList':
      return `${baseUrl}/user/favourite-class/`;
    case 'postFavClass':
      return `${baseUrl}/user/favourite-class/`;
    case 'removeFavClass':
      return `${baseUrl}/user/favourite-class/`;
    case 'getUserStreams':
      return `${baseUrl}/creator/creator-streams/`;
    case 'getCreatorSimilarMaterial':
      return `${baseUrl}/creator/creator-material/`;
    case 'getUserProfileData':
      return `${baseUrl}/user/profile/`;
    case 'getCreatorListForUpcomingStream':
      return `${baseUrl}/creator/creator-list/`;
    case 'getUpcomingStreamList':
      return `${baseUrl}/user/stream-search/?`;
    case 'getUpcomingStreamDetails':
      return `${baseUrl}/user/stream-detail/`;
    case 'postCreatorReview':
      return `${baseUrl}/user/creator-review/`;
    case 'get_all_user_plans':
      return `${baseUrl}/user/plans/`;
    case 'get_user_testimonials_data':
      return `${baseUrl}/user/testimonials/`;
    case 'plane_purchase_post':
      return `${baseUrl}/user/purchase-plan/`;
    case 'book_a_seat_post':
      return `${baseUrl}/user/book-stream/`;
    case 'get_one_to_one_session':
      return `${baseUrl}/creator/sessions-list/`;
    case 'post_one_to_one_session':
      return `${baseUrl}/user/book-session/`;
    case 'user-plan':
      return `${baseUrl}/user/user-plan/`;
    case 'user-notification':
      return `${baseUrl}/user/notifications/`;
    case 'forgot-password':
      return `${baseUrl}/user/forgot-password/`;
    case 'reset-password':
      return `${baseUrl}/user/set-password/`;
    case 'setpassword-user':
       return `${baseUrl}/user/setpassword-user/`;
    case 'Active-user':
      return `${baseUrl}/user/activate-user/`;
    case 'paypal_stream_booking':
      return `${baseUrl}/user/paypal-book-stream/`;
    case 'paypal_session_booking':
      return `${baseUrl}/user/paypal-book-session/`;
    case 'paypal_plan_subscription':
      return `${baseUrl}/user/paypal-subscription/`;
    case 'cancel_plan_subscription':
      return `${baseUrl}/user/cancel-subscription/`;
    case 'update_plan_subscription':
      return `${baseUrl}/user/change-subscription/`;
    case 'user_stream_listing':
      return `${baseUrl}/user/booked-streams/`;
    case 'user_session_listing':
      return `${baseUrl}/user/booked-sessions/`;
    case 'get_screen_share_status':
      return `${baseUrl}/creator/session-screen-share`;
    case 'join_channel':
      return `${baseUrl}/creator/channel-token/`;
    case 'end_session':
      return `${baseUrl}/creator/end-call/`;
    case 'user_channel_credentials':
      return `${baseUrl}/user/join-call/`;
    case 'user_stream_join':
      return `${baseUrl}/user/join-call/`;
    case 'user_left_stream':
      return `${baseUrl}/user/leave-call/`;
    case 'get_stream_screen_share_status':
      return `${baseUrl}/creator/stream-screen-share`;
    case 'remove_fav_creator':
      return `${baseUrl}/user/favourite-creator/`;
    case 'getFavCreatorList':
      return `${baseUrl}/user/favourite-creator`;
    case 'PageView':
      return `${baseUrl}/user/pixel/`;

    //creator API urls
    case 'get_all_creator_material':
      return `${baseUrl}/creator/creator-material`;
    case 'creator_material':
      return `${baseUrl}/creator/material`;
    case 'get_all_creator_my_classes':
      return `${baseUrl}/creator/my-classes/`;
    case 'creator_class':
      return `${baseUrl}/creator/class`;
    case 'creator_profile':
      return `${baseUrl}/creator/profile/`;
    case 'get_all_creator_my_sessions':
      return `${baseUrl}/creator/my-sessions/`;
    case 'creator_sessions':
      return `${baseUrl}/creator/session/`;
    case 'get_all_creator_my-streams':
      return `${baseUrl}/creator/my-streams/`;
    case 'get_all_creator_session-seat-holder':
      return `${baseUrl}/user/session-seat-holders/`;
    case 'creator_streams':
      return `${baseUrl}/creator/stream/`;
    case 'get_creator_streams_details':
      return `${baseUrl}/user/stream-detail/`;
    case 'get_creator_streams_seat_holder_list':
      return `${baseUrl}/user/stream-seat-holders`;
    case 'get_creator_earning_history':
      return `${baseUrl}/creator/total-earnings/`;
    case 'get_creator_class_details':
      return `${baseUrl}/creator/class-detail/`;
    case 'get_creator_notifiction':
      return `${baseUrl}/user/notifications/`;
    case 'get_read_creator_notifiction':
      return `${baseUrl}/user/notification/read/`;
    case 'remove_creator_notifiction':
      return `${baseUrl}/user/notification/remove/`;
    case 'get_check_stripe_connection':
      return `${baseUrl}/creator/check-stripe-connect/`;
    case 'creator_stripe_connection':
      return `${baseUrl}/creator/stripe-connect/`;
    case 'creator_stripe_disconnection':
      return `${baseUrl}/creator/stripe-disconnect/`;
    case 'get_creator_fund_history':
      return `${baseUrl}/creator/funds-history/`;
    case 'user_facebook_login':
      return `${baseUrl}/user/rest-auth/facebook/`;
    case 'user_google_login':
      return `${baseUrl}/user/rest-auth/google/`;
    case 'affilliate_users':
      return `${baseUrl}/creator/affiliated-users/`;
    case 'affilliate_record':
      return `${baseUrl}/creator/affiliation-record/`;
    case 'affilliate_earning':
      return `${baseUrl}/creator/affiliation-earnings-chart/`;
    case 'live_stream_earning':
      return `${baseUrl}/creator/stream-earnings-chart/`;
    case 'session_earning':
      return `${baseUrl}/creator/session-earnings-chart/`;
    case 'stream_booking_user_listing':
      return `${baseUrl}/creator/stream-user-listing/`;
    case 'session_booking_user_listing':
      return `${baseUrl}/creator/session-user-listing/`;
    case 'affiliate_user_listing':
      return `${baseUrl}/creator/affiliate-user-listing/`;
    case 'get_timezone':
      return `${baseUrl}/creator/timezones/`;
    case 'payout_listing':
      return `${baseUrl}/creator/payouts-listing/`;
    case 'active_user_list':
      return `${baseUrl}/creator/stream-users`;
    case 'post_active_host':
      return `${baseUrl}/creator/stream-host`;
    case 'paymentIntent':
      return `${baseUrl}/user/payment-confirm/`;  
    default:
      return baseUrl;
  }
};
