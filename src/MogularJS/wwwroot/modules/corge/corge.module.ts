/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />
/// <reference path="corge.config.ts" />
/// <reference path="corge.service.ts" />

namespace MogularJS.Corge {
    let initFunction = (corgeService: CorgeService) => {
        corgeService.subscribe();
    };
    initFunction.$inject = ['corgeService'];
    new Core.ModuleBuilder<CorgeConfiguration>('corge')
        .init(initFunction);
}