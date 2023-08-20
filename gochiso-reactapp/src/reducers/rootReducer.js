import { combineReducers } from 'redux';
import FilterCategory from './FilterCategory';
import SearchKeyword from './SearchKeyword';
import FormattedAddress from './FormattedAddress';
import LocationLatitude from './LocationLatitude';
import LocationLongitude from './LocationLongitude';
import PlaceKeyword from './PlaceKeyword';
import SustainKeyword from './SustainKeyword';
import DefaultLanguage from './DefaultLanguage';
import ZoomLevel from './ZoomLevel';
import RadiusLevel from './RadiusLevel';
import SearchPinLatitude from './SearchPinLatitude';
import SearchPinLongitude from './SearchPinLongitude';
import addRedirection from './addRedirection';
import UserProfile from './UserProfile';

const rootReducer = combineReducers({
  search: SearchKeyword,
  filterCategory: FilterCategory,
  formattedAddress: FormattedAddress,
  locationLatitude: LocationLatitude,
  locationLongitude: LocationLongitude,
  searchPinLatitude: SearchPinLatitude,
  searchPinLongitude: SearchPinLongitude,
  defaultLanguage: DefaultLanguage,
  placeKeyword: PlaceKeyword,
  sustainKeyword: SustainKeyword,
  zoomLevel: ZoomLevel,
  radiusLevel: RadiusLevel,
  redirection: addRedirection,
  user: UserProfile,
});

export default rootReducer;
