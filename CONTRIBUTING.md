# Contributing to Node-Template

Thank you for your interest in contributing! Please follow these guidelines to ensure a smooth contribution process.

## Code Standards

- Follow the ESLint configuration (`pnpm lint`)
- Use camelCase for file names
- Use single quotes for strings
- Use semicolons
- Use 2-space indentation

## Development Workflow

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, documented code
   - Test your changes locally
   - Update relevant documentation

3. **Lint and format**:
   ```bash
   pnpm lint:fix
   ```

4. **Commit** (Husky hooks will validate automatically):
   ```bash
   git commit -m "feat: add your feature"
   ```
   - Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`

5. **Push and create a PR**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Commit Message Format

Following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
<body>
<footer>
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `refactor` - Code refactor
- `test` - Test updates
- `chore` - Build, dependencies, etc.

**Examples**:
```
feat(auth): add JWT token validation
fix(database): handle connection timeout
docs: update MongoDB setup instructions
```

## Testing

Before submitting a PR:
```bash
pnpm test
```

## PR Guidelines

- Provide a clear description of changes
- Link related issues (if any)
- Keep changes focused and atomic
- Update documentation as needed

## Questions?

Open an issue for discussions or questions about the template.

Thanks for contributing! 🎉\n
