#!/usr/bin/env bash
# Cleanup script for the my-resume portfolio repo.
# - Safely checks whether legacy files (assets/, resume.html) are still
#   referenced by index.html before removing them.
# - Removes the one-time fix-portfolio.sh helper.
# - Adds a proper README.md and .gitignore.
# - Commits and pushes.
#
# USAGE: place this in your my-resume repo root and run:
#   bash cleanup-portfolio.sh

set -euo pipefail

echo "== 1. Confirming this is a git repo =="
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "ERROR: run this from inside your cloned my-resume folder."
  exit 1
}

echo "== 2. Checking whether index.html references assets/ or resume.html =="
ASSETS_USED=false
RESUME_HTML_USED=false

if [[ -f index.html ]]; then
  if grep -qE 'assets/(css|js|img)' index.html; then
    ASSETS_USED=true
  fi
  if grep -q 'resume.html' index.html; then
    RESUME_HTML_USED=true
  fi
else
  echo "WARNING: index.html not found here — skipping reference checks."
fi

echo "assets/ referenced by index.html?   $ASSETS_USED"
echo "resume.html referenced by index.html? $RESUME_HTML_USED"
echo

echo "== 3. Removing files that are confirmed unused =="
if [[ "$ASSETS_USED" == false && -d assets ]]; then
  echo "Removing unused assets/ folder..."
  rm -rf assets
else
  if [[ -d assets ]]; then
    echo "KEEPING assets/ — it looks like it's still referenced. Check manually."
  fi
fi

if [[ "$RESUME_HTML_USED" == false && -f resume.html ]]; then
  echo "Removing unused resume.html..."
  rm -f resume.html
else
  if [[ -f resume.html ]]; then
    echo "KEEPING resume.html — it looks like it's still referenced. Check manually."
  fi
fi

echo "Removing one-time helper script fix-portfolio.sh (if present)..."
rm -f fix-portfolio.sh

echo "== 4. Writing README.md =="
cat > README.md << 'EOF'
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
EOF

echo "== 5. Writing .gitignore =="
cat > .gitignore << 'EOF'
# OS junk
.DS_Store
Thumbs.db

# Editor/IDE
.vscode/
.idea/
*.swp

# Logs
*.log

# Env files (if any tooling gets added later)
.env
.env.local

# Node (if any tooling gets added later)
node_modules/
EOF

echo "== 6. Reviewing final structure =="
ls -la

echo "== 7. Committing and pushing =="
git add -A
git commit -m "clean up repo: remove legacy template files, add README and .gitignore"
git push origin master

echo
echo "Done. Repo cleaned up and pushed."
echo "Wait 1-2 minutes, then hard-refresh https://bikeeprajapati.com.np to confirm the site still works."
