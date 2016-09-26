/// <reference path="../core/service.ts" />
/// <reference path="notification.config.ts" />
/// <reference path="notification.module.ts" />
/// <reference path="notification.model.ts" />

namespace MogularJS.Notification {
    export class NotificationService extends Core.BaseService<NotificationConfiguration> {
        items: Notification[] = [];
        add(source: string, message: string) {
            this.items.push({
                source: source,
                message: message
            });
            return this;
        }
        remove(notification: Notification) {
            let index = this.items.indexOf(notification);
            this.items.splice(index, 1);
            return this;
        }
    }
}