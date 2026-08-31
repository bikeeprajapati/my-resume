# Bikee Prajapati — Portfolio

Personal developer portfolio, live at **[bikeeprajapati.com.np](https://bikeeprajapati.com.np)**.

A static site with markup, styles, and scripts kept separate — no build step,
no framework, no dependencies. Deployed via GitHub Pages on a custom domain.

## Structure

```
.
├── index.html      # markup only
├── css/
│   └── style.css   # all styles, organized by section
├── js/
│   └── main.js     # scroll reveals, cursor glow, footer year
├── resume.pdf       # downloadable résumé, linked from the Résumé section
├── CNAME            # custom domain config for GitHub Pages
└── README.md
```

## Running locally

No build tools needed. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Opening `index.html` directly in a browser also works, since there's no
bundler or module system involved.

## Deployment

Hosted on **GitHub Pages**, served at the custom domain configured in
`CNAME`. Pushing to `master` triggers an automatic rebuild.

## Updating content

- **Projects, tech stack, links** — edit the relevant `<article
  class="project">` block inside the `#work` section of `index.html`.
- **Styling** — `css/style.css` is organized top to bottom: variables and
  reset, typography, nav, hero, animations, sections (about, work, resume,
  contact), and responsive breakpoints at the bottom of each component.
- **Behavior** — `js/main.js` handles the footer year, scroll-triggered
  reveal animations, and the ambient cursor glow. `js/chatbot.js` runs the
  chat assistant (a scripted, keyword-matched FAQ bot — no API, no backend,
  nothing leaves the browser). Everything respects `prefers-reduced-motion`.
- **Résumé** — replace `resume.pdf` with an updated file of the same name.

## Chat assistant

The bottom-right chat widget answers common questions (projects, tech
stack, résumé, contact) by matching keywords against a fixed list of
Q&amp;A pairs in `js/chatbot.js` — it is not a live AI and makes no network
calls. To add or edit answers, update the `FAQ` array at the top of that
file; each entry is a list of trigger keywords and a reply string.
