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
        accessToken: process.env.ESA_TOKEN,
        teamName: process.env.TEAM_NAME,
        q: `in:blog wip:false`,
        baseCategory: 'blog'
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
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     runtimeCaching: [
    //       {
    //         // Add runtime caching of various page resources.
    //         urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
    //         handler: `networkFirst`,
    //       },
    //       {
    //         // Use the Network First handler for external resources
    //         urlPattern: /^https:/,
    //         handler: `networkFirst`,
    //       },
    //     ],
    //   }
    // },
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'mottox2\'s site',
        short_name: `mottox2`,
        start_url: `/`,
        background_color: `#5F9CBB`,
        theme_color: `#5F9CBB`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
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
                  title: node.fields.title,
                  description: node.fields.excerpt
                }
              })
            },
            query: `
              {
                allEsaPost {
                  edges {
                    node {
                      number
                      fields {
                        title
                        excerpt
                      }
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
