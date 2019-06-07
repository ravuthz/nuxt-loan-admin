require('dotenv').config()

import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3001/',
    redirectError: {
      401: '/login',
      404: '/notfound'
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          user: { url: '/api/user', method: 'get', propertyName: 'data' },
          login: { url: '/api/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/api/logout', method: 'post' },
          tokenRequired: true,
          tokenType: 'Bearer'
        },
        // endpoints: {
        //   user: { url: '/api/user', method: 'get', propertyName: 'data' },
        //   login: { url: '/api/login', method: 'post', propertyName: 'token' },
        //   logout: { url: '/api/logout', method: 'post' },
        // }
      }
    }
  },

  router: {
    extendRoutes(routes) {
      // routes = routes.filter(route => route.name !== 'auth-login');
      routes.push({ name: 'login', path: '/login', component: '~/pages/auth/login.vue' })
      console.log('routes: ', routes);
    },
    // Add global auth middleware for all routes
    middleware: ['auth']
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
