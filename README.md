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
- `blog.html`: blog home page, a list of post cards (newest first).
- `blog/`: one HTML file per post. `blog/_post-template.html` is a copy-and-fill template (files starting with `_` aren't published).
- `contact.html`: compatibility redirect for existing links.

## Adding a blog post

1. Copy `blog/_post-template.html` to a new name in `blog/`, e.g. `blog/devlog-01-the-idea.html`.
2. Fill in everything marked `TODO` and delete the example blocks you don't need.
3. In `blog.html`, copy an existing `<a class="post-card">` block to the top of the list and point it at the new post.

Video thumbnails load inline players on demand. Players support fullscreen; native clips use the local `videos/` directory. YouTube videos require Internet access.

The October 4, 2026 replacement was made locally. Publishing requires a separate Git commit/push. Existing media, resume PDFs, and Git history were preserved. Editorial evidence requests remain in the separate resumeGPT workspace rather than the public navigation.
