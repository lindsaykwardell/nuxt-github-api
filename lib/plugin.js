const gql = async (url, query, variables, options) => {
  const res = await fetch(url, {
    ...options,
    body: JSON.stringify({
      query,
      variables
    })
  })

  if (!res.ok) throw new Error(res.json())

  const body = await res.json()

  if (body.errors) throw new Error(body.errors)

  return body
}

const url = 'https://api.github.com/graphql'

const fetchFromGitHub = (token, graphQLQuery, variables) => {
  return gql(url, graphQLQuery, variables, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default async (context, inject) => {
  const { data } = await fetchFromGitHub(
    '<%= options.token %>',
    `<%= options.graphQLQuery %>`,
    {}
  )

  inject('github', data)

  context.$github = data
}
