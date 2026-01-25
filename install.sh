#!/bin/bash

# AgCel Installer Script
# Usage: curl -sL https://raw.githubusercontent.com/bennie-ng/ag-cel/main/install.sh | bash

REPO_URL="https://github.com/bennie-ng/ag-cel.git"
TARGET_DIR=".agent"
TEMP_DIR=$(mktemp -d)

echo "🚀 Installing AgCel to $(pwd)..."

# 1. Clone AgCel to a temporary directory
echo "📦 Fetching latest standards from $REPO_URL..."
git clone --depth 1 $REPO_URL "$TEMP_DIR" > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to clone repository."
    rm -rf "$TEMP_DIR"
    exit 1
fi

# 2. Copy the .agent directory
if [ -d "$TARGET_DIR" ]; then
    echo "⚠️  Existing .agent directory found. Backing up to .agent.bak..."
    mv "$TARGET_DIR" "${TARGET_DIR}.bak"
fi

echo "📂 Installing .agent folder..."
cp -r "$TEMP_DIR/.agent" .

# 3. Create or Update README reference
HEADER="## 🤖 AgCel Standards"
README="README.md"

if [ ! -f "$README" ]; then
    echo "# Project" > "$README"
fi

# Check if AgCel is already mentioned
if ! grep -q "AgCel" "$README"; then
    echo "📝 Adding AgCel reference to README.md..."
    echo -e "\n$HEADER\nThis project uses [AgCel](https://github.com/bennie-ng/ag-cel) standards.\nSee [.agent/rules/global.md](.agent/rules/global.md) for guidelines." >> "$README"
fi

# 4. Clean up
rm -rf "$TEMP_DIR"

echo "✅ AgCel installed successfully!"
echo "👉 You can now ask your AI agent to 'Follow AgCel rules'."
