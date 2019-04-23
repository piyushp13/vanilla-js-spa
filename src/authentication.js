export function canActivate() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
        return true;
    } else {
        return false;
    }
}