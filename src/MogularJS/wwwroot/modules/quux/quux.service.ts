/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="quux.config.ts" />

namespace MogularJS.Quux {
    export class QuuxService extends Core.BaseService<QuuxConfiguration> {
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
                    this.notificationService.add(this.configuration.name,
                        ` received '${message.message}' message from '${message.source}'`);
                }
            };
        }
    }
}