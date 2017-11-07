import axios from 'axios';
import { GLOBALS } from './constants.js';

var appKey = 'kid_r1I-YDgRZ';
var appSecret = 'f8486c7c0fcd48bead064ed9e9aa7721';
var basicAuth = 'Basic ' + btoa(appKey + ':' + appSecret);
var baseUrl = 'https://baas.kinvey.com';

function buildHeaders(authorization) {
    return {
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json'
        }
    };
}

export function loginUser(data) {
    var serviceUrl = baseUrl + '/user/' + appKey + '/login';
    var config = buildHeaders(basicAuth);

    var data = {
        'username': data.username,
        'password': data.password
    };

    return axios.post(serviceUrl, data, config);
}

export function retrieveUser() {
    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var authId = localStorage.getItem(GLOBALS.AUTH_ID);

    var serviceUrl = baseUrl + '/user/' + appKey + '/' + authId;
    var config = buildHeaders('Kinvey ' + authToken);

    return axios.get(serviceUrl, config);
}

export function logoutUser() {
    var serviceUrl = baseUrl + '/user/' + appKey + '/_logout';
    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var config = buildHeaders('Kinvey ' + authToken);

    return axios.post(serviceUrl, null, config);
}

export function getAllItems() {
    var serviceUrl = baseUrl + '/appdata/' + appKey + '/items';
    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var config = buildHeaders('Kinvey ' + authToken);

    return axios.get(serviceUrl, config);
}

export function getItem(id) {
    var serviceUrl = baseUrl + '/appdata/' + appKey + '/items';
    var query = '?query={"_id":"' + id + '"}';

    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var config = buildHeaders('Kinvey ' + authToken);

    return axios.get(serviceUrl + query, config);
}

export function addItemToCart(userId, itemId) {
    var serviceUrl = baseUrl + '/appdata/' + appKey + '/users-cart-items';
    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var config = buildHeaders('Kinvey ' + authToken);

    var data = {
        userId: userId,
        itemId: itemId
    };

    return axios.post(serviceUrl, data, config);
}

export function deleteItemFromCart(userId, itemId) {
    var serviceUrl = baseUrl + '/appdata/' + appKey + '/users-cart-items';
    var query = '?query={"userId":"' + userId + '","itemId":"' + itemId + '"}';

    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var config = buildHeaders('Kinvey ' + authToken);

    return axios.delete(serviceUrl + query, config);
}

export function getCartItems(userId) {
    var serviceUrl = baseUrl + '/appdata/' + appKey + '/users-cart-items';
    var query = '?query={"userId":"' + userId + '"}';
    var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
    var config = buildHeaders('Kinvey ' + authToken);

    return axios.get(serviceUrl + query, config);
}

export function searchAllItems(allItems, keyword) {
    return new Promise(function (resolve, reject) {
        try {
            keyword = keyword.toLowerCase();
            var resultArr = [];
            resultArr = allItems.filter(function (el) {
                return el.name.toLowerCase().indexOf(keyword) > -1 || el.description.toLowerCase().indexOf(keyword) > -1;
            });

            resolve({ data: resultArr });
        } catch (e) {
            reject(e);
        }
    });
}

export function verifyRecaptchaSite(response) {
    var serviceUrl = '/verify-recaptcha';
    var query = '?response=' + response;

    return axios.get(serviceUrl + query);
}