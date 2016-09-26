/// <reference path="../core/controller.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.service.ts" />

namespace MogularJS.Garply {
    export class GarplyDetailController extends Core.BaseController<GarplyConfiguration> {
        private message: string;
        static $inject = ['$scope'];
        constructor(private $scope: ng.IScope) {
            super();
            $scope.$on(this.configuration.messages.detailViewMessage, (event, args) => {
                this.message = args;
            });
        }
    }
}