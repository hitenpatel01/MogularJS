/// <reference path="../core/controller.ts" />
/// <reference path="notification.config.ts" />
/// <reference path="notification.model.ts" />
/// <reference path="notification.service.ts" />

namespace MogularJS.Notification {
    export interface NotificationScope extends ng.IScope {
        notificationItems: Notification[];
    }

    export class NotificationController extends Core.BaseController<NotificationConfiguration> {
        static $inject = ['$scope', 'notificationService'];
        constructor(private $scope: NotificationScope, private notificationService: NotificationService) {
            super();
            $scope.notificationItems = notificationService.items;
        }
        dismiss(notification: Notification) {
            this.notificationService.remove(notification);
        }
    }
}