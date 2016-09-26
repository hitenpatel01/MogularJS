/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/core.module.ts" />
/// <reference path="notification.config.ts" />
/// <reference path="notification.component.ts" />
/// <reference path="notification.service.ts" />
/// <reference path="notification.controller.ts" />

namespace MogularJS.Notification {
    new Core.ModuleBuilder<NotificationConfiguration>('notification');
}