import { Router } from './router.js';
import './style.css';

const router = new Router();
const requestedPath = window.location.hash.replace('#/', '') || '';
console.log(requestedPath);
router.navigate(requestedPath);

function handleSubmit() {
    const form = document.querySelector('#user-form');
    const formValue = Array.from(form.elements)
        .filter(input => input.type !== 'button')
        .reduce((res, item) => ({ ...res, [item.name]: item.value }), {});
    authenticateUser(formValue.username, formValue.password).then(result => {
        if (result.status === 'OK') {
            localStorage.setItem('isLoggedIn', 'true');
            router.navigate('landing');
        } else {
            alert('Incorrect username or password');
        }
    }).catch(error => {
        alert('Server error');
    });
}

function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        fetch('/authenticate', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({ username, password }), // body data type must match "Content-Type" header
        }).then(response => response.json())
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
    });
}

function navigate(path) {
    router.navigate(path);
}

function handleHashChangeEvent(event) {
    const newPath = event.target.location.hash.replace('#/', '');
    router.navigate(newPath);
}

function bindSubmitToLogin(event) {
    const loginButton = document.getElementsByName('login')[0];
    if (loginButton) {
        loginButton.addEventListener('click', handleSubmit, { once: false });
    }
}

window.onload = (event) => bindSubmitToLogin(event);

window.addEventListener('hashchange', (event) => handleHashChangeEvent(event));

