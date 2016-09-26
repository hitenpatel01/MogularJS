/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="qux.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />

namespace MogularJS.Qux {
    export class QuxService extends Core.BaseService<QuxConfiguration> {
        static $inject = ['messagingServiceFactory', 'notificationService'];
        constructor(private messagingService: Messaging.MessagingService,
            private notificationService: Notification.NotificationService) {
            super();
        }
        public subscribe() {
            this.messagingService.subscribe(Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
        }
        public subscriptionHandlerFactory(): Messaging.Subscriber {
            let configuration = this.configuration;
            return (message: Messaging.Message) => {
                if (configuration.name !== message.source) {
                    this.notificationService.add('Qux', ` received '${message.message}' message from '${message.source}'`);
                }
            };
        }
    }
}