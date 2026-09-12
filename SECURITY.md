# Security review

Reviewed the portfolio source, tracked configuration, external script/iframe use, dependency advisories, and production build. This review does not establish that the site is vulnerability-free, and does not audit the backend of the separately hosted Stock Trading AI app.

## Changes

- Removed the unused TagCloud CDN script, eliminating its page-level script access and external dependency.
- Added a deployment Content Security Policy that allows only local scripts and the specific Stock Trading AI frame origin. Blocks object embedding, base-tag injection, and framing the portfolio from another site. Inline styles remain allowed because React and the animations use them; inline scripts and eval are not allowed.
- Added nosniff, referrer policy, and restrictions on camera, microphone, geolocation, payment, and USB access.
- Sandboxed the cross-origin iframe. Scripts, forms, and its own origin/storage remain available; parent navigation, popups, and downloads are not granted. The frame receives no referrer.
- Replaced the unmaintained Create React App toolchain with Vite and migrated tests to Vitest. Removed unused router/scroll/typewriter dependencies. The initial npm audit reported 69 affected packages (3 critical); the refreshed full dependency tree reported zero known advisories at review time.
- Added Node 22 configuration and broader environment-file exclusions. No obvious embedded credentials or unsafe HTML/eval sinks were identified in the inspected active source.

## Verification and maintenance

Run `npm ci`, `npm run lint`, `npm test`, `npm run build`, and `npm audit` under Node 22.12+ in the 22 release line. Audit results change as new advisories are published.

Browser checks used the production build with the configured response headers: no CSP violations or runtime errors, working local games and resume downloads, mobile/reduced-motion behavior, and iframe sandbox attributes. The external frame was substituted with a fixture for this boundary test; its live application and authentication flows were not audited.

Headers take effect only when deployed on a host that applies them. Netlify reads the copied `build/_headers` file. On another host, configure equivalent HTTP headers. This work does not publish a deployment or change an already-running Agent Runner's Node installation.

Only public values belong in browser code. Never place secret API keys in frontend environment variables; use a server for privileged requests. Keep development and preview servers bound to localhost.
