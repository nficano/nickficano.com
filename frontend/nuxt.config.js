module.exports = {
  mode: 'universal',
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  head: {
    title: 'Top GitHub Python Engineer in NYC',
    titleTemplate: '%s | Nick Ficano',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A creative and candid NYC software engineer focused on creating efficiencies and instilling a culture of humor and collaboration. First hire at two startups.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#0e0d0a' },
  css: [
    {
      src: '~assets/scss/__init__.scss',
      lang: 'scss'
    }
  ],
  plugins: [
    { src: '@/plugins/ios-100vh.client.js' },
    { src: '~/plugins/fullpage.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/eslint-module',
    'nuxt-fullpage.js',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-13233758-1'
      }
    ]
  ],
  sitemap: {
    hostname: 'https://www.nickficano.com',
    gzip: true
  },
  robots: {
    UserAgent: '*'
  },
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true
        }
      })
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    }
  }
}
