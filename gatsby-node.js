const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");
const dayjs = require('dayjs')

const Parser = require('rss-parser')
const parser = new Parser()
const crypto = require('crypto');
const createContentDigest = obj => crypto.createHash('md5').update(obj).digest('hex');

exports.sourceNodes = async ({ actions, createNodeId }) => {
  await parser.parseURL('https://note.mu/mottox2/rss').then((feed) => {
    feed.items.forEach(item => {
      const digest = createNodeId(`${item.link}`)
      actions.createNode(Object.assign({}, item, {
        id: digest,
        parent: `__SOURCE__`,
        children: [],
        internal: {
          contentDigest: digest,
          type: 'Note',
        },
        // EsaPostと形式を揃えている
        name: item.title,
        body_md: item.contentSnippet,
        url: item.link,
        category: 'note',
        updated_by: {
          screen_name: 'mottox2',
          icon: 'https://img.esa.io/uploads/production/members/26458/icon/thumb_m_19f30e93b0112f046e71c4c5a2569034.jpg',
        }
      }))
    })
  })
};

const createDateNode = ({ createNodeId, nodeId, day }) => {
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

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  if (node.internal.type === 'EsaPost') {
    const matched = node.name.match(/ ?\[(.*?)\] ?/)
    const day = matched ? dayjs(matched[1]) : dayjs(node.updated_at)
    const dateNode = createDateNode({
      nodeId: node.id, day, createNodeId
    })
    createNode(dateNode)
    createParentChildLink({parent: node, child: dateNode})
  } else if (node.internal.type === 'Note') {
    const day = dayjs(node.pubDate)
    const dateNode = createDateNode({
      nodeId: node.id, day, createNodeId
    })
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
                  category
                  name
                  body_md
                  tags
                  childPublishedDate {
                    published_on
                    published_on_unix
                  }
                  updated_by {
                    name
                    screen_name
                    icon
                  }
                }
              }
            }

            allNote {
              edges {
                node {
                  id
                  title
                  link
                  contentSnippet
                  isoDate
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
        const posts = result.data.allEsaPost.edges
        const notes = result.data.allNote.edges

        createPaginatedPages({
          edges: posts.concat(notes).sort((a, b) => {
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

        _.each(posts, (post, index) => {
          const postNode = post.node

          postNode.tags.forEach(tag => {
            tagMap.set(tag, tagMap.get(tag) ? tagMap.get(tag).concat(postNode.number) : [postNode.number])
          })
          categoryMap.set(
            postNode.category,
            categoryMap.get(postNode.category) ? categoryMap.get(postNode.category).concat(postNode.number) : [postNode.number]
          )

          createPage({
            path: `posts/${postNode.number}`,
            component: blogPost,
            context: {
              number: postNode.number
            },
          })

          postEntities[postNode.number] = post
        })

        // Array.from(categoryMap.keys()).map((category) => {
        //   const postNumbers = categoryMap.get(category)
        //   createPaginatedPages({
        //     edges: postNumbers.map(number => postEntities[number]),
        //     createPage,
        //     pageTemplate: blogList,
        //     pageLength: 10,
        //     pathPrefix: `categories/${category}`,
        //     buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
        //     context: { category }
        //   });
        // })

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
