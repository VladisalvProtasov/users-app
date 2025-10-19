export default {
  ssr: true,
  target: 'server',
  css: ['~/assets/scss/users.scss'],
  plugins: ['~/plugins/api.js'],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
  ],
  vuetify: {
    theme: {
      dark: false,
      defaultTheme: 'light',
      themes: {
        light: {
          primary: '#eaa300',
          secondary: 'rgba(238,238,238,0.24)',
          accent: '#FFD166',
        },
        dark: {
          primary: '#eaa300',
          secondary: 'rgba(51,51,51,0.24)',
          accent: '#FFD166',
        },
      },
    },
  },

  build: {
    transpile: [],
    extend(config, { isServer }) {
      if (isServer) {
        config.devtool = 'inline-source-map'
      }
    }
  },
  
  generate: {
    fallback: true
  },
  
  hooks: {
    build: {
      done(builder) {
        const { execSync } = require('child_process')
        execSync('mkdir -p .output/server && cp -r .nuxt/dist/server .output/server/', { stdio: 'inherit' })
      }
    }
  }
};
