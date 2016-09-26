var MogularJS = MogularJS || {}; MogularJS.Configuration = {
	"bar": {
		"name": "bar",
		"dependencies": [
			"menu",
			"notification",
			"messaging",
			"ngRoute"
		],
		"enabled": true,
		"namespace": "MogularJS.Bar",
		"defaultPath": "/garply",
		"html5Mode": true
	},
	"baz": {
		"name": "baz",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Baz",
		"applications": [
			"foo"
		],
		"routes": [
			{
				"path": "/baz",
				"name": "Baz",
				"templateUrl": "/modules/baz/baz.html",
				"controller": "bazController",
				"controllerAs": "bazCtrl",
				"order": 100
			}
		]
	},
	"core": {
		"name": "core",
		"dependencies": [],
		"enabled": true,
		"conventions": {
			"component": "Component$",
			"config": "Config$",
			"constant": "Constant$",
			"controller": "Controller$",
			"directive": "Directive$",
			"decorator": "Decorator$",
			"factory": "Factory$",
			"filter": "Filter$",
			"provider": "Provider$",
			"run": "Run$",
			"service": "Service$",
			"value": "Value$"
		}
	},
	"corge": {
		"name": "corge",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Corge",
		"applications": [
			"foo"
		],
		"routes": [
			{
				"path": "/corge",
				"name": "Corge",
				"templateUrl": "/modules/corge/corge.html",
				"order": 300
			}
		],
		"messages": {
			"masterViewMessage": "masterViewMessage",
			"detailViewMessage": "detailViewMessage"
		}
	},
	"foo": {
		"name": "foo",
		"dependencies": [
			"menu",
			"notification",
			"messaging",
			"ngRoute"
		],
		"enabled": true,
		"namespace": "MogularJS.Foo",
		"defaultPath": "/baz",
		"html5Mode": true
	},
	"garply": {
		"name": "garply",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Garply",
		"applications": [
			"bar"
		],
		"routes": [
			{
				"path": "/garply",
				"name": "Garply",
				"templateUrl": "/modules/garply/garply.html",
				"order": 100
			}
		],
		"messages": {
			"masterViewMessage": "masterViewMessage",
			"detailViewMessage": "detailViewMessage"
		}
	},
	"grault": {
		"name": "grault",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Grault",
		"applications": [
			"foo"
		],
		"routes": [
			{
				"path": "/grault",
				"name": "Grault",
				"templateUrl": "/modules/grault/grault.html",
				"controller": "graultController",
				"controllerAs": "graultCtrl",
				"order": 400
			}
		]
	},
	"menu": {
		"name": "menu",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Menu"
	},
	"messaging": {
		"name": "messaging",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Messaging"
	},
	"notification": {
		"name": "notification",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Notification"
	},
	"quux": {
		"name": "quux",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Quux",
		"applications": [
			"foo"
		],
		"routes": [
			{
				"path": "/quux",
				"name": "Quux",
				"templateUrl": "/modules/quux/quux.html",
				"order": 200
			}
		]
	},
	"qux": {
		"name": "qux",
		"dependencies": [],
		"enabled": false,
		"namespace": "MogularJS.Qux",
		"applications": [
			"foo"
		],
		"routes": [
			{
				"path": "/qux",
				"name": "Qux",
				"templateUrl": "/modules/qux/qux.html"
			}
		]
	},
	"user": {
		"name": "user",
		"dependencies": [
			"notification",
			"messaging"
		],
		"enabled": true,
		"namespace": "MogularJS.User"
	},
	"waldo": {
		"name": "waldo",
		"dependencies": [],
		"enabled": true,
		"namespace": "MogularJS.Waldo",
		"applications": [
			"bar"
		],
		"routes": [
			{
				"path": "/waldo",
				"name": "Waldo",
				"templateUrl": "/modules/waldo/waldo.html",
				"order": 200
			}
		]
	}
};