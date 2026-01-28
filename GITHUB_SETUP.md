# GitHub Repository Setup

This guide will help you set up the LocalShare repository on GitHub.

## Prerequisites

- GitHub account
- Git installed on your machine
- GitHub CLI (optional but recommended)

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/new)
2. Fill in the repository details:
   - **Repository name**: `local-share-app`
   - **Description**: `LocalShare - Fast local file sharing app for Android`
   - **Visibility**: Choose Public or Private
   - **Initialize repository**: Leave unchecked (we'll push existing code)

3. Click "Create repository"

## Step 2: Push Code to GitHub

### Using Git CLI

```bash
cd /path/to/local-share-app

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LocalShare app with core features"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/local-share-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Using GitHub CLI

```bash
cd /path/to/local-share-app

# Create repository on GitHub
gh repo create local-share-app --public --source=. --remote=origin --push

# Or for private repository
gh repo create local-share-app --private --source=. --remote=origin --push
```

## Step 3: Configure Repository Settings

1. Go to your repository on GitHub
2. Click "Settings"
3. Configure the following:

### General
- Add description: "LocalShare - Fast local file sharing app for Android"
- Add topics: `android`, `file-sharing`, `react-native`, `expo`, `local-network`

### Branches
- Set default branch to `main`
- Add branch protection rules (optional):
  - Require pull request reviews before merging
  - Require status checks to pass

### Collaborators
- Add team members if working with others

## Step 4: Add GitHub Actions (Optional)

Create `.github/workflows/build.yml`:

```yaml
name: Build APK

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
```

## Step 5: Create Release

1. Go to "Releases" tab
2. Click "Create a new release"
3. Fill in:
   - **Tag version**: `v1.0.0`
   - **Release title**: `LocalShare v1.0.0`
   - **Description**: Copy from CHANGELOG.md
   - **Attach APK file**: Upload the built APK

## Step 6: Enable GitHub Pages (Optional)

If you want to host documentation:

1. Go to Settings → Pages
2. Select `main` branch as source
3. Choose a theme
4. Documentation will be available at `https://YOUR_USERNAME.github.io/local-share-app`

## Useful GitHub Commands

### Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/local-share-app.git
```

### Create a new branch
```bash
git checkout -b feature/new-feature
```

### Push changes
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### Create a pull request
```bash
gh pr create --title "Add new feature" --body "Description of changes"
```

## Continuous Integration Setup

### Using GitHub Actions

Add more workflows for:
- Linting and formatting checks
- Automated testing
- APK build and release
- Dependency updates

### Using External Services

Consider integrating:
- CodeQL for security analysis
- Dependabot for dependency updates
- SonarCloud for code quality

## Repository Badges

Add to README.md:

```markdown
[![Build Status](https://github.com/YOUR_USERNAME/local-share-app/workflows/Build%20APK/badge.svg)](https://github.com/YOUR_USERNAME/local-share-app/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/local-share-app.svg)](https://github.com/YOUR_USERNAME/local-share-app/stargazers)
```

## Troubleshooting

### Authentication Issues
```bash
# If you get authentication errors, use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/local-share-app.git

# Or configure git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Large Files
If you need to store large files (like APK):
- Use GitHub Releases for APK files
- Consider Git LFS for large binary files

## Next Steps

1. Share the repository link with your team
2. Set up contribution guidelines
3. Create issues for feature requests and bugs
4. Start accepting pull requests from contributors

---

For more information, visit [GitHub Docs](https://docs.github.com)
