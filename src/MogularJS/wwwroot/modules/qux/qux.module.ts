/// <reference path="../core/module-builder.ts" />
/// <reference path="../foo/foo.module.ts" />
/// <reference path="qux.config.ts" />
/// <reference path="qux.service.ts" />

namespace MogularJS.Qux {
    let initFunction = (quxService: QuxService) => {
        quxService.subscribe();
    };
    initFunction.$inject = ['quxService'];
    new Core.ModuleBuilder<QuxConfiguration>('qux')
        .init(initFunction);
}