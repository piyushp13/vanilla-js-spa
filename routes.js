import { canActivate } from './authentication.js';
export const routes = [{
    path: 'landing', component: 'landing.html', canActivate: canActivate
},
{
    path: 'login', component: 'login.html'
},
{
    path: '', component: 'login.html'
},
{
    path: 'section1', component: 'section1.html', canActivate: canActivate
},
{
    path: 'section2', component: 'section2.html', canActivate: canActivate
},
{
    path: 'section3', component: 'section3.html', canActivate: canActivate
}]