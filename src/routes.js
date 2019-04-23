import { canActivate } from './authentication.js';
import { Landing } from './landing/landing.js';
import { Login } from './login/login.js';
import { Section1 } from './section1/section1.js';
import { Section2 } from './section2/section2.js';
import { Section3 } from './section3/section3.js';

export const routes = [{
    path: 'landing', component: Landing, canActivate: canActivate
},
{
    path: 'login', component: Login
},
{
    path: '', redirect: 'landing', canActivate: canActivate
},
{
    path: 'section1', component: Section1, canActivate: canActivate
},
{
    path: 'section2', component: Section2, canActivate: canActivate
},
{
    path: 'section3', component: Section3, canActivate: canActivate
}];
