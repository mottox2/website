const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogList = path.resolve('./src/templates/PostsTemplate.js')
    const blogPost = path.resolve('./src/templates/PostTemplate.js')
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
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const posts = result.data.allEsaPost.edges;

        createPaginatedPages({
          edges: posts,
          createPage,
          pageTemplate: blogList,
          pageLength: 10,
          pathPrefix: '',
          buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}?page=${index}` : `/${pathPrefix}`
        });

        const categoryMap = new Map()
        const tagMap = new Map()
        const postEntities = {}

        _.each(posts, (post, index) => {
          const postNode = post.node

          postNode.tags.forEach(tag => {
            tagMap.set(tag, tagMap.get(tag) ? tagMap.get(tag).concat(postNode.number) : [postNode.number]
            )
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

        Array.from(categoryMap.keys()).map((category) => {
          const postNumbers = categoryMap.get(category)
          createPaginatedPages({
            edges: postNumbers.map(number => postEntities[number]),
            createPage,
            pageTemplate: blogList,
            pageLength: 10,
            pathPrefix: `categories/${category}`,
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}?page=${index}` : `/${pathPrefix}`
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
            buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}?page=${index}` : `/${pathPrefix}`
          });
        })

        console.log(categoryMap)
        console.log(tagMap)
      })
    )
  })
}