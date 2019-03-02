/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import deckReducer from './deckReducer';
export default combineReducers({
 simpleReducer,
 deckReducer
});
