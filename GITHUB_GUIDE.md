# GitHub Repository Setup & Deployment Guide

Complete guide to push LocalShare to GitHub and manage the repository.

## Step 1: Create GitHub Repository

### Using GitHub Web Interface

1. Go to [github.com/new](https://github.com/new)
2. Fill in repository details:
   - **Repository name**: `local-share-app`
   - **Description**: `LocalShare - Fast local file sharing app for Android & iOS`
   - **Visibility**: Choose Public or Private
   - **Initialize repository**: Leave unchecked

3. Click "Create repository"

### Using GitHub CLI

```bash
gh repo create local-share-app \
  --description "LocalShare - Fast local file sharing app for Android & iOS" \
  --public
```

---

## Step 2: Push Code to GitHub

### Initialize Git (if not already done)

```bash
cd /home/ubuntu/local-share-app

# Initialize git repository
git init

# Configure git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LocalShare with core features, iOS support, and enhanced design"
```

### Add Remote and Push

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/local-share-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Using GitHub CLI

```bash
cd /home/ubuntu/local-share-app

# Push existing repository to GitHub
gh repo create local-share-app --source=. --remote=origin --push
```

---

## Step 3: Configure Repository Settings

### General Settings

1. Go to your repository on GitHub
2. Click **Settings** → **General**
3. Configure:
   - **Description**: LocalShare - Fast local file sharing app
   - **Website**: (optional) your project website
   - **Topics**: `android`, `ios`, `file-sharing`, `react-native`, `expo`, `local-network`
   - **Default branch**: `main`

### Branch Protection Rules

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Configure:
   - **Branch name pattern**: `main`
   - **Require pull request reviews**: Yes (1 approval)
   - **Require status checks**: Yes
   - **Require branches to be up to date**: Yes

### Collaborators & Teams

1. Go to **Settings** → **Collaborators and teams**
2. Add team members if working with others
3. Set appropriate permissions

---

## Step 4: Create GitHub Releases

### Create First Release

```bash
# Tag the current commit
git tag -a v1.0.0 -m "LocalShare v1.0.0 - Initial Release"

# Push tags to GitHub
git push origin v1.0.0
```

### Using GitHub Web Interface

1. Go to **Releases** tab
2. Click **Create a new release**
3. Fill in:
   - **Tag version**: `v1.0.0`
   - **Release title**: `LocalShare v1.0.0`
   - **Description**: Copy from CHANGELOG.md
   - **Attach files**: Upload APK and IPA files

4. Click **Publish release**

### Using GitHub CLI

```bash
gh release create v1.0.0 \
  --title "LocalShare v1.0.0" \
  --notes "Initial release with core features, iOS support, and enhanced design" \
  android/app/build/outputs/apk/release/app-release.apk
```

---

## Step 5: Enable GitHub Pages (Optional)

For hosting documentation:

1. Go to **Settings** → **Pages**
2. Select **Source**: `main` branch
3. Select **Folder**: `/docs` or `/root`
4. Choose a theme
5. Documentation available at: `https://YOUR_USERNAME.github.io/local-share-app`

---

## Step 6: Setup GitHub Actions (CI/CD)

### Create Workflow Directory

```bash
mkdir -p .github/workflows
```

### Create Build Workflow

Create `.github/workflows/build.yml`:

```yaml
name: Build & Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm check
      
      - name: Run tests
        run: pnpm test
```

### Create APK Build Workflow

Create `.github/workflows/build-apk.yml`:

```yaml
name: Build Android APK

on:
  workflow_dispatch:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Generate Android code
        run: npx expo prebuild --platform android --clean
      
      - name: Build APK
        run: cd android && ./gradlew assembleRelease && cd ..
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/app-release.apk
```

---

## Step 7: Add Repository Badges

Add to README.md:

```markdown
[![Build Status](https://github.com/YOUR_USERNAME/local-share-app/workflows/Build%20%26%20Test/badge.svg)](https://github.com/YOUR_USERNAME/local-share-app/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/local-share-app.svg)](https://github.com/YOUR_USERNAME/local-share-app/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/local-share-app.svg)](https://github.com/YOUR_USERNAME/local-share-app/network)
```

---

## Step 8: Manage Issues & Pull Requests

### Create Issue Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Report a bug
title: '[BUG] '
labels: bug
---

## Description
Describe the bug clearly.

## Steps to Reproduce
1. Step 1
2. Step 2
3. ...

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- Device: (e.g., iPhone 14, Samsung Galaxy S23)
- OS Version: (e.g., iOS 16, Android 13)
- App Version: (e.g., 1.0.0)

## Screenshots
Add screenshots if applicable.
```

### Create Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
Describe your changes here.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Enhancement
- [ ] Documentation

## Related Issues
Closes #(issue number)

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

---

## Step 9: Setup Dependabot (Optional)

1. Go to **Settings** → **Code security and analysis**
2. Enable **Dependabot alerts**
3. Enable **Dependabot security updates**
4. Enable **Dependabot version updates**

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    allow:
      - dependency-type: "all"
```

---

## Useful Git Commands

### Branching

```bash
# Create feature branch
git checkout -b feature/new-feature

# Push branch
git push origin feature/new-feature

# Create pull request
gh pr create --title "Add new feature" --body "Description"
```

### Commits

```bash
# Commit with message
git commit -m "feat: add new feature"

# Amend last commit
git commit --amend --no-edit

# View commit history
git log --oneline
```

### Tags & Releases

```bash
# Create tag
git tag -a v1.0.1 -m "Version 1.0.1"

# Push tags
git push origin --tags

# Delete tag
git tag -d v1.0.0
git push origin :v1.0.0
```

---

## Repository Structure for GitHub

```
local-share-app/
├── .github/
│   ├── workflows/
│   │   ├── build.yml
│   │   └── build-apk.yml
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md
│   └── pull_request_template.md
├── app/
├── lib/
├── components/
├── assets/
├── android/
├── ios/
├── .gitignore
├── README.md
├── INSTALLATION.md
├── iOS_SETUP.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
├── package.json
├── app.config.ts
├── start.sh
└── build-ios.sh
```

---

## Deployment Workflow

### For Each Release

1. **Update version numbers**:
   ```bash
   # Update version in package.json and app.config.ts
   ```

2. **Update CHANGELOG.md**:
   ```bash
   git add CHANGELOG.md
   git commit -m "docs: update changelog for v1.0.1"
   ```

3. **Create tag and push**:
   ```bash
   git tag -a v1.0.1 -m "Version 1.0.1"
   git push origin main
   git push origin v1.0.1
   ```

4. **Create GitHub Release**:
   - Attach APK and IPA files
   - Copy changelog notes
   - Publish release

5. **Deploy to App Stores** (optional):
   - Google Play Store for Android
   - Apple App Store for iOS

---

## Monitoring & Analytics

### GitHub Insights

- **Pulse**: Overview of recent activity
- **Network**: Visualize commit history
- **Traffic**: Track repository visitors
- **Community**: Check community health

### Actions

- Monitor workflow runs
- Check build status
- View test results
- Download artifacts

---

## Troubleshooting

### Authentication Issues

```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/local-share-app.git

# Or use GitHub CLI
gh auth login
```

### Large Files

```bash
# Use Git LFS for large files
git lfs install
git lfs track "*.apk"
git add .gitattributes
```

### Merge Conflicts

```bash
# View conflicts
git status

# Resolve manually, then
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## Best Practices

1. **Use meaningful commit messages**
2. **Create feature branches** for new work
3. **Write comprehensive pull requests**
4. **Keep main branch stable**
5. **Tag releases** consistently
6. **Update documentation** with changes
7. **Review code** before merging
8. **Test thoroughly** before release

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Configure repository settings
4. ✅ Create first release
5. ✅ Setup CI/CD workflows
6. ✅ Invite collaborators
7. ✅ Start accepting contributions!

---

**Happy collaborating! 🚀**
