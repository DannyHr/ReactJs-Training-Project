import { createStore, combineReducers } from 'redux';
import appReducer from './AppReducer.jsx';
import headerReducer from './HeaderReducer.jsx';

var appStore = createStore(
    combineReducers({
        app: appReducer,
        header: headerReducer
    })
);

export default appStore;