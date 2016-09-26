/// <reference path="../core/controller.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.service.ts" />

namespace MogularJS.Garply {
    interface GarplyScope extends ng.IScope {
        selectedItem: string;
    }
    export class GarplyController extends Core.BaseController<GarplyConfiguration> {
        static $inject = ['$scope'];
        constructor(private $scope: GarplyScope) {
            super();
            $scope.$on(this.configuration.messages.masterViewMessage, (event, args) => {
                $scope.$broadcast(this.configuration.messages.detailViewMessage, args);
            });
        }
    }
}