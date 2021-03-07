import { combineReducers } from 'redux';
import listReducer from './listReducer/listReducer';
import articleReducer from './articleReducer/articleReducer';

const rootReducer = combineReducers({
  list: listReducer,
  article: articleReducer,
});

export default rootReducer;
