/// <reference path="module-builder.ts" />
/// <reference path="configuration.ts" />

namespace MogularJS.Core {
    export class BaseObject<T extends Configuration> {
        protected configuration: T;
    }
}