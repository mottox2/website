const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");
const dayjs = require('dayjs')

const Parser = require('rss-parser')
const parser = new Parser()

exports.sourceNodes = async ({ actions, createNodeId }) => {
  await parser.parseURL('https://note.mu/mottox2/rss').then((feed) => {
    feed.items.forEach(item => {
      const digest = createNodeId(`${item.link}`)
      actions.createNode(Object.assign({}, {
        ...item,
        // EsaPostと形式を揃えている
        name: item.title,
        body_md: item.contentSnippet,
        url: item.link,
        relative_category: 'note',
        updated_by: {
          screen_name: 'mottox2',
          icon: 'https://img.esa.io/uploads/production/members/26458/icon/thumb_m_19f30e93b0112f046e71c4c5a2569034.jpg',
        }
      }, {
        id: digest,
        parent: `__SOURCE__`,
        children: [],
        internal: {
          contentDigest: digest,
          type: 'Note',
        },
      }))
    })
  })
};

const buildDateNode = ({ createNodeId, nodeId, day }) => {
  return {
    id: createNodeId(`${nodeId} >>> PublishedDate`),
    published_on: day.toISOString(),
    published_on_unix: day.unix(),
    children: [],
    parent: nodeId,
    internal: {
      contentDigest: createNodeId(`${nodeId} >>> PublishedDate`),
      type: 'PublishedDate',
    }
  }
}

const DATE_REGEXP = / ?\[(.*?)\] ?/

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const { createNode, createParentChildLink, createNodeField } = actions

  if (node.internal.type === 'EsaPost') {
    createNodeField({ node, name: 'title', value: node.name.replace(DATE_REGEXP, '') })

    // Extract the date part from node.name (ex. "[2018-10-08] I participated in Techbook Festival")
    const matched = node.name.match(DATE_REGEXP)
    const day = matched ? dayjs(matched[1]) : dayjs(node.updated_at)
    const dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
    createNode(dateNode)
    createParentChildLink({parent: node, child: dateNode})
  } else if (node.internal.type === 'Note') {
    createNodeField({ node, name: 'title', value: node.title })

    const day = dayjs(node.pubDate)
    const dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
    createNode(dateNode)
    createParentChildLink({parent: node, child: dateNode})
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogList = path.resolve('./src/templates/posts.tsx')
    const blogPost = path.resolve('./src/templates/post.tsx')
    resolve(
      graphql(
        `
          {
            allEsaPost {
              edges {
                node {
                  number
                  relative_category
                  fields {
                    title
                  }
                  name
                  body_md
                  tags
                  childPublishedDate {
                    published_on
                    published_on_unix
                  }
                  updated_by {
                    screen_name
                    icon
                  }
                }
              }
            }

            allNote {
              edges {
                node {
                  relative_category
                  fields {
                    title
                  }
                  link
                  body_md
                  childPublishedDate {
                    published_on
                    published_on_unix
                  }
                  updated_by {
                    screen_name
                    icon
                  }
                }
              }
            }

          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const posts = result.data.allEsaPost.edges
        const notes = result.data.allNote.edges

        createPaginatedPages({
          edges: [...posts, ...notes].sort((a, b) => {
            return b.node.childPublishedDate.published_on_unix - a.node.childPublishedDate.published_on_unix
          }),
          createPage,
          pageTemplate: blogList,
          pageLength: 12,
          pathPrefix: '',
          buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`
        });

        const categoryMap = new Map()
        const tagMap = new Map()
        const postEntities = {}
        const categoryEntities = {}
        const tagEntities = {}

        _.each(posts, (postEdge) => {
          const post = postEdge.node
          const number = post.number

          post.tags.forEach(tag => {
            tagMap.set(tag, tagMap.get(tag) ? tagMap.get(tag).concat(number) : [number])
          })

          const category = post.relative_category || 'blog'
          const numbersByCategory = categoryMap.get(category)
          categoryMap.set(category, numbersByCategory ? numbersByCategory.concat(number) : [number])

          createPage({
            path: `posts/${post.number}`,
            component: blogPost,
            context: {
              number: post.number
            },
          })

          postEntities[post.number] = postEdge
        })

        Array.from(categoryMap.keys()).map((category) => {
          const postNumbers = categoryMap.get(category)
          createPaginatedPages({
            edges: postNumbers.map(number => postEntities[number]),
            createPage,
            pageTemplate: blogList,
            pageLength: 10,
            pathPrefix: `categories/${category}`,
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
            context: { category }
          });
        })

        Array.from(tagMap.keys()).map((tag) => {
          const postNumbers = tagMap.get(tag)
          createPaginatedPages({
            edges: postNumbers.map(number => postEntities[number]),
            createPage,
            pageTemplate: blogList,
            pageLength: 10,
            pathPrefix: `tags/${tag}`,
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
            context: { tag }
          });
        })
      })
    )
  })
}
