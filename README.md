# हरेन्द्र संग शिवा — Digital Wedding Invitation

A mobile-first React (Vite + Framer Motion) invitation for the मंगल परिणय of
Harendra and Shiva, 24–26 November 2026, Grand Castle Resort, Gwalior.

All artwork was generated in **Google Flow** (Nano Banana 2.1 images and a Veo hero loop),
and the music in **Google Flow Music**. Everything is in `public/assets/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # static site in dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Deploy

**Live:** https://imajij.github.io/harendra-shiva-wedding/

To publish a new version to GitHub Pages:

```bash
git push            # save the source to main
npm run deploy      # build with BASE_PATH=/harendra-shiva-wedding/ and push dist/ to gh-pages
```

Pages serves the `gh-pages` branch (Settings → Pages → Deploy from a branch → `gh-pages` / root);
the update is live about a minute after the deploy command.

`.github/workflows/deploy.yml` is an Actions-based alternative. It is manual-only for now
because GitHub Actions is blocked on this account by a billing lock; once that's cleared,
re-enable its `push` trigger and switch the Pages source to "GitHub Actions".

Any other static host works too (it serves from the root, so no `BASE_PATH`):

- **Vercel:** `npx vercel --prod` (framework: Vite, output: `dist`).
- **Netlify:** `npx netlify deploy --prod --dir dist`.

`og:image` in `index.html` is an absolute GitHub Pages URL so WhatsApp shows the
preview card; change it if you move to another domain.

## Links

The invitation is generic: every guest gets the same link.
Add `?open` to skip the door screen and land straight on the invitation (music then starts from the toggle).

## Editing content

Every word on the page lives in `src/content.js`, transcribed from the printed card.
Change text there; no component edits are needed.

- The second mobile number is cut off in the card photo. Add it to `sender.phones`.
- `venue.mapsUrl` is the Google Maps link from the family's reference site.
- `countdownTarget` is the Teeka / Panigrahan / Pritibhoj start (25 Nov 2026, 6 pm IST).

## Structure

```
src/
  content.js            all invitation text
  App.jsx               gate → page, music controller, nav, progress bar
  components/
    Gate.jsx            tap-to-open palace doors (starts music; browsers block autoplay)
    Sections.jsx        Hero, Invitation, Countdown, Programme, Venue, Sender, Closing
    Ornaments.jsx       SVG divider, HS monogram
    Petals.jsx          falling marigold / rose petals
  index.css             design tokens + all styles
public/assets/          generated images (WebP), hero video (MP4), music (AAC)
```

## Assets

| File | What |
| --- | --- |
| `gate-*.webp` | Carved maroon-and-gold haveli doors, split in half for the opening animation |
| `hero-*.webp`, `hero-*.mp4` | Palace courtyard mandap at dusk, still + Veo loop |
| `ganesha.webp`, `seal.webp` | Gold line Ganesha and blank wax seal (transparent) |
| `groom.webp`, `bride.webp` | Rajasthani miniature portraits |
| `event-*.webp` | Mandap, Lagun Phaldan, Teeka/Panigrahan, Vadhu Aagman |
| `venue-*.webp`, `closing.webp` | Resort at night, lake palace with diyas |
| `paper.webp`, `floral-corner.webp` | Ivory paper tile, floral corner spray |
| `music.m4a` | Shehnai / sitar / santoor instrumental, 2:58, −16 LUFS |
