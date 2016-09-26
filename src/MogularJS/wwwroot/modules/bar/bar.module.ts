/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../menu/menu.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="bar.config.ts" />

namespace MogularJS.Bar {
    let configFn = (menuProvider: Menu.MenuServiceProvider,
        $locationProvider: ng.ILocationProvider,
        $routeProvider: ng.route.IRouteProvider) => {
        for (let module in Core.Configuration) {
            if (!!module) {
                let moduleConfiguration: Core.Configuration = Core.Configuration[module];
                if (!!moduleConfiguration.applications && moduleConfiguration.applications.indexOf('bar') >= 0) {
                    for (let route of moduleConfiguration.routes) {
                        if (!!route) {
                            menuProvider.add(route.name, route.path[0] === '/' ? route.path.substring(1) : route.path, route.order);
                            $routeProvider.when(route.path, {
                                controller: route.controller || '',
                                controllerAs: route.controllerAs || 'ctrl',
                                redirectTo: route.redirectTo || '',
                                reloadOnSearch: route.reloadOnSearch || false,
                                caseInsensitiveMatch: route.caseInsensitiveMatch || false,
                                name: route.name,
                                templateUrl: route.templateUrl
                            });
                        }
                    }
                }
            }
        }
        let barConfiguration = Core.Configuration['bar'] as BarConfiguration;
        $locationProvider.html5Mode(barConfiguration.html5Mode);
        $routeProvider.otherwise({
            redirectTo: barConfiguration.defaultPath
        });
    };
    configFn.$inject = ['menuServiceProvider', '$locationProvider', '$routeProvider'];
    new Core.ModuleBuilder<BarConfiguration>('bar')
        .config(configFn);
}