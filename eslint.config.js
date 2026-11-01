import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist/', '.vite-ssg-temp/'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    }
  },
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node }
  },
  // Formatting is Prettier's job
  prettier
]
