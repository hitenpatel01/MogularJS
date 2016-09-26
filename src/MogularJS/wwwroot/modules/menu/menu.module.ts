/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/core.module.ts" />
/// <reference path="menu.config.ts" />
/// <reference path="menu.component.ts" />
/// <reference path="menu.controller.ts" />
/// <reference path="menu.provider.ts" />

namespace MogularJS.Menu {
    new Core.ModuleBuilder<MenuConfiguration>('menu');
}