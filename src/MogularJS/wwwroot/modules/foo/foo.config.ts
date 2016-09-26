/// <reference path="../core/configuration.ts" />

namespace MogularJS.Foo {
    export interface FooConfiguration extends Core.Configuration {
        defaultPath: string;
        html5Mode: boolean;
    }
}