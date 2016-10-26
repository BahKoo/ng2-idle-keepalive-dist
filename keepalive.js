/**
 * ng2-idle-keepalive - A plugin for ng2-idle to keep user sessions alive while active.
 # @author Mike Grabski <me@mikegrabski.com> (http://mikegrabski.com/)
 * @version v1.0.0-alpha.9
 * @link https://github.com/HackedByChinese/ng2-idle-keepalive#readme
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var core_2 = require('ng2-idle/core');
var Keepalive = (function (_super) {
    __extends(Keepalive, _super);
    function Keepalive(http) {
        _super.call(this);
        this.http = http;
        this.pingInterval = 10 * 60;
        this.onPing = new core_1.EventEmitter;
        this.onPingResponse = new core_1.EventEmitter;
    }
    Keepalive.prototype.request = function (url) {
        if (typeof url === 'string') {
            this.pingRequest = new http_1.Request({ method: http_1.RequestMethod.Get, url: url });
        }
        else if (url instanceof http_1.Request) {
            this.pingRequest = url;
        }
        else if (url === null) {
            this.pingRequest = null;
        }
        return this.pingRequest;
    };
    Keepalive.prototype.interval = function (seconds) {
        if (!isNaN(seconds) && seconds > 0) {
            this.pingInterval = seconds;
        }
        else if (!isNaN(seconds) && seconds <= 0) {
            throw new Error('Interval value must be greater than zero.');
        }
        return this.pingInterval;
    };
    Keepalive.prototype.ping = function () {
        var _this = this;
        this.onPing.emit(null);
        if (this.pingRequest) {
            this.http.request(this.pingRequest).subscribe(function (response) {
                _this.onPingResponse.emit(response);
            });
        }
    };
    Keepalive.prototype.start = function () {
        var _this = this;
        this.stop();
        this.pingHandle = setInterval(function () {
            _this.ping();
        }, this.pingInterval * 1000);
    };
    Keepalive.prototype.stop = function () {
        if (this.pingHandle) {
            clearInterval(this.pingHandle);
            this.pingHandle = null;
        }
    };
    Keepalive.prototype.ngOnDestroy = function () {
        this.stop();
    };
    Keepalive.prototype.isRunning = function () {
        return !!this.pingHandle;
    };
    Keepalive = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Keepalive);
    return Keepalive;
}(core_2.KeepaliveSvc));
exports.Keepalive = Keepalive;

//# sourceMappingURL=keepalive.js.map
