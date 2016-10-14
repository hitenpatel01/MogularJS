var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        (function (ModuleStatus) {
            ModuleStatus[ModuleStatus["disabled"] = 0] = "disabled";
            ModuleStatus[ModuleStatus["enabled"] = 1] = "enabled";
        })(/* istanbul ignore next */Core.ModuleStatus || (Core.ModuleStatus = {}));
        var ModuleStatus = Core.ModuleStatus;
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="configuration.ts" />
var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        ;
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../../../typings/index.d.ts" />
/// <reference path="core.config.ts" />
var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        var GLOBAL_APPLICATION_NAMESPACE = 'MogularJS';
        var GLOBAL_CONFIGURATION = 'Configuration';
        var CORE_MODULE_NAME = 'core';
        Core.Configuration = null;
        var ModuleBuilder = (function () {
            function ModuleBuilder(moduleName) {
                var appWindow = window;
                Core.Configuration = Core.Configuration || appWindow.MogularJS.Configuration;
                this.configuration = Core.Configuration[moduleName];
                //If module is disabled remove it from Configuration and do not create the module
                if (false === this.configuration.enabled) {
                    delete Core.Configuration[moduleName];
                    return;
                }
                if (CORE_MODULE_NAME !== this.configuration.name) {
                    this.configuration.dependencies.push(CORE_MODULE_NAME);
                }
                this.module = angular.module(this.configuration.name, this.configuration.dependencies);
                if (!!this.configuration.namespace) {
                    var namespace = void 0;
                    var sections = this.configuration.namespace.split('.');
                    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                        var section = sections_1[_i];
                        namespace = !!namespace ? namespace[section] : appWindow[section];
                    }
                    if (!!namespace) {
                        for (var name_1 in namespace) {
                            if (null != name_1) {
                                var coreConfig = Core.Configuration[CORE_MODULE_NAME];
                                var key = name_1.charAt(0).toLowerCase() + name_1.slice(1);
                                var value = namespace[name_1];
                                if (null != value.prototype) {
                                    value.prototype['configuration'] = this.configuration;
                                }
                                if (!!name_1.match(coreConfig.conventions.component)) {
                                    this.module.component(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.constant)) {
                                    this.module.constant(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.config)) {
                                    this.module.config(value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.controller)) {
                                    this.module.controller(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.directive)) {
                                    this.module.directive(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.decorator)) {
                                    this.module.decorator(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.factory)) {
                                    this.module.factory(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.filter)) {
                                    this.module.filter(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.provider)) {
                                    key = key.replace('Provider', '');
                                    this.module.provider(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.run)) {
                                    this.module.run(value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.service)) {
                                    this.module.service(key, value);
                                }
                                else if (!!name_1.match(coreConfig.conventions.value)) {
                                    this.module.value(key, value);
                                }
                            }
                        }
                    }
                }
                if (!!this.configuration.applications) {
                    for (var _a = 0, _b = this.configuration.applications; _a < _b.length; _a++) {
                        var application = _b[_a];
                        if (!!application) {
                            angular.module(application).requires.push(this.configuration.name);
                        }
                    }
                }
            }
            ModuleBuilder.prototype.controller = function (name, controllerConstructor) {
                this.module.controller(name, controllerConstructor);
                return this;
            };
            ModuleBuilder.prototype.config = function (configFunction) {
                this.module.config(configFunction);
                return this;
            };
            ModuleBuilder.prototype.init = function (initFunction) {
                if (null != this.module) {
                    this.module.run(initFunction);
                }
            };
            ModuleBuilder.$inject = ['$http'];
            return ModuleBuilder;
        }());
        Core.ModuleBuilder = ModuleBuilder;
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../menu/menu.module.ts" />
/// <reference path="core.config.ts" />
var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        new Core.ModuleBuilder('core');
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="module-builder.ts" />
/// <reference path="configuration.ts" />
var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        var BaseObject = (function () {
            function BaseObject() {
            }
            return BaseObject;
        }());
        Core.BaseObject = BaseObject;
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="object.ts" />
/// <reference path="configuration.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        var BaseController = (function (_super) {
            __extends(BaseController, _super);
            function BaseController() {
                _super.apply(this, arguments);
            }
            return BaseController;
        }(Core.BaseObject));
        Core.BaseController = BaseController;
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));



/// <reference path="../core/object.ts" />
/// <reference path="menu.module.ts" />
/// <reference path="menu.model.ts" />
var MogularJS;
(function (MogularJS) {
    var Menu;
    (function (Menu) {
        var MenuServiceProvider = (function () {
            function MenuServiceProvider() {
                this.items = [];
            }
            MenuServiceProvider.prototype.add = function (name, url, order) {
                if (order === void 0) { order = 0; }
                this.items.push({
                    title: name,
                    url: url,
                    order: order
                });
                return this;
            };
            MenuServiceProvider.prototype.$get = function () {
                return {
                    items: this.items
                };
            };
            return MenuServiceProvider;
        }());
        Menu.MenuServiceProvider = MenuServiceProvider;
    })(/* istanbul ignore next */Menu = MogularJS.Menu || (MogularJS.Menu = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="menu.model.ts" />
/// <reference path="menu.provider.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Menu;
    (function (Menu) {
        var MenuController = (function (_super) {
            __extends(MenuController, _super);
            function MenuController($scope, menuService) {
                _super.call(this);
                this.$scope = $scope;
                this.menuService = menuService;
                $scope.menuItems = menuService.items.sort(function (menuA, menuB) { return menuA.order < menuB.order ? -1 : 1; });
            }
            MenuController.$inject = ['$scope', 'menuService'];
            return MenuController;
        }(MogularJS.Core.BaseController));
        Menu.MenuController = MenuController;
    })(/* istanbul ignore next */Menu = MogularJS.Menu || (MogularJS.Menu = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />
/// <reference path="menu.controller.ts" />
var MogularJS;
(function (MogularJS) {
    var Menu;
    (function (Menu) {
        Menu.MenuComponent = {
            controller: Menu.MenuController,
            controllerAs: 'menuCtrl',
            templateUrl: '/modules/menu/menu.html',
            transclude: false
        };
    })(/* istanbul ignore next */Menu = MogularJS.Menu || (MogularJS.Menu = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/core.module.ts" />
/// <reference path="menu.config.ts" />
/// <reference path="menu.component.ts" />
/// <reference path="menu.controller.ts" />
/// <reference path="menu.provider.ts" />
var MogularJS;
(function (MogularJS) {
    var Menu;
    (function (Menu) {
        new MogularJS.Core.ModuleBuilder('menu');
    })(/* istanbul ignore next */Menu = MogularJS.Menu || (MogularJS.Menu = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />
/// <reference path="../menu/menu.module.ts" />

/// <reference path="../core/configuration.ts" />



/// <reference path="object.ts" />
/// <reference path="configuration.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Core;
    (function (Core) {
        var BaseService = (function (_super) {
            __extends(BaseService, _super);
            function BaseService() {
                _super.apply(this, arguments);
            }
            return BaseService;
        }(Core.BaseObject));
        Core.BaseService = BaseService;
    })(/* istanbul ignore next */Core = MogularJS.Core || (MogularJS.Core = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/service.ts" />
/// <reference path="notification.config.ts" />
/// <reference path="notification.module.ts" />
/// <reference path="notification.model.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Notification;
    (function (Notification) {
        var NotificationService = (function (_super) {
            __extends(NotificationService, _super);
            function NotificationService() {
                _super.apply(this, arguments);
                this.items = [];
            }
            NotificationService.prototype.add = function (source, message) {
                this.items.push({
                    source: source,
                    message: message
                });
                return this;
            };
            NotificationService.prototype.remove = function (notification) {
                var index = this.items.indexOf(notification);
                this.items.splice(index, 1);
                return this;
            };
            return NotificationService;
        }(MogularJS.Core.BaseService));
        Notification.NotificationService = NotificationService;
    })(/* istanbul ignore next */Notification = MogularJS.Notification || (MogularJS.Notification = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="notification.config.ts" />
/// <reference path="notification.model.ts" />
/// <reference path="notification.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Notification;
    (function (Notification) {
        var NotificationController = (function (_super) {
            __extends(NotificationController, _super);
            function NotificationController($scope, notificationService) {
                _super.call(this);
                this.$scope = $scope;
                this.notificationService = notificationService;
                $scope.notificationItems = notificationService.items;
            }
            NotificationController.prototype.dismiss = function (notification) {
                this.notificationService.remove(notification);
            };
            NotificationController.$inject = ['$scope', 'notificationService'];
            return NotificationController;
        }(MogularJS.Core.BaseController));
        Notification.NotificationController = NotificationController;
    })(/* istanbul ignore next */Notification = MogularJS.Notification || (MogularJS.Notification = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />
/// <reference path="notification.controller.ts" />
var MogularJS;
(function (MogularJS) {
    var Notification;
    (function (Notification) {
        Notification.NotificationComponent = {
            controller: Notification.NotificationController,
            controllerAs: 'notificationCtrl',
            templateUrl: '/modules/notification/notification.html',
            transclude: false
        };
    })(/* istanbul ignore next */Notification = MogularJS.Notification || (MogularJS.Notification = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/core.module.ts" />
/// <reference path="notification.config.ts" />
/// <reference path="notification.component.ts" />
/// <reference path="notification.service.ts" />
/// <reference path="notification.controller.ts" />
var MogularJS;
(function (MogularJS) {
    var Notification;
    (function (Notification) {
        new MogularJS.Core.ModuleBuilder('notification');
    })(/* istanbul ignore next */Notification = MogularJS.Notification || (MogularJS.Notification = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../menu/menu.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="bar.config.ts" />
var MogularJS;
(function (MogularJS) {
    var Bar;
    (function (Bar) {
        var configFn = function (menuProvider, $locationProvider, $routeProvider) {
            for (var module in MogularJS.Core.Configuration) {
                if (!!module) {
                    var moduleConfiguration = MogularJS.Core.Configuration[module];
                    if (!!moduleConfiguration.applications && moduleConfiguration.applications.indexOf('bar') >= 0) {
                        for (var _i = 0, _a = moduleConfiguration.routes; _i < _a.length; _i++) {
                            var route = _a[_i];
                            if (!!route) {
                                menuProvider.add(route.name, route.path[0] === '/' ? route.path.substring(1) : route.path, route.order);
                                $routeProvider.when(route.path, {
                                    controller: route.controller || '',
                                    controllerAs: route.controllerAs || 'ctrl',
                                    redirectTo: route.redirectTo || '',
                                    reloadOnSearch: route.reloadOnSearch || false,
                                    caseInsensitiveMatch: route.caseInsensitiveMatch || false,
                                    name: route.name,
                                    templateUrl: route.templateUrl
                                });
                            }
                        }
                    }
                }
            }
            var barConfiguration = MogularJS.Core.Configuration['bar'];
            $locationProvider.html5Mode(barConfiguration.html5Mode);
            $routeProvider.otherwise({
                redirectTo: barConfiguration.defaultPath
            });
        };
        configFn.$inject = ['menuServiceProvider', '$locationProvider', '$routeProvider'];
        new MogularJS.Core.ModuleBuilder('bar')
            .config(configFn);
    })(/* istanbul ignore next */Bar = MogularJS.Bar || (MogularJS.Bar = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="../core/configuration.ts" />



/// <reference path="../core/service.ts" />
/// <reference path="messaging.model.ts" />
/// <reference path="messaging.config.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Messaging;
    (function (Messaging) {
        var MESSAGING_SERVICE_OBJECT_NAME = 'MOGULARJS_MESSAGING_SERVICE';
        (function (MessageType) {
            MessageType[MessageType["userNameChange"] = 0] = "userNameChange";
            MessageType[MessageType["serviceEvent"] = 1] = "serviceEvent";
        })(/* istanbul ignore next */Messaging.MessageType || (Messaging.MessageType = {}));
        var MessageType = Messaging.MessageType;
        var MessagingService = (function (_super) {
            __extends(MessagingService, _super);
            function MessagingService() {
                _super.call(this);
                this.subjects = [];
                this.subjects[MessageType.userNameChange] = new Rx.Subject();
                this.subjects[MessageType.serviceEvent] = new Rx.Subject();
            }
            MessagingService.prototype.publish = function (messageType, source, message) {
                this.subjects[messageType].onNext({
                    source: source, message: message
                });
            };
            MessagingService.prototype.subscribe = function (messageType, subscribeFn) {
                this.subjects[messageType].subscribe(subscribeFn);
            };
            return MessagingService;
        }(MogularJS.Core.BaseService));
        Messaging.MessagingService = MessagingService;
        function MessagingServiceFactory($window) {
            $window[MESSAGING_SERVICE_OBJECT_NAME] = $window[MESSAGING_SERVICE_OBJECT_NAME] || new MessagingService();
            return $window[MESSAGING_SERVICE_OBJECT_NAME];
        }
        Messaging.MessagingServiceFactory = MessagingServiceFactory;
        ;
        MessagingServiceFactory.$inject = ['$window'];
    })(/* istanbul ignore next */Messaging = MogularJS.Messaging || (MogularJS.Messaging = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/core.module.ts" />
/// <reference path="messaging.config.ts" />
/// <reference path="messaging.service.ts" />
var MogularJS;
(function (MogularJS) {
    var Messaging;
    (function (Messaging) {
        new MogularJS.Core.ModuleBuilder('messaging');
    })(/* istanbul ignore next */Messaging = MogularJS.Messaging || (MogularJS.Messaging = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="baz.config.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Baz;
    (function (Baz) {
        var BazService = (function (_super) {
            __extends(BazService, _super);
            function BazService(messagingService, notificationService) {
                _super.call(this);
                this.messagingService = messagingService;
                this.notificationService = notificationService;
            }
            BazService.prototype.subscribe = function () {
                this.messagingService.subscribe(MogularJS.Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
            };
            BazService.prototype.updateUserName = function (userName) {
                this.messagingService.publish(MogularJS.Messaging.MessageType.userNameChange, this.configuration.name, userName);
            };
            BazService.prototype.subscriptionHandlerFactory = function () {
                var _this = this;
                var configuration = this.configuration;
                return function (message) {
                    if (configuration.name !== message.source) {
                        _this.notificationService.add(_this.configuration.name, " received '" + message.message + "' message from '" + message.source + "'");
                    }
                };
            };
            BazService.$inject = ['messagingServiceFactory', 'notificationService'];
            return BazService;
        }(MogularJS.Core.BaseService));
        Baz.BazService = BazService;
    })(/* istanbul ignore next */Baz = MogularJS.Baz || (MogularJS.Baz = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="baz.config.ts" />
/// <reference path="baz.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Baz;
    (function (Baz) {
        var BazController = (function (_super) {
            __extends(BazController, _super);
            function BazController(bazService) {
                _super.call(this);
                this.bazService = bazService;
                this.userName = '';
            }
            BazController.prototype.updateUserName = function () {
                this.bazService.updateUserName(this.userName);
            };
            BazController.$inject = ['bazService'];
            return BazController;
        }(MogularJS.Core.BaseController));
        Baz.BazController = BazController;
    })(/* istanbul ignore next */Baz = MogularJS.Baz || (MogularJS.Baz = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../menu/menu.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="foo.config.ts" />
var MogularJS;
(function (MogularJS) {
    var Foo;
    (function (Foo) {
        var configFn = function (menuProvider, $locationProvider, $routeProvider) {
            for (var module in MogularJS.Core.Configuration) {
                if (!!module) {
                    var moduleConfiguration = MogularJS.Core.Configuration[module];
                    if (!!moduleConfiguration.applications && moduleConfiguration.applications.indexOf('foo') >= 0) {
                        for (var _i = 0, _a = moduleConfiguration.routes; _i < _a.length; _i++) {
                            var route = _a[_i];
                            if (!!route) {
                                menuProvider.add(route.name, route.path[0] === '/' ? route.path.substring(1) : route.path, route.order);
                                $routeProvider.when(route.path, {
                                    controller: route.controller || '',
                                    controllerAs: route.controllerAs || 'ctrl',
                                    redirectTo: route.redirectTo || '',
                                    reloadOnSearch: route.reloadOnSearch || false,
                                    caseInsensitiveMatch: route.caseInsensitiveMatch || false,
                                    name: route.name,
                                    templateUrl: route.templateUrl
                                });
                            }
                        }
                    }
                }
            }
            var fooConfiguration = MogularJS.Core.Configuration['foo'];
            $locationProvider.html5Mode(fooConfiguration.html5Mode);
            $routeProvider.otherwise({
                redirectTo: fooConfiguration.defaultPath
            });
        };
        configFn.$inject = ['menuServiceProvider', '$locationProvider', '$routeProvider'];
        new MogularJS.Core.ModuleBuilder('foo')
            .config(configFn);
    })(/* istanbul ignore next */Foo = MogularJS.Foo || (MogularJS.Foo = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../foo/foo.module.ts" />
/// <reference path="baz.config.ts" />
/// <reference path="baz.controller.ts" />
var MogularJS;
(function (MogularJS) {
    var Baz;
    (function (Baz) {
        var initFunction = function (bazService) {
            bazService.subscribe();
        };
        initFunction.$inject = ['bazService'];
        new MogularJS.Core.ModuleBuilder('baz')
            .init(initFunction);
    })(/* istanbul ignore next */Baz = MogularJS.Baz || (MogularJS.Baz = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="corge.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Corge;
    (function (Corge) {
        var CorgeService = (function (_super) {
            __extends(CorgeService, _super);
            function CorgeService(messagingService, notificationService) {
                _super.call(this);
                this.messagingService = messagingService;
                this.notificationService = notificationService;
            }
            CorgeService.prototype.subscribe = function () {
                this.messagingService.subscribe(MogularJS.Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
            };
            CorgeService.prototype.subscriptionHandlerFactory = function () {
                var _this = this;
                var configuration = this.configuration;
                return function (message) {
                    if (configuration.name !== message.source) {
                        _this.notificationService.add(_this.configuration.name, " received '" + message.message + "' message from '" + message.source + "'");
                    }
                };
            };
            CorgeService.$inject = ['messagingServiceFactory', 'notificationService'];
            return CorgeService;
        }(MogularJS.Core.BaseService));
        Corge.CorgeService = CorgeService;
    })(/* istanbul ignore next */Corge = MogularJS.Corge || (MogularJS.Corge = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />
/// <reference path="corge.config.ts" />
/// <reference path="corge.service.ts" />
var MogularJS;
(function (MogularJS) {
    var Corge;
    (function (Corge) {
        var initFunction = function (corgeService) {
            corgeService.subscribe();
        };
        initFunction.$inject = ['corgeService'];
        new MogularJS.Core.ModuleBuilder('corge')
            .init(initFunction);
    })(/* istanbul ignore next */Corge = MogularJS.Corge || (MogularJS.Corge = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Garply;
    (function (Garply) {
        var GarplyService = (function (_super) {
            __extends(GarplyService, _super);
            function GarplyService(messagingService, notificationService) {
                _super.call(this);
                this.messagingService = messagingService;
                this.notificationService = notificationService;
            }
            GarplyService.prototype.subscribe = function () {
                this.messagingService.subscribe(MogularJS.Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
            };
            GarplyService.prototype.subscriptionHandlerFactory = function () {
                var _this = this;
                var configuration = this.configuration;
                return function (message) {
                    if (configuration.name !== message.source) {
                        _this.notificationService.add(_this.configuration.name, " received '" + message.message + "' message from '" + message.source + "'");
                    }
                };
            };
            GarplyService.$inject = ['messagingServiceFactory', 'notificationService'];
            return GarplyService;
        }(MogularJS.Core.BaseService));
        Garply.GarplyService = GarplyService;
    })(/* istanbul ignore next */Garply = MogularJS.Garply || (MogularJS.Garply = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Garply;
    (function (Garply) {
        var GarplyDetailController = (function (_super) {
            __extends(GarplyDetailController, _super);
            function GarplyDetailController($scope) {
                var _this = this;
                _super.call(this);
                this.$scope = $scope;
                $scope.$on(this.configuration.messages.detailViewMessage, function (event, args) {
                    _this.message = args;
                });
            }
            GarplyDetailController.$inject = ['$scope'];
            return GarplyDetailController;
        }(MogularJS.Core.BaseController));
        Garply.GarplyDetailController = GarplyDetailController;
    })(/* istanbul ignore next */Garply = MogularJS.Garply || (MogularJS.Garply = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Garply;
    (function (Garply) {
        var GarplyMasterController = (function (_super) {
            __extends(GarplyMasterController, _super);
            function GarplyMasterController($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.data = [{ id: 1, text: 'One' },
                    { id: 2, text: 'Two' },
                    { id: 3, text: 'Three' }];
            }
            GarplyMasterController.prototype.sendMessageToChildView = function () {
                this.$scope.$emit(this.configuration.messages.masterViewMessage, this.message);
            };
            GarplyMasterController.$inject = ['$scope'];
            return GarplyMasterController;
        }(MogularJS.Core.BaseController));
        Garply.GarplyMasterController = GarplyMasterController;
    })(/* istanbul ignore next */Garply = MogularJS.Garply || (MogularJS.Garply = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Garply;
    (function (Garply) {
        var GarplyController = (function (_super) {
            __extends(GarplyController, _super);
            function GarplyController($scope) {
                var _this = this;
                _super.call(this);
                this.$scope = $scope;
                $scope.$on(this.configuration.messages.masterViewMessage, function (event, args) {
                    $scope.$broadcast(_this.configuration.messages.detailViewMessage, args);
                });
            }
            GarplyController.$inject = ['$scope'];
            return GarplyController;
        }(MogularJS.Core.BaseController));
        Garply.GarplyController = GarplyController;
    })(/* istanbul ignore next */Garply = MogularJS.Garply || (MogularJS.Garply = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />
/// <reference path="garply.config.ts" />
/// <reference path="garply.controller.ts" />
/// <reference path="garply-master.controller.ts" />
/// <reference path="garply-detail.controller.ts" />
/// <reference path="garply.service.ts" />
var MogularJS;
(function (MogularJS) {
    var Garply;
    (function (Garply) {
        var initFunction = function (garplyService) {
            garplyService.subscribe();
        };
        initFunction.$inject = ['garplyService'];
        new MogularJS.Core.ModuleBuilder('garply')
            .init(initFunction);
    })(/* istanbul ignore next */Garply = MogularJS.Garply || (MogularJS.Garply = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="grault.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Grault;
    (function (Grault) {
        var GraultService = (function (_super) {
            __extends(GraultService, _super);
            function GraultService(messagingService) {
                _super.call(this);
                this.messagingService = messagingService;
            }
            GraultService.prototype.processNotify = function (message) {
                this.messagingService.publish(MogularJS.Messaging.MessageType.serviceEvent, this.configuration.name, message);
            };
            GraultService.$inject = ['messagingServiceFactory'];
            return GraultService;
        }(MogularJS.Core.BaseService));
        Grault.GraultService = GraultService;
    })(/* istanbul ignore next */Grault = MogularJS.Grault || (MogularJS.Grault = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="grault.config.ts" />
/// <reference path="grault.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Grault;
    (function (Grault) {
        var GraultController = (function (_super) {
            __extends(GraultController, _super);
            function GraultController(graultService) {
                _super.call(this);
                this.graultService = graultService;
                this.message = '';
            }
            GraultController.prototype.notify = function () {
                this.graultService.processNotify(this.message);
            };
            GraultController.$inject = ['graultService'];
            return GraultController;
        }(MogularJS.Core.BaseController));
        Grault.GraultController = GraultController;
    })(/* istanbul ignore next */Grault = MogularJS.Grault || (MogularJS.Grault = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />
/// <reference path="grault.config.ts" />
/// <reference path="grault.service.ts" />
/// <reference path="grault.controller.ts" />
var MogularJS;
(function (MogularJS) {
    var Grault;
    (function (Grault) {
        new MogularJS.Core.ModuleBuilder('grault');
    })(/* istanbul ignore next */Grault = MogularJS.Grault || (MogularJS.Grault = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />
/// <reference path="../foo/foo.module.ts" />

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.module.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="quux.config.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Quux;
    (function (Quux) {
        var QuuxService = (function (_super) {
            __extends(QuuxService, _super);
            function QuuxService(messagingService, notificationService) {
                _super.call(this);
                this.messagingService = messagingService;
                this.notificationService = notificationService;
            }
            QuuxService.prototype.subscribe = function () {
                this.messagingService.subscribe(MogularJS.Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
            };
            QuuxService.prototype.subscriptionHandlerFactory = function () {
                var _this = this;
                var configuration = this.configuration;
                return function (message) {
                    if (configuration.name !== message.source) {
                        _this.notificationService.add(_this.configuration.name, " received '" + message.message + "' message from '" + message.source + "'");
                    }
                };
            };
            QuuxService.$inject = ['messagingServiceFactory', 'notificationService'];
            return QuuxService;
        }(MogularJS.Core.BaseService));
        Quux.QuuxService = QuuxService;
    })(/* istanbul ignore next */Quux = MogularJS.Quux || (MogularJS.Quux = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../foo/foo.module.ts" />
/// <reference path="quux.service.ts" />
/// <reference path="quux.config.ts" />
var MogularJS;
(function (MogularJS) {
    var Quux;
    (function (Quux) {
        var initFunction = function (quuxService) {
            quuxService.subscribe();
        };
        initFunction.$inject = ['quuxService'];
        new MogularJS.Core.ModuleBuilder('quux')
            .init(initFunction);
    })(/* istanbul ignore next */Quux = MogularJS.Quux || (MogularJS.Quux = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />
/// <reference path="../foo/foo.module.ts" />

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.model.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="qux.config.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../notification/notification.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var Qux;
    (function (Qux) {
        var QuxService = (function (_super) {
            __extends(QuxService, _super);
            function QuxService(messagingService, notificationService) {
                _super.call(this);
                this.messagingService = messagingService;
                this.notificationService = notificationService;
            }
            QuxService.prototype.subscribe = function () {
                this.messagingService.subscribe(MogularJS.Messaging.MessageType.serviceEvent, this.subscriptionHandlerFactory());
            };
            QuxService.prototype.subscriptionHandlerFactory = function () {
                var _this = this;
                var configuration = this.configuration;
                return function (message) {
                    if (configuration.name !== message.source) {
                        _this.notificationService.add('Qux', " received '" + message.message + "' message from '" + message.source + "'");
                    }
                };
            };
            QuxService.$inject = ['messagingServiceFactory', 'notificationService'];
            return QuxService;
        }(MogularJS.Core.BaseService));
        Qux.QuxService = QuxService;
    })(/* istanbul ignore next */Qux = MogularJS.Qux || (MogularJS.Qux = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../foo/foo.module.ts" />
/// <reference path="qux.config.ts" />
/// <reference path="qux.service.ts" />
var MogularJS;
(function (MogularJS) {
    var Qux;
    (function (Qux) {
        var initFunction = function (quxService) {
            quxService.subscribe();
        };
        initFunction.$inject = ['quxService'];
        new MogularJS.Core.ModuleBuilder('qux')
            .init(initFunction);
    })(/* istanbul ignore next */Qux = MogularJS.Qux || (MogularJS.Qux = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />

/// <reference path="../core/service.ts" />
/// <reference path="../messaging/messaging.service.ts" />
/// <reference path="../notification/notification.service.ts" />
/// <reference path="user.config.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var User;
    (function (User) {
        var UserService = (function (_super) {
            __extends(UserService, _super);
            function UserService(messagingService, $rootScope) {
                _super.call(this);
                this.messagingService = messagingService;
                this.$rootScope = $rootScope;
                this.user = { name: 'Guest' };
            }
            UserService.prototype.subscribe = function () {
                this.messagingService.subscribe(MogularJS.Messaging.MessageType.userNameChange, this.subscriptionHandlerFactory());
            };
            UserService.prototype.subscriptionHandlerFactory = function () {
                var _this = this;
                var configuration = this.configuration;
                return function (message) {
                    _this.user.name = message.message;
                    _this.$rootScope.$digest();
                };
            };
            UserService.$inject = ['messagingServiceFactory', '$rootScope'];
            return UserService;
        }(MogularJS.Core.BaseService));
        User.UserService = UserService;
    })(/* istanbul ignore next */User = MogularJS.User || (MogularJS.User = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/controller.ts" />
/// <reference path="user.config.ts" />
/// <reference path="user.service.ts" />
var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MogularJS;
(function (MogularJS) {
    var User;
    (function (User) {
        var UserController = (function (_super) {
            __extends(UserController, _super);
            function UserController(userService) {
                _super.call(this);
                this.user = userService.user;
            }
            UserController.$inject = ['userService'];
            return UserController;
        }(MogularJS.Core.BaseController));
        User.UserController = UserController;
    })(/* istanbul ignore next */User = MogularJS.User || (MogularJS.User = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/module-builder.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../notification/notification.module.ts" />
/// <reference path="../messaging/messaging.module.ts" />
/// <reference path="user.config.ts" />
/// <reference path="user.service.ts" />
var MogularJS;
(function (MogularJS) {
    var User;
    (function (User) {
        var initFunction = function (userService) {
            userService.subscribe();
        };
        initFunction.$inject = ['userService'];
        new MogularJS.Core.ModuleBuilder('user')
            .init(initFunction);
    })(/* istanbul ignore next */User = MogularJS.User || (MogularJS.User = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

/// <reference path="../core/configuration.ts" />
/// <reference path="../bar/bar.module.ts" />

/// <reference path="../core/module-builder.ts" />
/// <reference path="../bar/bar.module.ts" />>
/// <reference path="waldo.config.ts" />
var MogularJS;
(function (MogularJS) {
    var Waldo;
    (function (Waldo) {
        new MogularJS.Core.ModuleBuilder('waldo');
    })(/* istanbul ignore next */Waldo = MogularJS.Waldo || (MogularJS.Waldo = {}));
})(/* istanbul ignore next */MogularJS || (MogularJS = {}));

//# sourceMappingURL=app.js.map
