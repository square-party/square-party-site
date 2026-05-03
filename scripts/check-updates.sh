#!/usr/bin/env bash
# check-updates.sh — run at the start of any session before touching files.
# Informational only. Always exits 0.

echo "=== square-party-site update check ==="
echo ""

# Fetch quietly
git fetch origin --quiet 2>/dev/null

# Branch + ahead/behind
echo "--- Branch status ---"
git status -sb
echo ""

# Commits behind origin (only if any)
BEHIND=$(git rev-list --count HEAD..@{u} 2>/dev/null)
if [ "$BEHIND" -gt 0 ] 2>/dev/null; then
  echo "--- Commits you are BEHIND origin ($BEHIND) ---"
  git log HEAD..@{u} --oneline
  echo ""
fi

# Last 5 commits on current branch
echo "--- Last 5 commits ---"
git log -5 --oneline --decorate
echo ""

# Modified / untracked files (skip if clean)
PORCELAIN=$(git status --porcelain)
if [ -n "$PORCELAIN" ]; then
  echo "--- Modified / untracked files ---"
  git status --porcelain
  echo ""
fi

echo "=== end of update check ==="
exit 0
