/// <reference path="../core/module-builder.ts" />
/// <reference path="../foo/foo.module.ts" />
/// <reference path="quux.service.ts" />
/// <reference path="quux.config.ts" />

namespace MogularJS.Quux {
    let initFunction = (quuxService: QuuxService) => {
        quuxService.subscribe();
    };
    initFunction.$inject = ['quuxService'];
    new Core.ModuleBuilder<QuuxConfiguration>('quux')
        .init(initFunction);
}