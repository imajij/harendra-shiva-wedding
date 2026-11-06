#!/usr/bin/env bash
# Build for GitHub Pages and publish dist/ to the gh-pages branch.
# GitHub serves the branch at https://<owner>.github.io/<repo>/ (Pages source: gh-pages, /).
set -euo pipefail

repo_url=$(git remote get-url origin)
repo_name=$(basename -s .git "$repo_url")
rev=$(git rev-parse --short HEAD)

BASE_PATH="/${repo_name}/" npx vite build
touch dist/.nojekyll            # serve files as-is (no Jekyll processing)
cp dist/index.html dist/404.html

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -R dist/. "$tmp/"
cd "$tmp"
git init -q -b gh-pages
git config user.name "$(git -C "$OLDPWD" config user.name)"
git config user.email "$(git -C "$OLDPWD" config user.email)"
git add -A
git commit -q -m "Deploy ${rev} to GitHub Pages"
git push -q -f "$repo_url" gh-pages
echo "Deployed ${rev} → https://$(echo "$repo_url" | sed -E 's#.*[:/]([^/]+)/[^/]+$#\1#').github.io/${repo_name}/"
