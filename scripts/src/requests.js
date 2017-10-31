import axios from 'axios';

var appKey = 'kid_r1I-YDgRZ';
var appSecret = 'f8486c7c0fcd48bead064ed9e9aa7721';

var authToken = btoa(appKey + ':' + appSecret);
var config = {
    headers: {
        'Authorization': 'Basic ' + authToken,
        'Content-Type': 'application/json'
    }
};

if (!sessionStorage.getItem('AuthToken')) {
    axios.post('https://baas.kinvey.com/user/kid_r1I-YDgRZ/login', {
        'username': 'admin',
        'password': '1234'
    }, config).then((res) => {
        console.log(res);
        sessionStorage.setItem('AuthToken', res.data._kmd.authtoken);
    });
}

window.addEventListener('load', function () {
    document.getElementById('nav-menu').onclick = function () {
        var headers = {
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('AuthToken'),
                'Content-Type': 'application/json'
            }
        };
        axios.get('https://baas.kinvey.com/appdata/kid_r1I-YDgRZ/items', headers).then((data) => console.log(data));
    };
}, false);
