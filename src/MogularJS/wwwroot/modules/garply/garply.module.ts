/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.controller.ts" />
/// <reference path="garply-master.controller.ts" />
/// <reference path="garply-detail.controller.ts" />
/// <reference path="garply.service.ts" />

namespace MogularJS.Garply {
    let initFunction = (garplyService: GarplyService) => {
        garplyService.subscribe();
    };
    initFunction.$inject = ['garplyService'];
    new Core.ModuleBuilder<GarplyConfiguration>('garply')
        .init(initFunction);
}