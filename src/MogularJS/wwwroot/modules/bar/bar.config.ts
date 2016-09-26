/// <reference path="../core/configuration.ts" />
/// <reference path="../menu/menu.module.ts" />

namespace MogularJS.Bar {
    export interface BarConfiguration extends Core.Configuration {
        defaultPath: string;
        html5Mode: boolean;
    }
}