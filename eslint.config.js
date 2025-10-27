const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const pluginPrettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const nextPlugin = require('@next/eslint-plugin-next');
const pluginMdx = require('eslint-plugin-mdx');

/** @type {import('eslint').Linter.Config[]} */
module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': [2, { ignore: ['jsx'] }]
    },
    settings: {
      react: { version: 'detect' }
    }
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          arrowFunctions: true
        }
      }
    },
    plugins: {},
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-console': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      },
      tailwindcss: {
        callees: ['cn', 'clsx', 'ctl', 'cva', 'tv']
      }
    }
  },

  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off'
    }
  },

  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,mdx,md}'],
    plugins: {
      'react-hooks': reactHooks,
      prettier: pluginPrettier
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'prettier/prettier': 'warn'
    }
  },

  {
    files: ['**/*.{mdx,md}'],
    plugins: {
      mdx: pluginMdx
    },
    processor: pluginMdx.processors?.remark,
    settings: {
      'mdx/code-blocks': true
    }
  },

  {
    ignores: ['node_modules/*', '.next/', '.turbo/', '.out/', '**/build', '**/coverage']
  },

  prettierConfig
);
