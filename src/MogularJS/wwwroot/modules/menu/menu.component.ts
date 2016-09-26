/// <reference path="../core/configuration.ts" />
/// <reference path="menu.controller.ts" />

namespace MogularJS.Menu {
    export const MenuComponent: ng.IComponentOptions = {
        controller: MenuController,
        controllerAs: 'menuCtrl',
        templateUrl: '/modules/menu/menu.html',
        transclude: false
    };
}