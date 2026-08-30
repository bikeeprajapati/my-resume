# Bikee Prajapati — Portfolio

Personal developer portfolio, live at **[bikeeprajapati.com.np](https://bikeeprajapati.com.np)**.

Built as a single self-contained static page — no build step, no framework,
no dependencies. Just `index.html` with embedded CSS and JS, deployed via
GitHub Pages on a custom domain.

## What's here

- **Hero** — quick intro and positioning
- **About / tech stack** — frontend, backend, AI/ML, and DevOps skills
- **Projects** — case studies for top projects, each with a description,
  tech stack, and links to source/live demo where available
- **Résumé** — downloadable PDF
- **Contact** — email, GitHub, LinkedIn

## Structure

```
.
├── index.html    # the entire site: markup, styles, and scripts
├── resume.pdf    # downloadable résumé, linked from the Résumé section
├── CNAME         # custom domain config for GitHub Pages
└── README.md
```

## Running locally

No build tools needed — just open `index.html` in a browser, or serve it
with any static server, e.g.:

```bash
python3 -m http.server 8000
```

## Deployment

Hosted on **GitHub Pages**, served at the custom domain configured in
`CNAME`. Pushing to `master` triggers an automatic rebuild.

## Updating content

Project case studies, tech stack, and links all live directly in
`index.html` inside the `#work` section — update the relevant `<article
class="project">` block to add, edit, or reorder projects. Swap
`resume.pdf` to update the downloadable résumé.
