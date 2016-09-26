namespace MogularJS.Core {
    export interface IRoute extends ng.route.IRoute {
        path: string;
        order: number;
    }
    export enum ModuleStatus {
        disabled,
        enabled
    }
    export interface Configuration {
        name: string;
        dependencies: string[];
        enabled: boolean;
        namespace: string;
        applications: string[];
        routes?: IRoute[];
    }
}