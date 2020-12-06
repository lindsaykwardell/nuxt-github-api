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
    const html = await get('/')
    expect(html).toContain('Lindsay Wardell')
  })

  test('throws error when no Github token is present', async () => {
    let threwError = false

    try {
      ;({ nuxt } = await setup(
        loadConfig(__dirname, '../../example', {
          privateRuntimeConfig: {
            githubApiToken: null
          }
        })
      ))
    } catch (err) {
      threwError = true
      expect(err.toString().includes('Missing GitHub API token!')).toBe(true)
    }

    expect(threwError).toBe(true)
  })

  test('throws error when query is invalid', async () => {
    let threwError = false

    try {
      ;({ nuxt } = await setup(
        loadConfig(__dirname, '../../example', {
          githubApi: {
            graphQLQuery: 'invalid query'
          }
        })
      ))
    } catch (err) {
      threwError = true
      expect(
        err
          .toString()
          .includes('GitHub API queries must be wrapped in `query{}`')
      ).toBe(true)
    }

    expect(threwError).toBe(true)
  })
})
