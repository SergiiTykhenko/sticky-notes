# Sticky Notes

A sticky notes app with a fridge-style board. Notes are draggable and editable; data is stored in `localStorage`.

## Development

```bash
npm install
npm run dev
```

Runs the app at [http://localhost:5173](http://localhost:5173) with hot reload.

## Build

```bash
npm install
npm run build
```

Output is in `dist/`. Preview the build with:

```bash
npm run preview
```

## Testing

```bash
npm run test
```

Runs the full test suite once. Tests use Vitest and React Testing Library.

## Scripts

| Script             | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start dev server               |
| `npm run build`    | Type-check and build for prod  |
| `npm run preview`  | Serve production build locally |
| `npm run test`     | Run tests                      |
| `npm run ts-check` | Type-check only (no emit)      |
| `npm run lint`     | Run ESLint                     |
