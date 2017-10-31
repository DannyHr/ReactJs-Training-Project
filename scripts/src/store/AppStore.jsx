import { createStore, combineReducers } from 'redux';
import appReducer from './AppReducer.jsx';
import headerReducer from './HeaderReducer.jsx';
import userReducer from './UserReducer.jsx';

var appStore = createStore(
    combineReducers({
        app: appReducer,
        header: headerReducer,
        user: userReducer
    })
);

export default appStore;