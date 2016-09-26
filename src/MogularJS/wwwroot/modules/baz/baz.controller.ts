/// <reference path="../core/controller.ts" />
/// <reference path="baz.config.ts" />
/// <reference path="baz.service.ts" />

namespace MogularJS.Baz {
    export class BazController extends Core.BaseController<BazConfiguration> {
        userName: string;
        static $inject = ['bazService'];
        constructor(private bazService: BazService) {
            super();
            this.userName = '';
        }
        updateUserName() {
            this.bazService.updateUserName(this.userName);
        }
    }
}