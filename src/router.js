import { routes } from './routes.js';
import { bundledTemplates } from './bundled-template.js';

export class Router {
    constructor() { }
    navigate(path) {
        let curRoute = routes.filter(route => route.path === path)[0];
        if ('redirect' in curRoute) {
            curRoute = routes.filter(route => route.path === curRoute.redirect)[0];
        }
        const routerContainer = document.querySelector('#router');
        if (curRoute) {
            if ('canActivate' in curRoute && !curRoute.canActivate()) {
                curRoute = routes.filter(route => route.path === 'login')[0];
            }
            const templateContent = bundledTemplates[curRoute.path];
            routerContainer.innerHTML = templateContent;
            window.history.pushState({}, curRoute.path, `#/${curRoute.path}`);
            document.querySelectorAll('[data-route]').forEach(linkElement => {
                const route = linkElement.dataset.route;
                linkElement.addEventListener('click', () => this.navigate(route));
            });
        } else {
            alert('No matching path');
        }
    }
}
