/**
 * ng2-idle-keepalive - A plugin for ng2-idle to keep user sessions alive while active.
 # @author Mike Grabski <me@mikegrabski.com> (http://mikegrabski.com/)
 * @version v1.0.0-alpha.9
 * @link https://github.com/HackedByChinese/ng2-idle-keepalive#readme
 * @license MIT
 */
import { EventEmitter, OnDestroy } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { KeepaliveSvc } from 'ng2-idle/core';
export declare class Keepalive extends KeepaliveSvc implements OnDestroy {
    private http;
    private pingRequest;
    private pingInterval;
    private pingHandle;
    onPing: EventEmitter<any>;
    onPingResponse: EventEmitter<Response>;
    constructor(http: Http);
    request(url?: string | Request): Request;
    interval(seconds?: number): number;
    ping(): void;
    start(): void;
    stop(): void;
    ngOnDestroy(): void;
    isRunning(): boolean;
}
