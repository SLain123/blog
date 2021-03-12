import { combineReducers } from 'redux';
import listReducer from './listReducer/listReducer';
import articleReducer from './articleReducer/articleReducer';
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  list: listReducer,
  article: articleReducer,
  user: userReducer,
});

export default rootReducer;
