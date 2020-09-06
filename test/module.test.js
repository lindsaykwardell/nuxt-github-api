const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    ;({ nuxt } = await setup(loadConfig(__dirname, '../../example')))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    // ;({ nuxt } = await setup(loadConfig(__dirname, '../../example')))

    const html = await get('/')
    expect(html).toContain('Lindsay Wardell')
  })

  test('throws error when no Github token is present', async () => {
    try {
      ;({ nuxt } = await setup(
        loadConfig(__dirname, '../../example', {
          githubApi: {
            token: null
          }
        })
      ))
    } catch (err) {
      expect(err.toString().includes('Missing GitHub API token!')).toBe(true)
    }
  })

  test('throws error when query is invalid', async () => {
    try {
      ;({ nuxt } = await setup(
        loadConfig(__dirname, '../../example', {
          githubApi: {
            token: process.env.GITHUB_TOKEN,
            graphQLQuery: 'invalid query'
          }
        })
      ))
    } catch (err) {
      expect(err.toString().includes('GitHub API queries must be wrapped in `query{}`')).toBe(true)
    }
  })
})
