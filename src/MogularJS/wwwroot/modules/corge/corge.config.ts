/// <reference path="../core/configuration.ts" />

namespace MogularJS.Corge {
    export interface Messages {
        masterViewMessage: string;
        detailViewMessage: string;
    }
    export interface CorgeConfiguration extends Core.Configuration {
        messages: Messages;
    }
}