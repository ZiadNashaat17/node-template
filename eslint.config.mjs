import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'app',
    javascript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
    },
    ignores: ['.pnpm-store/*', 'docker-compose.yml'],
  },
  {
    rules: {
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],
      'antfu/top-level-function': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
          ignore: ['README.md'],
        },
      ],
    },
  },
  {
    files: ['**/*.test.js', '**/test/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
  },
);
