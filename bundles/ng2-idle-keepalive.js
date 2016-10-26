System.registerDynamic("ng2-idle-keepalive/keepalive", ["@angular/core", "@angular/http", "ng2-idle/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var http_1 = $__require('@angular/http');
  var core_2 = $__require('ng2-idle/core');
  var Keepalive = (function(_super) {
    __extends(Keepalive, _super);
    function Keepalive(http) {
      _super.call(this);
      this.http = http;
      this.pingInterval = 10 * 60;
      this.onPing = new core_1.EventEmitter;
      this.onPingResponse = new core_1.EventEmitter;
    }
    Keepalive.prototype.request = function(url) {
      if (typeof url === 'string') {
        this.pingRequest = new http_1.Request({
          method: http_1.RequestMethod.Get,
          url: url
        });
      } else if (url instanceof http_1.Request) {
        this.pingRequest = url;
      } else if (url === null) {
        this.pingRequest = null;
      }
      return this.pingRequest;
    };
    Keepalive.prototype.interval = function(seconds) {
      if (!isNaN(seconds) && seconds > 0) {
        this.pingInterval = seconds;
      } else if (!isNaN(seconds) && seconds <= 0) {
        throw new Error('Interval value must be greater than zero.');
      }
      return this.pingInterval;
    };
    Keepalive.prototype.ping = function() {
      var _this = this;
      this.onPing.emit(null);
      if (this.pingRequest) {
        this.http.request(this.pingRequest).subscribe(function(response) {
          _this.onPingResponse.emit(response);
        });
      }
    };
    Keepalive.prototype.start = function() {
      var _this = this;
      this.stop();
      this.pingHandle = setInterval(function() {
        _this.ping();
      }, this.pingInterval * 1000);
    };
    Keepalive.prototype.stop = function() {
      if (this.pingHandle) {
        clearInterval(this.pingHandle);
        this.pingHandle = null;
      }
    };
    Keepalive.prototype.ngOnDestroy = function() {
      this.stop();
    };
    Keepalive.prototype.isRunning = function() {
      return !!this.pingHandle;
    };
    Keepalive = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http])], Keepalive);
    return Keepalive;
  }(core_2.KeepaliveSvc));
  exports.Keepalive = Keepalive;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-idle-keepalive/core", ["ng2-idle/core", "ng2-idle-keepalive/keepalive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('ng2-idle/core');
  var keepalive_1 = $__require('ng2-idle-keepalive/keepalive');
  __export($__require('ng2-idle-keepalive/keepalive'));
  exports.KEEPALIVE_PROVIDERS = [keepalive_1.Keepalive, {
    provide: core_1.KeepaliveSvc,
    useExisting: keepalive_1.Keepalive
  }];
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {providers: [exports.KEEPALIVE_PROVIDERS]};
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=ng2-idle-keepalive.js.map