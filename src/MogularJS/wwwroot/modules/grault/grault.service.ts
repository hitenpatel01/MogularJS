/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="grault.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />

namespace MogularJS.Grault {
    export class GraultService extends Core.BaseService<GraultConfiguration> {
        static $inject = ['messagingServiceFactory'];
        constructor(private messagingService: Messaging.MessagingService) {
            super();
        }
        processNotify(message: string) {
            this.messagingService.publish(Messaging.MessageType.serviceEvent, this.configuration.name, message);
        }
    }
}