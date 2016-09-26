/// <reference path="../core/controller.ts" />
/// <reference path="menu.model.ts" />
/// <reference path="menu.provider.ts" />

namespace MogularJS.Menu {
    export interface MenuScope extends ng.IScope {
        menuItems: Menu[];
    }

    export class MenuController extends Core.BaseController<MenuConfiguration> {
        static $inject = ['$scope', 'menuService'];
        constructor(private $scope: MenuScope, private menuService: MenuServiceInterface) {
            super();
            $scope.menuItems = menuService.items.sort((menuA, menuB) => menuA.order < menuB.order ? -1 : 1);
        }
    }
}