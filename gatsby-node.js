const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");
const dayjs = require('dayjs')

const Parser = require('rss-parser')
const parser = new Parser()
const crypto = require('crypto');
const createContentDigest = obj => crypto.createHash('md5').update(obj).digest('hex');

exports.sourceNodes = async ({ boundActionCreators }) => {
  await parser.parseURL('https://note.mu/mottox2/rss').then((feed) => {
    feed.items.forEach(item => {
      const digest = createContentDigest(item.link)
      const day = dayjs(item.pubDate)
      boundActionCreators.createNode(Object.assign({}, item, {
        id: digest,
        published_on: day.toISOString(),
        published_on_unix: day.unix(),
        parent: `__SOURCE__`,
        children: [],
        internal: {
          contentDigest: digest,
          type: 'Note',
        }
      }))
    })
  })
}

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNode } = boundActionCreators

  if (node.internal.type === 'EsaPost') {
    const matched = node.name.match(/ ?\[(.*?)\] ?/)
    const day = matched ? dayjs(matched[1]) : dayjs(node.updated_at)
    const digest = createContentDigest('blog' + node.number)
    createNode({
      ...node,
      id: digest,
      name: matched ? node.name.replace(matched[0], '') : node.name,
      published_on: day.toISOString(),
      published_on_unix: day.unix(),
      internal: {
        contentDigest: digest,
        type: 'EsaExtendedPost'
      }
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogList = path.resolve('./src/templates/PostsTemplate.js')
    const blogPost = path.resolve('./src/templates/PostTemplate.js')
    resolve(
      graphql(
        `
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

            allNote {
              edges {
                node {
                  id
                  title
                  link
                  published_on
                  published_on_unix
                  contentSnippet
                  isoDate
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
        const posts = result.data.allEsaExtendedPost.edges;
        const notes = result.data.allNote.edges.map((noteEdge, index) => {
          const note = noteEdge.node
          return { node: {
            name: note.title,
            body_md: note.contentSnippet,
            url: note.link,
            type: 'note',
            category: 'note',
            key: note.id,
            number: index,
            published_on: note.published_on,
            published_on_unix: note.published_on_unix,
            updated_at: note.isoDate,
            updated_by: {
              screen_name: 'mottox2',
              icon: 'https://img.esa.io/uploads/production/members/26458/icon/thumb_m_19f30e93b0112f046e71c4c5a2569034.jpg',
            }
          }}
        })

        createPaginatedPages({
          edges: posts.concat(notes).sort((a, b) => {
            return b.node.published_on_unix - a.node.published_on_unix
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
        //     buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}?page=${index}` : `/${pathPrefix}`,
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
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}?page=${index}` : `/${pathPrefix}`,
            context: { tag }
          });
        })
      })
    )
  })
}