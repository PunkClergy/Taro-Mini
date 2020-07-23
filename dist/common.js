(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/servers/config.js":
/*!*******************************!*\
  !*** ./src/servers/config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var HTTP_STATUS = exports.HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

/***/ }),

/***/ "./src/servers/http.js":
/*!*****************************!*\
  !*** ./src/servers/http.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _interceptors = __webpack_require__(/*! ./interceptors */ "./src/servers/interceptors.js");

var _interceptors2 = _interopRequireDefault(_interceptors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_interceptors2.default.forEach(function (interceptorItem) {
  return _taroWeapp2.default.addInterceptor(interceptorItem);
});

var httpRequest = function () {
  function httpRequest() {
    _classCallCheck(this, httpRequest);
  }

  _createClass(httpRequest, [{
    key: "baseOptions",
    value: function baseOptions(params) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
      var url = params.url,
          data = params.data;

      var contentType = "application/json";
      contentType = params.contentType || contentType;
      var option = {
        url: url,
        data: data,
        method: method,
        header: {
          "content-type": contentType,
          Authorization: _taroWeapp2.default.getStorageSync("Authorization")
        }
      };
      return _taroWeapp2.default.request(option);
    }
  }, {
    key: "get",
    value: function get(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var option = { url: url, data: data };
      return this.baseOptions(option);
    }
  }, {
    key: "post",
    value: function post(url, data, contentType) {
      var params = { url: url, data: data, contentType: contentType };
      return this.baseOptions(params, "POST");
    }
  }, {
    key: "put",
    value: function put(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var option = { url: url, data: data };
      return this.baseOptions(option, "PUT");
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var option = { url: url, data: data };
      return this.baseOptions(option, "DELETE");
    }
  }]);

  return httpRequest;
}();

exports.default = new httpRequest();

/***/ }),

/***/ "./src/servers/interceptors.js":
/*!*************************************!*\
  !*** ./src/servers/interceptors.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _utils = __webpack_require__(/*! ./utils */ "./src/servers/utils.js");

var _config = __webpack_require__(/*! ./config */ "./src/servers/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customInterceptor = function customInterceptor(chain) {

  var requestParams = chain.requestParams;

  return chain.proceed(requestParams).then(function (res) {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === _config.HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === _config.HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.statusCode === _config.HTTP_STATUS.FORBIDDEN) {
      _taroWeapp2.default.setStorageSync("Authorization", "");
      (0, _utils.pageToLogin)();
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === _config.HTTP_STATUS.AUTHENTICATE) {
      _taroWeapp2.default.setStorageSync("Authorization", "");
      (0, _utils.pageToLogin)();
      return Promise.reject("需要鉴权");
    } else if (res.statusCode === _config.HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
var interceptors = [customInterceptor, _taroWeapp2.default.interceptors.logInterceptor];

exports.default = interceptors;

/***/ }),

/***/ "./src/servers/servers.js":
/*!********************************!*\
  !*** ./src/servers/servers.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToys = exports.API_ROOT = undefined;

var _http = __webpack_require__(/*! ./http */ "./src/servers/http.js");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_ROOT = exports.API_ROOT = "https://toy-mini.playalot.cn"; /* eslint-disable import/prefer-default-export */
var getToys = exports.getToys = function getToys(postData) {
  return _http2.default.get(API_ROOT + "/v1/toys", postData);
};

/***/ }),

/***/ "./src/servers/utils.js":
/*!******************************!*\
  !*** ./src/servers/utils.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageToLogin = exports.getCurrentPageUrl = undefined;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description 获取当前页url
 */
var getCurrentPageUrl = exports.getCurrentPageUrl = function getCurrentPageUrl() {
  var pages = _taroWeapp2.default.getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
};

var pageToLogin = exports.pageToLogin = function pageToLogin() {
  var path = getCurrentPageUrl();
  if (!path.includes('login')) {
    _taroWeapp2.default.navigateTo({
      url: "/pages/login/login"
    });
  }
};

/***/ })

}]);