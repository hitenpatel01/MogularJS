/// <reference path="configuration.ts" />

namespace MogularJS.Core {
    interface Conventions {
        component: string;
        constant: string;
        config: string;
        controller: string;
        directive: string;
        decorator: string;
        factory: string;
        filter: string;
        provider: string;
        run: string;
        service: string;
        value: string;
    };
    export interface CoreConfiguration extends Configuration {
        conventions: Conventions;
    }
}