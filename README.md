# Zhan Xiang Zheng · Personal Portfolio

React portfolio with a neon theme, career timeline, projects, a memory game, and a browser adaptation of the Tic-Tac-Toe Minimax AI.

## Development

Use Node 22.12 or newer in the Node 22 release line. `.nvmrc`, `.node-version`, and `netlify.toml` select Node 22 for development and Netlify builds.

```sh
nvm install
nvm use
npm ci
npm start
```

The development server binds to localhost. Restart or rebuild an existing Agent Runner after updating its Node environment; a running environment will not switch Node versions automatically.

## Checks and deployment

```sh
npm run lint
npm test
npm run build
npm run preview
npm audit
```

Vite builds the static site into `build/`. Deploy that directory. Netlify applies the security headers from `public/_headers` and the SPA rewrite from `public/_redirects`; other hosts need equivalent header/rewrite configuration. The preview command does not emulate Netlify response headers.

Routes: `/` is the portfolio; `/StockTradingAI` embeds the external stock-trading app. The iframe has its own origin and sandbox restrictions.

## Security and performance

See [SECURITY.md](SECURITY.md) for audit scope and security decisions.

Animated GIF previews load only while their project cards are visible and hovered or focused. Background particles use CSS transforms rather than a continuous canvas redraw loop. The skill orbit pauses off-screen and on hover, and reduced-motion preferences are respected. `mugshot-web.jpg` is a smaller display copy; the original portrait remains available.

If present, the ignored `node_modules.pre-security/` directory is the old, root-owned dependency backup. It is not used by builds or included in deployment.
