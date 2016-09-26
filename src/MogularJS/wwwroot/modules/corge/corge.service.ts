/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="corge.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />

namespace MogularJS.Corge {
    export class CorgeService extends Core.BaseService<CorgeConfiguration> {
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