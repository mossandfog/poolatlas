#!/bin/bash
cd ~/Documents/GitHub/poolatlas

# Remove any stale git lock files
find .git -name "*.lock" -delete

# Stage all changes
git add -A

# Commit
git commit -m "Add For Hotels badge system, blog posts, image updates, copy button"

# Push to origin (triggers Vercel deploy)
git push origin main

echo ""
echo "Done! Vercel will deploy automatically."
echo "Check: https://vercel.com/dashboard"
echo ""
read -p "Press Enter to close..."
