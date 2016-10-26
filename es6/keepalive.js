/**
 * ng2-idle-keepalive - A plugin for ng2-idle to keep user sessions alive while active.
 # @author Mike Grabski <me@mikegrabski.com> (http://mikegrabski.com/)
 * @version v1.0.0-alpha.9
 * @link https://github.com/HackedByChinese/ng2-idle-keepalive#readme
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';
import { KeepaliveSvc } from 'ng2-idle/core';
export let Keepalive = class Keepalive extends KeepaliveSvc {
    constructor(http) {
        super();
        this.http = http;
        this.pingInterval = 10 * 60;
        this.onPing = new EventEmitter;
        this.onPingResponse = new EventEmitter;
    }
    request(url) {
        if (typeof url === 'string') {
            this.pingRequest = new Request({ method: RequestMethod.Get, url: url });
        }
        else if (url instanceof Request) {
            this.pingRequest = url;
        }
        else if (url === null) {
            this.pingRequest = null;
        }
        return this.pingRequest;
    }
    interval(seconds) {
        if (!isNaN(seconds) && seconds > 0) {
            this.pingInterval = seconds;
        }
        else if (!isNaN(seconds) && seconds <= 0) {
            throw new Error('Interval value must be greater than zero.');
        }
        return this.pingInterval;
    }
    ping() {
        this.onPing.emit(null);
        if (this.pingRequest) {
            this.http.request(this.pingRequest).subscribe((response) => {
                this.onPingResponse.emit(response);
            });
        }
    }
    start() {
        this.stop();
        this.pingHandle = setInterval(() => {
            this.ping();
        }, this.pingInterval * 1000);
    }
    stop() {
        if (this.pingHandle) {
            clearInterval(this.pingHandle);
            this.pingHandle = null;
        }
    }
    ngOnDestroy() {
        this.stop();
    }
    isRunning() {
        return !!this.pingHandle;
    }
};
Keepalive = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Http])
], Keepalive);

//# sourceMappingURL=keepalive.js.map
