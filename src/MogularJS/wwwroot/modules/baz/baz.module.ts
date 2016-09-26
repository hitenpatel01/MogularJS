/// <reference path="../core/module-builder.ts" />
/// <reference path="../foo/foo.module.ts" />
/// <reference path="baz.config.ts" />
/// <reference path="baz.controller.ts" />

namespace MogularJS.Baz {
    let initFunction = (bazService: BazService) => {
        bazService.subscribe();
    };
    initFunction.$inject = ['bazService'];
    new Core.ModuleBuilder<BazConfiguration>('baz')
        .init(initFunction);
}