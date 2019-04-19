import { routes } from './routes.js';

export class Router {
    constructor() { }
    navigate(path) {
        let curRoute = routes.filter(route => route.path === path)[0];
        // console.log(curRoute);
        const routerContainer = document.querySelector('#router');
        if (curRoute) {
            if ('canActivate' in curRoute && !curRoute.canActivate()) {
                // console.log('Rerouting to login from canActivate');
                curRoute = routes.filter(route => route.path === 'login')[0];
            }
            fetch(curRoute.component)
                .then(response => response.text())
                .then(result => {
                    routerContainer.innerHTML = result;
                    window.history.pushState({}, curRoute.path, `#/${curRoute.path}`);
                    document.querySelectorAll('[data-route]').forEach(linkElement => {
                        const route = linkElement.dataset.route;
                        linkElement.addEventListener('click', () => this.navigate(route));
                    });
                });
        } else {
            alert('No matching path');
        }
    }
}