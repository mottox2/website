const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");

const perPage = 12

module.exports = ({ graphql, actions }) => {
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

        const latestPostEdges = allEsaPost.edges.filter((_, index) => index < 4)

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
              number: post.number,
              latestPosts: latestPostEdges.filter(latestPostEdge => {
                return latestPostEdge.node.number !== post.number
              }),
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