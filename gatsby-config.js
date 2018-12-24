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
    `gatsby-plugin-emotion`,
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
              return allEsaPost.edges.sort((a, b) => {
                return b.node.childPublishedDate.published_on_unix - a.node.childPublishedDate.published_on_unix
              }).map(edge => {
                const node = edge.node
                const day = dayjs(node.childPublishedDate.published_on)
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
                      childPublishedDate {
                        published_on
                        published_on_unix
                      }
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
