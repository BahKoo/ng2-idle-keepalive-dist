/**
 * ng2-idle-keepalive - A plugin for ng2-idle to keep user sessions alive while active.
 # @author Mike Grabski <me@mikegrabski.com> (http://mikegrabski.com/)
 * @version v1.0.0-alpha.9
 * @link https://github.com/HackedByChinese/ng2-idle-keepalive#readme
 * @license MIT
 */
import { KeepaliveSvc } from 'ng2-idle/core';
import { Keepalive } from './keepalive';
export * from './keepalive';
export const KEEPALIVE_PROVIDERS = [Keepalive, { provide: KeepaliveSvc, useExisting: Keepalive }];
export default { providers: [KEEPALIVE_PROVIDERS] };

//# sourceMappingURL=core.js.map
