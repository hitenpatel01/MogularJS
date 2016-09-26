/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../messaging/messaging.module.ts" />
/// <reference path="user.config.ts" />
/// <reference path="user.service.ts" />

namespace MogularJS.User {
    let initFunction = (userService: UserService) => {
        userService.subscribe();
    };
    initFunction.$inject = ['userService'];
    new Core.ModuleBuilder<UserConfiguration>('user')
        .init(initFunction);
}