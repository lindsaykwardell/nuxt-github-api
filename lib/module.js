const { resolve } = require('path')

const defaultOptions = {
  token: null,
  graphQLQuery: `query ($nFirst: Int = 2, $q: String = "") {
    search(query: $q, type: ISSUE, first: $nFirst){
      edges{
        node{
          ... on PullRequest{
            title
          }
        }
      }
    }
  }`
}

module.exports = function nuxtGithubApi(opts = defaultOptions) {
  const { token, graphQLQuery } = {
    ...defaultOptions,
    ...opts,
    ...this.options.githubApi
  }

  if (!token) {
    throw new Error('Missing GitHub API token!')
  }

  if (graphQLQuery.trim().indexOf('query') !== 0) {
    throw new Error('GitHub API queries must be wrapped in `query{}`.')
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    options: {
      token,
      graphQLQuery
    }
  })
}

module.exports.meta = require('../package.json')
