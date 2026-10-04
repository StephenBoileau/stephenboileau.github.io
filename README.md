# Stephen Boileau portfolio

Static portfolio for GitHub Pages. HTML, CSS, and JavaScript; no build or npm dependencies.

## Local preview

From this repository:

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766/. Stop the server with Ctrl+C.

## Editing

- `index.html`: homepage and supporting-project descriptions.
- `paladin.html`, `chimelong.html`, `live-character.html`, `render-automation.html`: technical breakdowns.
- `resume.html`: concise HTML resume. `StephenBoileau_Resume.pdf`: original downloadable resume.
- `styles.css`: shared styling and Slate & Ice palette.
- `app.js`: starfield, responsive disclosures, and inline video playback.
- `assets/`: real project video posters. `videos/`: existing native video clips.
- `contact.html` and `blog.html`: compatibility redirects for existing links.

Video thumbnails load inline players on demand. Players support fullscreen; native clips use the local `videos/` directory. YouTube videos require Internet access.

The October 4, 2026 replacement was made locally. Publishing requires a separate Git commit/push. Existing media, resume PDFs, and Git history were preserved. Editorial evidence requests remain in the separate resumeGPT workspace rather than the public navigation.
