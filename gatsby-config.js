const dayjs = require('dayjs')

module.exports = {
  siteMetadata: {
    title: 'mottox2 blog',
    author: 'mottox2',
    description: 'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとか',
    siteUrl: 'https://mottox2.com'
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-typescript',
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
    `gatsby-plugin-twitter`,
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
            serialize: ({ query: { site, allEsaPost } }) => {
              return allEsaPost.edges.map(edge => {
                const node = edge.node
                const matched = node.name.match(/ ?\[(.*?)\] ?/)
                const day = matched ? dayjs(matched[1]) : dayjs(node.updated_at)
                return {
                  date: day.toISOString(),
                  pubDate: day.toISOString(),
                  url: site.siteMetadata.siteUrl + `/posts/${node.number}`,
                  guid: node.number,
                  title: node.name,
                }
              })
            },
            query: `
              {
                allEsaPost {
                  edges {
                    node {
                      number
                      category
                      name
                      body_md
                      tags
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
