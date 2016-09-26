/// <reference path="../../../typings/index.d.ts" />
/// <reference path="core.config.ts" />

namespace MogularJS.Core {
    const GLOBAL_APPLICATION_NAMESPACE = 'MogularJS';
    const GLOBAL_CONFIGURATION: string = 'Configuration';
    const CORE_MODULE_NAME: string = 'core';
    export let Configuration: any = null;
    interface MogularJS {
        Configuration: any;
    }
    interface AppWindow extends Window {
        MogularJS?: MogularJS;
    }
    export class ModuleBuilder<T extends Configuration> {
        private configuration: T;
        private module: ng.IModule;
        static $inject = ['$http'];
        constructor(moduleName: string) {
            let appWindow: AppWindow = window;
            Configuration = Configuration || appWindow.MogularJS.Configuration;
            this.configuration = Configuration[moduleName] as T;

            //If module is disabled remove it from Configuration and do not create the module
            if (false === this.configuration.enabled) {
                delete Configuration[moduleName];
                return;
            }
            if (CORE_MODULE_NAME !== this.configuration.name) {
                this.configuration.dependencies.push(CORE_MODULE_NAME);
            }
            this.module = angular.module(this.configuration.name, this.configuration.dependencies);
            if (!!this.configuration.namespace) {
                let namespace: any;
                let sections = this.configuration.namespace.split('.');
                for (let section of sections) {
                    namespace = !!namespace ? namespace[section] : (appWindow as any)[section];
                }
                if (!!namespace) {
                    for (let name in namespace) {
                        if (null != name) {
                            let coreConfig: CoreConfiguration = Configuration[CORE_MODULE_NAME] as CoreConfiguration;
                            let key = name.charAt(0).toLowerCase() + name.slice(1);
                            let value = namespace[name];
                            if (null != value.prototype) {
                                value.prototype['configuration'] = this.configuration;
                            }
                            if (!!name.match(coreConfig.conventions.component)) {
                                this.module.component(key, value);
                            } else if (!!name.match(coreConfig.conventions.constant)) {
                                this.module.constant(key, value);
                            } else if (!!name.match(coreConfig.conventions.config)) {
                                this.module.config(value);
                            } else if (!!name.match(coreConfig.conventions.controller)) {
                                this.module.controller(key, value);
                            } else if (!!name.match(coreConfig.conventions.directive)) {
                                this.module.directive(key, value);
                            } else if (!!name.match(coreConfig.conventions.decorator)) {
                                this.module.decorator(key, value);
                            } else if (!!name.match(coreConfig.conventions.factory)) {
                                this.module.factory(key, value);
                            } else if (!!name.match(coreConfig.conventions.filter)) {
                                this.module.filter(key, value);
                            } else if (!!name.match(coreConfig.conventions.provider)) {
                                key = key.replace('Provider', '');
                                this.module.provider(key, value);
                            } else if (!!name.match(coreConfig.conventions.run)) {
                                this.module.run(value);
                            } else if (!!name.match(coreConfig.conventions.service)) {
                                this.module.service(key, value);
                            } else if (!!name.match(coreConfig.conventions.value)) {
                                this.module.value(key, value);
                            }
                        }
                    }
                }
            }
            if (!!this.configuration.applications) {
                for (let application of this.configuration.applications) {
                    if (!!application) {
                        angular.module(application).requires.push(this.configuration.name);
                    }
                }
            }
        }
        controller(name: string, controllerConstructor: Function) {
            this.module.controller(name, controllerConstructor);
            return this;
        }
        config(configFunction: Function) {
            this.module.config(configFunction);
            return this;
        }
        init(initFunction: Function) {
            if (null != this.module) {
                this.module.run(initFunction);
            }
        }
    }
}