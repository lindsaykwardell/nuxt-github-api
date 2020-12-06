require('dotenv').config()
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  buildModules: [{ handler: require('../') }],
  privateRuntimeConfig: {
    githubApiToken: process.env.GITHUB_TOKEN
  },
  githubApi: {
    graphQLQuery: `
    query GetUser($login: String!) {
      user(login: $login) {
        name
        avatarUrl
        bio
        isHireable
      }
    }
    `,
    variables: {
      login: 'lindsaykwardell'
    }
  }
}
