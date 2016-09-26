/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="baz.config.ts" />

namespace MogularJS.Baz {
    export class BazService extends Core.BaseService<BazConfiguration> {
        static $inject = ['messagingServiceFactory', 'notificationService'];
        constructor(private messagingService: Messaging.MessagingService,
            private notificationService: Notification.NotificationService) {
            super();
        }
        public subscribe() {
            this.messagingService.subscribe(Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
        }
        public updateUserName(userName: string) {
            this.messagingService.publish(Messaging.MessageType.userNameChange, this.configuration.name, userName);
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