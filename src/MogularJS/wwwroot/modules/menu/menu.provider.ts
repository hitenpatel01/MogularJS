/// <reference path="../core/object.ts" />
/// <reference path="menu.module.ts" />
/// <reference path="menu.model.ts" />

namespace MogularJS.Menu {
    export interface MenuServiceInterface {
        items: Menu[];
    }
    export class MenuServiceProvider implements ng.IServiceProvider {
        items: Menu[] = [];
        add(name: string, url: string, order: number = 0) {
            this.items.push({
                title: name,
                url: url,
                order: order
            });
            return this;
        }
        $get(): MenuServiceInterface {
            return {
                items: this.items
            };
        }
    }
}