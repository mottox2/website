const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/post.js')
    resolve(
      graphql(
        `
          {
            allEsaPost {
              edges {
                node {
                  number
                  name
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