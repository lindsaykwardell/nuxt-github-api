require('dotenv').config()
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [{ handler: require('../') }],
  githubApi: {
    token: process.env.GITHUB_TOKEN,
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
