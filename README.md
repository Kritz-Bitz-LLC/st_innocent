# Saint Innocent Orthodox Church Website

Static Next.js website for Saint Innocent Orthodox Church in Olmsted Falls, Ohio.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the site.

## Build & Deploy

### Quick Deploy

```bash
# Build and deploy in one command
python scripts/deploy.py
```

This will:
1. Generate sitemap with current date
2. Build the static site to `out/`
3. Rsync to your server at `/var/www/ui/`

The script uses the `ST_INNOCENTS_CLOUD` environment variable for the server address, or defaults to `root@saintinnocent.org`.

### Manual Build

```bash
# Build static site (generates sitemap and exports to out/)
pnpm build
```

The static site will be generated in the `out/` directory.

### Manual Deploy

```bash
# Rsync the out/ directory to your server
rsync -avz --delete out/ $ST_INNOCENTS_CLOUD:/var/www/ui/
```

### GitHub Pages (Future)

The static site in `out/` can be pushed to GitHub Pages or any static hosting service.

## Scripts

- `scripts/deploy.py` - Builds and deploys the site in one command
- `scripts/generate-sitemap.js` - Generates sitemap.xml with current date before build
- `scripts/convert_images.py` - Converts images to WebP format
