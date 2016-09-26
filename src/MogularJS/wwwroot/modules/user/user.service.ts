/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="../notification/notification.service.ts" />
/// <reference path="user.config.ts" />

namespace MogularJS.User {
    export class UserService extends Core.BaseService<UserConfiguration> {
        public user = { name: 'Guest' };
        static $inject = ['messagingServiceFactory', '$rootScope'];
        private callback: Function;
        constructor(private messagingService: Messaging.MessagingService,
            private $rootScope: ng.IRootScopeService) {
            super();
        }
        public subscribe() {
            this.messagingService.subscribe(Messaging.MessageType.userNameChange, this.subscriptionHandlerFactory());
        }
        public subscriptionHandlerFactory(): Messaging.Subscriber {
            let configuration = this.configuration;
            return (message: Messaging.Message) => {
                this.user.name = message.message;
                this.$rootScope.$digest();
            };
        }
    }
}