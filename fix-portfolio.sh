#!/usr/bin/env bash
# Recovery script: reset my-resume repo to a clean state and reapply the
# known-good portfolio files (index.html, resume.pdf).
#
# USAGE:
#   1. Place this script INSIDE your local my-resume repo folder.
#   2. Also place the downloaded index.html and resume.pdf in the SAME folder,
#      but name them index.new.html and resume.new.pdf so they don't collide
#      with anything already there.
#   3. Run:  bash fix-portfolio.sh
#
set -euo pipefail

echo "== 1. Confirming this is a git repo =="
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "ERROR: run this from inside your cloned my-resume folder."
  exit 1
}

echo "== 2. Current status (for your reference) =="
git status --short || true
echo

echo "== 3. Fetching latest from GitHub =="
git fetch origin

echo "== 4. Discarding ALL local changes and untracked mess (except our helper files) =="
# -f = force, -d = remove untracked directories too
# -e excludes our helper files so they survive the cleanup
git reset --hard origin/master
git clean -fd -e index.new.html -e resume.new.pdf -e fix-portfolio.sh

echo "== 5. Confirming replacement files exist =="
if [[ ! -f "index.new.html" ]]; then
  echo "ERROR: index.new.html not found in this folder."
  echo "Download index.html from the chat, rename it to index.new.html, and put it here."
  exit 1
fi
if [[ ! -f "resume.new.pdf" ]]; then
  echo "ERROR: resume.new.pdf not found in this folder."
  echo "Download resume.pdf from the chat, rename it to resume.new.pdf, and put it here."
  exit 1
fi

echo "== 6. Applying known-good files =="
cp index.new.html index.html
cp resume.new.pdf resume.pdf

echo "== 7. Verifying CNAME is untouched =="
if [[ -f CNAME ]]; then
  echo "CNAME contents:"
  cat CNAME
else
  echo "WARNING: CNAME file is missing! Your custom domain will break."
  echo "Recreate it with:  echo 'bikeeprajapati.com.np' > CNAME"
fi

echo "== 8. Cleaning up old template leftovers (optional, safe to skip) =="
rm -f previewvicky.png main-removebg-preview.png main-removebg-previewnew.png main-removebg-previewenew.png profile.jpg 2>/dev/null || true

echo "== 9. Removing the helper files so they don't get committed =="
rm -f index.new.html resume.new.pdf

echo "== 10. Committing and force-pushing =="
git add -A
git commit -m "restore working animated portfolio"
git push origin master --force

echo
echo "Done. Wait 1-2 minutes, then hard-refresh https://bikeeprajapati.com.np"
echo "(Ctrl+Shift+R / Cmd+Shift+R, or open in an incognito window)."
