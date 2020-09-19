const dayjs = require('dayjs')

module.exports = {
  siteMetadata: {
    title: 'mottox2 blog',
    author: 'mottox2',
    description:
      'mottox2のエンジニア・デザインブログ。GatsbyとかReactとかTypeScriptとか',
    siteUrl: 'https://mottox2.com',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-esa`,
      options: {
        accessToken: process.env.ESA_TOKEN,
        teamName: process.env.TEAM_NAME,
        q: `in:blog wip:false`,
        baseCategory: 'blog',
      },
    },
    {
      resolve: `gatsby-source-microcms`,
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: 'series',
            query: {
              limit: 100,
              fields: [
                'id',
                'name',
                'thumbnail',
                'postIds',
                'createdAt',
                'updatedAt',
              ].join(','),
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://note.com/mottox2/rss`,
        name: `NotePost`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://qiita.com/mottox2/feed`,
        name: `QiitaPost`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/data/external-posts.yml`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-34428182-9',
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`, // {
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
        name: "mottox2's site",
        short_name: `mottox2`,
        start_url: `/`,
        background_color: `#4aa1c4`,
        theme_color: `#4aa1c4`,
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
            serialize: ({
              query: {
                site,
                allEsaPost,
                allFeedQiitaPost,
                allFeedNotePost,
                allExternalPostsYaml,
              },
            }) => {
              return [
                ...allEsaPost.edges,
                ...allFeedNotePost.edges,
                ...allFeedQiitaPost.edges,
                ...allExternalPostsYaml.edges,
              ]
                .sort((a, b) => {
                  const bDate = b.node.pubDate
                    ? new Date(b.node.pubDate)
                    : new Date(b.node.childPublishedDate.published_on)
                  const aDate = a.node.pubDate
                    ? new Date(a.node.pubDate)
                    : new Date(a.node.childPublishedDate.published_on)
                  return bDate - aDate
                })
                .map((edge) => {
                  const node = edge.node

                  switch (node.internal.type) {
                    case 'EsaPost':
                      const day = dayjs(node.childPublishedDate.published_on)
                      return {
                        date: day.toISOString(),
                        pubDate: day.toISOString(),
                        url:
                          site.siteMetadata.siteUrl + `/posts/${node.number}`,
                        guid: node.number,
                        title: node.fields.title,
                        description: node.fields.excerpt,
                      }
                      break

                    case 'FeedQiitaPost':
                    case 'FeedNotePost':
                      return {
                        date: dayjs(node.pubDate).toISOString(),
                        pubDate: dayjs(node.pubDate).toISOString(),
                        url: node.link,
                        guid: node.link,
                        title: node.title,
                        description: node.contentSnippet.substring(0, 512),
                      }
                      break

                    case 'ExternalPostsYaml':
                      return {
                        date: dayjs(
                          node.childPublishedDate.published_on,
                        ).toISOString(),
                        pubDate: dayjs(
                          node.childPublishedDate.published_on,
                        ).toISOString(),
                        url: node.link,
                        guid: node.link,
                        title: node.fields.title,
                        description: node.fields.excerpt.substring(0, 512),
                      }

                    default:
                      throw `${node.internal.type} is unknown type`
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
                      internal {
                        type
                      }
                    }
                  }
                }
                allFeedQiitaPost {
                  edges {
                    node {
                      title
                      pubDate
                      contentSnippet
                      link
                      internal {
                        type
                      }
                    }
                  }
                }
                allFeedNotePost {
                  edges {
                    node {
                      title
                      pubDate
                      contentSnippet
                      link
                      internal {
                        type
                      }
                    }
                  }
                }
                allExternalPostsYaml {
                  edges {
                    node {
                      link
                      fields {
                        title
                        excerpt
                        category
                      }
                      childPublishedDate {
                        published_on
                        published_on_unix
                      }
                      internal {
                        type
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
  ],
}
