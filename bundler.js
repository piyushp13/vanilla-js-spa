import { routes } from './src/routes.js';
import { readFileSync, writeFileSync } from 'fs';

export function bundle() {
    const bundledTemplate = {};
    routes.forEach((route) => {
        if (!('redirect' in route)) {
        const tempUrlSplit = route.component.templateUrl.split('.');
        tempUrlSplit.pop();
        const prefix = tempUrlSplit.pop().split('/').pop();
        const templateContent = readFileSync('src/' + prefix + '/' + route.component.templateUrl, {encoding: 'utf8'});
        bundledTemplate[route.path] = templateContent;
        }
    });
    writeFileSync('src/bundled-template.js',
    `export const bundledTemplates = ${JSON.stringify(bundledTemplate)};`,
    {encoding: 'utf8'});
}
