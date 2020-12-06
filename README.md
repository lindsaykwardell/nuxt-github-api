# nuxt-github-api

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

Source plugin for pulling data into Nuxt from the official GitHub v4 [GraphQL API](https://developer.github.com/v4/). Data is fetched at build time, and can be used to create static assets.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Follow GitHub's guide to [generate a token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
2. Add this token to your environment variables (_PLEASE_ don't commit this token!!!)
3. Add `nuxt-github-api` dependency to your project

```bash
yarn add nuxt-github-api -D # or npm install nuxt-github-api --save-dev
```

4. Add the following configuration to your `nuxt.config.js` file:

```js
{
  privateRuntimeConfig: {
    // githubApiToken: required by the GitHub API
    githubApiToken: process.env.GITHUB_TOKEN
  },
  buildModules: [
    'nuxt-github-api',
  ],
  githubApi: {
    // graphQLQuery: defaults to a search query
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
    
    // variables: Object which includes any GraphQL variables required by your query.
    variables: {
      login: 'lindsaykwardell'
    }
  }
}
```

In your Vue components, you can now access this data on `this.$github`. For example:

```vue
<template>
  <div>
    <div>
      <img :src="$github.user.avatarUrl" />
      <h2>{{ $github.user.name }}</h2>
      <h4>{{ $github.user.bio }}</h4>
      <p>{{ lookingForAJob }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lookingForAJob() {
      return this.$github.user.isHireable
        ? 'Looking for a great place to work!'
        : 'Not currently looking for a job'
    }
  }
}
</script>
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Create .env file at the root of the project.
4. Add variable: `GITHUB_TOKEN`
5. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Lindsay Wardell

## Tips and Tricks

You'll probably want to use valid GraphQL queries. To help you, GitHub has a [Query Explorer](https://developer.github.com/v4/explorer/) with auto-completion.

![Query Explorer](https://user-images.githubusercontent.com/1187476/30273078-69695a10-96c5-11e7-90b8-7dc876cc214a.png)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-github-api/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-github-api
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-github-api.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-github-api
[github-actions-ci-src]: https://github.com/lindsaykwardell/nuxt-github-api/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/lindsaykwardell/nuxt-github-api/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/lindsaykwardell/nuxt-github-api.svg
[codecov-href]: https://codecov.io/gh/lindsaykwardell/nuxt-github-api
[license-src]: https://img.shields.io/npm/l/nuxt-github-api.svg
[license-href]: https://npmjs.com/package/nuxt-github-api
