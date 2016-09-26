/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/core.module.ts" />
/// <reference path="messaging.config.ts" />
/// <reference path="messaging.service.ts" />

namespace MogularJS.Messaging {
    new Core.ModuleBuilder<MessagingConfiguration>('messaging');
}