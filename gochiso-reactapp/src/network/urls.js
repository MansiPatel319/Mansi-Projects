/* eslint-disable import/prefer-default-export */
const getBaseUrl = () => process.env.REACT_APP_API_BASE_URL;
// "proxy": "https://staging.gochiso.jp/api/v2.0/",

export const getUrl = (type) => {
  const baseUrl = getBaseUrl();
  switch (type) {
    case 'filter-category-list':
      return `${baseUrl}/get-filter-option?`;
    case 'restaurant-list':
      return `${baseUrl}/get-restaurants?`;
    case 'restaurant-details':
      return `${baseUrl}/get-restaurant-detail?`;
    case 'sign-up':
      return `${baseUrl}/register`;
    case 'sign-in':
      return `${baseUrl}/login`;
    case 'forgot-password':
      return `${baseUrl}/forgot-password-request`;
    case 'reset-password':
      return `${baseUrl}/forgot-password-submit`;
    case 'profile-my-page':
      return `${baseUrl}/get-profile`;
    case 'profile-my-page-statistics':
      return `${baseUrl}/get-profile-statistics`;
    case 'profile-community':
      return `${baseUrl}/get-community-detail`;
    case 'profile-visited-restaurants':
      return `${baseUrl}/get-visited-restaurant`;
    case 'profile-recommended-shops':
      return `${baseUrl}/get-recommended-restaurant`;
    case 'add-restaurant-to-favourite':
      return `${baseUrl}/add-to-favorite-restaurant`;
    case 'add-restaurant-to-visited':
      return `${baseUrl}/add-to-visited-restaurant`;
    case 'update-profile':
      return `${baseUrl}/update-profile`;
    case 'add-shop':
      return `${baseUrl}/add-shop-web`;
    case 'add-recommandation':
      return `${baseUrl}/add-review`;
    default:
      return baseUrl;
  }
};
