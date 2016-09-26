/// <reference path="../core/controller.ts" />
/// <reference path="grault.config.ts" />
/// <reference path="grault.service.ts" />

namespace MogularJS.Grault {
    export class GraultController extends Core.BaseController<GraultConfiguration> {
        private message: string;
        static $inject = ['graultService'];
        constructor(private graultService: GraultService) {
            super();
            this.message = '';
        }
        notify() {
            this.graultService.processNotify(this.message);
        }
    }
}