/// <reference path="../core/configuration.ts" />
/// <reference path="notification.controller.ts" />

namespace MogularJS.Notification {
    export const NotificationComponent: ng.IComponentOptions = {
        controller: NotificationController,
        controllerAs: 'notificationCtrl',
        templateUrl: '/modules/notification/notification.html',
        transclude: false
    };
}