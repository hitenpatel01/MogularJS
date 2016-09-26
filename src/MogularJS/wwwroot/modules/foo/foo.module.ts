/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../menu/menu.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="foo.config.ts" />

namespace MogularJS.Foo {
    let configFn = (menuProvider: Menu.MenuServiceProvider,
        $locationProvider: ng.ILocationProvider,
        $routeProvider: ng.route.IRouteProvider) => {
        for (let module in Core.Configuration) {
            if (!!module) {
                let moduleConfiguration: Core.Configuration = Core.Configuration[module];
                if (!!moduleConfiguration.applications && moduleConfiguration.applications.indexOf('foo') >= 0) {
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
        let fooConfiguration = Core.Configuration['foo'] as FooConfiguration;
        $locationProvider.html5Mode(fooConfiguration.html5Mode);
        $routeProvider.otherwise({
            redirectTo: fooConfiguration.defaultPath
        });
    };
    configFn.$inject = ['menuServiceProvider', '$locationProvider', '$routeProvider'];

    new Core.ModuleBuilder<FooConfiguration>('foo')
        .config(configFn);
}