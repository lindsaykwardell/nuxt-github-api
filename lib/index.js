import path from "path";

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
};

export default function nuxtGithubApi(opts = defaultOptions) {
  const { token, graphQLQuery } = {
    ...defaultOptions,
    ...opts
  };

  if (!token) throw new Error("Missing GitHub API token!");
  if (graphQLQuery.trim().indexOf("query") !== 0)
    throw new Error("GitHub API queries must be wrapped in `query{}`.");

  this.addPlugin({
    src: path.resolve(__dirname, "/plugin/plugin.js"),
    options: {
      token,
      graphQLQuery
    }
  });
};
