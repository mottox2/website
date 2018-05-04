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

        // Create blog posts pages.
        const posts = result.data.allEsaPost.edges;

        createPaginatedPages({
          edges: posts,
          createPage,
          pageTemplate: blogList,
          pageLength: 10,
          pathPrefix: '',
          buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}?page=${index}` : `/${pathPrefix}`
        });

        _.each(posts, (post, index) => {
          const postNode = post.node
          console.log(postNode)
          createPage({
            path: `posts/${postNode.number}`,
            component: blogPost,
            context: {
              number: postNode.number
            },
          })
        })
      })
    )
  })
}