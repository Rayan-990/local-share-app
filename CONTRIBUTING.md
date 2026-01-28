# Contributing to LocalShare

Thank you for your interest in contributing to LocalShare! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/local-share-app.git
   cd local-share-app
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/manus-team/local-share-app.git
   ```

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for Android
pnpm android
```

## Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly

3. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## Commit Message Guidelines

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test additions/changes
- `chore:` for maintenance tasks

Example:
```
feat: add file compression before transfer
```

## Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use Tailwind CSS classes for styling
- Keep components focused and reusable
- Add comments for complex logic

## Testing

- Write tests for new features
- Ensure all tests pass: `pnpm test`
- Test on actual Android devices when possible

## Pull Request Process

1. Update the README.md if needed
2. Update the CHANGELOG.md with your changes
3. Ensure all tests pass
4. Request review from maintainers
5. Address any feedback

## Reporting Bugs

When reporting bugs, please include:
- Device model and Android version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos if applicable

## Feature Requests

When requesting features, please describe:
- The use case
- How it would improve the app
- Any alternative solutions you've considered

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report inappropriate behavior

## Questions?

Feel free to open an issue or reach out to the maintainers.

Thank you for contributing! 🎉
