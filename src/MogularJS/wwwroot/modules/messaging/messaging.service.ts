/// <reference path="../core/service.ts" />
/// <reference path="messaging.model.ts" />
/// <reference path="messaging.config.ts" />

namespace MogularJS.Messaging {
    const MESSAGING_SERVICE_OBJECT_NAME = 'MOGULARJS_MESSAGING_SERVICE';
    export interface Subscriber {
        (value: Message): void;
    }
    export enum MessageType {
        userNameChange,
        serviceEvent
    }
    export class MessagingService extends Core.BaseService<MessagingConfiguration> {
        private subjects: Rx.Subject<Message>[] = [];
        constructor() {
            super();
            this.subjects[MessageType.userNameChange] = new Rx.Subject<Message>();
            this.subjects[MessageType.serviceEvent] = new Rx.Subject<Message>();
        }
        publish(messageType: MessageType, source: string, message: string) {
            this.subjects[messageType].onNext({
                source: source, message: message
            });
        }
        subscribe(messageType: MessageType, subscribeFn: Subscriber) {
            this.subjects[messageType].subscribe(subscribeFn);
        }
    }
    export function MessagingServiceFactory($window: ng.IWindowService): MessagingService {
        $window[MESSAGING_SERVICE_OBJECT_NAME] = $window[MESSAGING_SERVICE_OBJECT_NAME] || new MessagingService();
        return $window[MESSAGING_SERVICE_OBJECT_NAME];
    };
    MessagingServiceFactory.$inject = ['$window'];
    export interface IMessagingServiceFactory {
        (): MessagingService;
    }
}