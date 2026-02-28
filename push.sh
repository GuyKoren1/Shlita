#!/bin/bash
cd "$(dirname "$0")"

# Check for changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "Nothing to commit."
    exit 0
fi

# Show status
echo "=== Changes ==="
git status -s
echo ""

# Get commit message
if [ -n "$1" ]; then
    MSG="$1"
else
    read -p "Commit message: " MSG
    if [ -z "$MSG" ]; then
        echo "No message provided, aborting."
        exit 1
    fi
fi

# Stage all, commit, push
git add -A
git commit -m "$MSG"
git push
