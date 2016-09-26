/// <reference path="../core/controller.ts" />
/// <reference path="user.config.ts" />
/// <reference path="user.service.ts" />

namespace MogularJS.User {
    export class UserController extends Core.BaseController<UserConfiguration> {
        user: {};
        static $inject = ['userService'];
        constructor(userService: UserService) {
            super();
            this.user = userService.user;
        }
    }
}