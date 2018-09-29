module.exports = {
  siteMetadata: {
    title: 'mottox2 blog',
    author: 'mottox2',
    description: 'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとか',
    siteUrl: 'https://mottox2.com'
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-esa`,
      options: {
        accessToken: process.env.ACCESS_TOKEN,
        teamName: process.env.TEAM_NAME,
        q: `in:blog wip:false`
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-34428182-9'
   }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allEsaExtendedPost } }) => {
              return allEsaExtendedPost.edges.map(edge => {
                const node = edge.node
                return {
                  url: site.siteMetadata.siteUrl + `/posts/${node.number}`,
                  guid: node.number,
                  title: node.name,
                  description: '',
                  pubDate: node.published_on
                }
              })
            },
            query: `
              {
                allEsaExtendedPost {
                  edges {
                    node {
                      number
                      category
                      name
                      body_md
                      tags
                      published_on
                      published_on_unix
                      updated_by {
                        name
                        screen_name
                        icon
                      }
                      updated_at
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
  ]
}
