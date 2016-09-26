/// <reference path="../core/controller.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.service.ts" />

namespace MogularJS.Garply {
    interface Item {
        id: number;
        text: string;
    }
    export class GarplyMasterController extends Core.BaseController<GarplyConfiguration> {
        private data: Item[];
        private message: string;
        static $inject = ['$scope'];
        constructor(private $scope: ng.IScope) {
            super();
            this.data = [{ id: 1, text: 'One' },
                { id: 2, text: 'Two' },
                { id: 3, text: 'Three' }];
        }
        sendMessageToChildView() {
            this.$scope.$emit(this.configuration.messages.masterViewMessage, this.message);
        }
    }
}