/// <reference path="../core/configuration.ts" />

namespace MogularJS.Garply {
    export interface Messages {
        masterViewMessage: string;
        detailViewMessage: string;
    }
    export interface GarplyConfiguration extends Core.Configuration {
        messages: Messages;
    }
}