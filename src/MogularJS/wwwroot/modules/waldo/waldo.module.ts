/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />>
/// <reference path="waldo.config.ts" />

namespace MogularJS.Waldo {
    new Core.ModuleBuilder<WaldoConfiguration>('waldo');
}