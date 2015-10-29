module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = __webpack_require__(1);
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _flux = __webpack_require__(2);

	var _flux2 = _interopRequireDefault(_flux);

	var _FluxtonStore = __webpack_require__(3);

	var _FluxtonStore2 = _interopRequireDefault(_FluxtonStore);

	var Fluxton = (function () {
	  function Fluxton() {
	    _classCallCheck(this, Fluxton);

	    this.dispatcher = new _flux2['default'].Dispatcher();
	    this.stores = {};
	  }

	  _createClass(Fluxton, [{
	    key: 'create',
	    value: function create(name, initialValue) {
	      if (this.stores[name]) {
	        throw 'Store ' + name + ' already exists.';
	      }
	      return this.stores[name] = new _FluxtonStore2['default'](this, name, initialValue);
	    }
	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this.stores[name];
	    }
	  }]);

	  return Fluxton;
	})();

	exports['default'] = Fluxton;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("flux");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _events = __webpack_require__(4);

	var _events2 = _interopRequireDefault(_events);

	var noop = function noop() {};

	var FluxtonStore = (function (_EventEmitter) {
	  _inherits(FluxtonStore, _EventEmitter);

	  function FluxtonStore(fluxton, name, initialValue) {
	    var _this = this;

	    _classCallCheck(this, FluxtonStore);

	    _get(Object.getPrototypeOf(FluxtonStore.prototype), 'constructor', this).call(this);
	    this.fluxton = fluxton;
	    this.name = name;
	    this.value = initialValue;
	    this.dispatchToken = this.fluxton.dispatcher.register(function (payload) {
	      if (payload.actionType === _this.name) {
	        _this.value = payload.value;
	        _this.emitChange();
	      }
	      _this.emit('action', payload.actionType, payload.value);
	    });
	  }

	  _createClass(FluxtonStore, [{
	    key: 'waitFor',
	    value: function waitFor() {
	      var _this2 = this;

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      args = args.map(function (arg) {
	        return _this2.fluxton.get(arg).dispatchToken;
	      });
	      this.fluxton.dispatcher.waitFor(args);
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.value;
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value) {
	      this.fluxton.dispatcher.dispatch({
	        actionType: this.name,
	        value: value
	      });
	    }
	  }, {
	    key: 'change',
	    value: function change(modifier) {
	      if (typeof modifier != 'function') {
	        throw "modifier must be a function";
	      }
	      this.setValue(modifier.call(this, this.getValue()));
	    }
	  }, {
	    key: 'emitChange',
	    value: function emitChange() {
	      this.emit('change', this.value);
	    }
	  }]);

	  return FluxtonStore;
	})(_events2['default']);

	exports['default'] = FluxtonStore;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ }
/******/ ]);