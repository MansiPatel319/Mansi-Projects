import { combineReducers } from 'redux';
import authUser from '../reducers/users';
import CreatorMaterial from './CreatorMaterial';
import UserSearchResult from './SearchResult';
import CreatorScheduleStream from './CreatorScheduleStream';
import CreatorFileStore from './CreatorFileStore';
import AddDetails from './AddDetails';
import FavClassDetail from './FavClassDetail';
import PreviousRoutes from './HandlePreviousRoutes';
import SetCreatorId from './SetCreatorId';
import Chat from './ChatReducer';
import JoiningType from './JoiningType';
const rootReducer = combineReducers({
  authUser,
  CreatorMaterial,
  UserSearchResult,
  CreatorScheduleStream,
  CreatorFileStore,
  AddDetails,
  FavClassDetail,
  PreviousRoutes,
  SetCreatorId,
  Chat,
  JoiningType
});

export default rootReducer;
