import { GLOBALS } from '../../src/common/constants.js';
import * as ACTIONS from '../../src/actions/actionTypes.js';

var userReducer = function (state, action) {
    switch (action.type) {
    case ACTIONS.LOGIN_USER:
        console.log(action.userData);
        localStorage.setItem(GLOBALS.AUTH_TOKEN, action.userData.authToken);
        localStorage.setItem(GLOBALS.AUTH_ID, action.userData.id);
        localStorage.setItem(GLOBALS.AUTH_USERNAME, action.userData.username);

        return Object.assign({}, state, {
            userIsLoggedIn: true,
            currentUser: action.userData
        });
    case ACTIONS.LOGOUT_USER:
        localStorage.removeItem(GLOBALS.AUTH_TOKEN);
        localStorage.removeItem(GLOBALS.AUTH_ID);
        localStorage.removeItem(GLOBALS.AUTH_USERNAME);
        
        return Object.assign({}, state, {
            userIsLoggedIn: false,
            currentUser: {}
        });
    default:
        return state || {
            userIsLoggedIn: false,
            currentUser: {}
        };
    }
};

export default userReducer;