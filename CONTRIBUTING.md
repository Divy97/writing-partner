# Contributing to Aura Writing Partner

Thank you for your interest in contributing to Aura! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Follow the [Setup Guide](./SETUP_GUIDE.md) to set up your development environment

## 📝 Code Style

We use automated tools to maintain code quality:

- **Prettier** for code formatting
- **TypeScript** for type safety
- **ESLint** for code linting (to be added)

### Format Your Code

```bash
# Check formatting
pnpm format:check

# Auto-format
pnpm format
```

### Type Checking

```bash
# Check types across all packages
pnpm typecheck
```

## 🏗️ Project Structure

This is a monorepo managed with pnpm workspaces:

```
packages/
├── extension/      # Browser extension
├── backend/        # Serverless backend
├── supabase/       # Database & migrations
└── tsconfig-custom/ # Shared TypeScript config
```

## 🔀 Git Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes

Examples:
- `feature/add-tone-analysis`
- `fix/tooltip-positioning`
- `docs/update-readme`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(extension): add tone analysis feature
fix(backend): correct Gemini API error handling
docs(readme): update installation instructions
```

## 🧪 Testing

Before submitting a PR:

1. **Type check**: `pnpm typecheck`
2. **Format code**: `pnpm format`
3. **Test extension**: Load in browser and test functionality
4. **Test backend**: Run local tests if applicable

## 📥 Pull Request Process

1. **Update documentation** - If you've added/changed features, update relevant docs
2. **Test thoroughly** - Ensure your changes work as expected
3. **Keep commits clean** - Squash commits if needed
4. **Write a clear PR description**:
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Screenshots (if UI changes)

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings or errors
```

## 🐛 Reporting Bugs

Use the issue tracker to report bugs. Include:

1. **Clear title** - Summarize the issue
2. **Steps to reproduce** - Detailed steps
3. **Expected behavior** - What should happen
4. **Actual behavior** - What actually happens
5. **Environment** - Browser, OS, extension version
6. **Screenshots** - If applicable

## 💡 Suggesting Features

We welcome feature suggestions! When suggesting a feature:

1. **Check existing issues** - It might already be planned
2. **Be specific** - Clear use case and requirements
3. **Explain the value** - How does it help users?
4. **Consider scope** - Is it aligned with project goals?

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainers directly: [security-email-here]
3. Provide details on the vulnerability
4. Allow time for a fix before public disclosure

## 📚 Resources

- [README.md](./README.md) - Project overview
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Development setup
- [PROJECT_SCOPE.md](./docs/PROJECT_SCOPE.md) - Product scope
- [TECHNICAL_SOLUTION_DESIGN.md](./docs/TECHNICAL_SOLUTION_DESIGN.md) - Technical architecture

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Accept different viewpoints

---

Thank you for contributing to Aura! 🎉

