/**
 * ng2-idle-keepalive - A plugin for ng2-idle to keep user sessions alive while active.
 # @author Mike Grabski <me@mikegrabski.com> (http://mikegrabski.com/)
 * @version v1.0.0-alpha.9
 * @link https://github.com/HackedByChinese/ng2-idle-keepalive#readme
 * @license MIT
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('ng2-idle/core');
var keepalive_1 = require('./keepalive');
__export(require('./keepalive'));
exports.KEEPALIVE_PROVIDERS = [keepalive_1.Keepalive, { provide: core_1.KeepaliveSvc, useExisting: keepalive_1.Keepalive }];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { providers: [exports.KEEPALIVE_PROVIDERS] };

//# sourceMappingURL=core.js.map
