require('dotenv').config()
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [{ handler: require('../') }],
  githubApi: {
    token: process.env.GITHUB_API_TOKEN,
    graphQLQuery: `
    query {
      user(login:"lindsaykwardell"){
        name
        avatarUrl
        bio
        isHireable
      }
    }
    `
  }
}
