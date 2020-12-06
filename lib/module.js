const { resolve } = require('path')

const defaultOptions = {
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
  }`,
  variables: {}
}

module.exports = function nuxtGithubApi(opts = defaultOptions) {
  const { graphQLQuery, variables } = {
    ...defaultOptions,
    ...this.options.githubApi,
    ...opts
  }

  const token = this.options.privateRuntimeConfig.githubApiToken

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
      graphQLQuery,
      variables: JSON.stringify(variables)
    }
  })
}

module.exports.meta = require('../package.json')
