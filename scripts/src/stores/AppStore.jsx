import { createStore, combineReducers } from 'redux';
import appReducer from '../reducers/AppReducer.jsx';
import headerReducer from '../reducers/HeaderReducer.jsx';

var appStore = createStore(
    combineReducers({
        app: appReducer,
        header: headerReducer
    })
);

export default appStore;