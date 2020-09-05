# gridsome-source-github-api

Source plugin for pulling data into Nuxt from the official GitHub v4 [GraphQL API](https://developer.github.com/v4/). Data is fetched at build time, and can be used to create static assets.

Based on [gridsome-source-github-api](https://github.com/lindsaykwardell/gridsome-source-github-api).

## Install

`npm i nuxt-plugin-github-api`
`yarn add nuxt-plugin-github-api`

## How to use

Follow GitHub's guide [how to generate a token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

Once you are done, go to `nuxt.config.js`. In there, you want to add `nuxt-plugin-github-api` as a module, and at least add the token in the options object:

```javascript
// In your nuxt.config.js
modules: [
  ['nuxt-plugin-github-api', {
    // token: required by the GitHub API
    token: process.env.GITHUB_API_TOKEN,

    // graphQLQuery: defaults to a search query
    graphQLQuery: `
      query {
        user(login:"lindsaykwardell"){
          name
          avatarUrl
          bio
          isHireable
        }
      }`
  }]
];
```

In your Vue components, you can now access this data on `this.$github`. For example:

```vue

<template>
  <div>
    <div>
      <img :src="$github.user.avatarUrl" />
      <h2>{{$github.user.name}}</h2>
      <h4>{{$github.user.bio}}</h4>
      <p>{{lookingForAJob}}</p>
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


## Tips and Tricks

You'll probably want to use valid GraphQL queries. To help you, GitHub has a [Query Explorer](https://developer.github.com/v4/explorer/) with auto-completion.

![Query Explorer](https://user-images.githubusercontent.com/1187476/30273078-69695a10-96c5-11e7-90b8-7dc876cc214a.png)
