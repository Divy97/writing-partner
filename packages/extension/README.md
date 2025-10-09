# Aura Extension

Browser extension for the Aura Writing Partner.

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Create distributable zip
pnpm zip
```

## Structure

```
extension/
├── entrypoints/        # Extension entry points
│   ├── background.ts   # Service worker
│   ├── content.ts      # Content script
│   ├── popup/          # Popup UI
│   └── dashboard/      # Dashboard page
├── components/         # React components
├── public/            # Static assets
└── wxt.config.ts      # WXT configuration
```

## Loading in Chrome

1. Build the extension: `pnpm build`
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `.output/chrome-mv3` directory

