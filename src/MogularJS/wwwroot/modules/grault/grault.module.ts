/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />
/// <reference path="grault.config.ts" />
/// <reference path="grault.service.ts" />
/// <reference path="grault.controller.ts" />

namespace MogularJS.Grault {
    new Core.ModuleBuilder<GraultConfiguration>('grault');
}