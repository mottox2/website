const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");
const dayjs = require('dayjs')
const h2p = require('html2plaintext')

const Parser = require('rss-parser')
const parser = new Parser()

exports.sourceNodes = async ({ actions, createNodeId }) => {
  await parser.parseURL('https://note.mu/mottox2/rss').then((feed) => {
    feed.items.forEach(item => {
      const digest = createNodeId(`${item.link}`)
      actions.createNode({
        ...item,
        id: digest,
        parent: null,
        children: [],
        internal: {
          contentDigest: digest,
          type: 'Note',
        },
        // EsaPostと形式を揃えている
        name: item.title,
        url: item.link,
        relative_category: 'note',
      })
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
    createNodeField({ node, name: 'excerpt', value: h2p(node.body_html)})

    // Extract the date part from node.name (ex. "[2018-10-08] I participated in Techbook Festival")
    const matched = node.name.match(DATE_REGEXP)
    const day = matched ? dayjs(matched[1]) : dayjs(node.updated_at)
    const dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
    createNode(dateNode)
    createParentChildLink({parent: node, child: dateNode})
  } else if (node.internal.type === 'Note') {
    createNodeField({ node, name: 'title', value: node.title })
    createNodeField({ node, name: 'excerpt', value: node.contentSnippet })

    const day = dayjs(node.pubDate)
    const dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
    createNode(dateNode)
    createParentChildLink({parent: node, child: dateNode})
  }
}

const perPage = 12

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
                    excerpt
                  }
                  name
                  tags
                  childPublishedDate {
                    published_on
                    published_on_unix
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
                    excerpt
                  }
                  link
                  childPublishedDate {
                    published_on
                    published_on_unix
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
        const { allEsaPost, allNote } = result.data

        createPaginatedPages({
          edges: [...allEsaPost.edges, ...allNote.edges].sort((a, b) => {
            return b.node.childPublishedDate.published_on_unix - a.node.childPublishedDate.published_on_unix
          }),
          createPage,
          pageTemplate: blogList,
          pageLength: perPage,
          pathPrefix: '',
          buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`
        });

        const categoryMap = new Map()
        const tagMap = new Map()
        const postEntities = {}

        _.each(allEsaPost.edges, (postEdge) => {
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
            pageLength: perPage,
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
            pageLength: perPage,
            pathPrefix: `tags/${tag}`,
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
            context: { tag }
          });
        })
      })
    )
  })
}
