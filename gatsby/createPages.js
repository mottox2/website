const fs = require('fs')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");

const perPage = 12

// { [id: number]: Series }
const prepareSeries = allMicrocmsSeries => {
  const seriesMap = new Map()
  console.log(allMicrocmsSeries)
  allMicrocmsSeries.nodes.map(node => {
    node.postIds.split(',').forEach(postId => {
      const id = Number(postId)
      seriesMap.set(id, { ...node })
    })
  })

  return seriesMap
}

module.exports = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogList = path.resolve('./src/templates/posts.tsx')
  const blogPost = path.resolve('./src/templates/post.tsx')
  return graphql(`
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

      allFeedNotePost {
        edges {
          node {
            fields {
              title
              excerpt
              category
            }
            childPublishedDate {
              published_on
              published_on_unix
            }
            link
          }
        }
      }

      allExternalPostsYaml {
        edges {
          node {
            fields {
              title
              excerpt
              category
            }
            childPublishedDate {
              published_on
              published_on_unix
            }
            link
          }
        }
      }

      allMicrocmsSeries {
        nodes {
          id
          name
          thumbnail {
            url
          }
          postIds
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors)
    }
    const { allEsaPost, allFeedNotePost, allExternalPostsYaml, allMicrocmsSeries } = result.data

    const seriesMap = prepareSeries(allMicrocmsSeries)

    console.log(seriesMap)

    const searchJSON = allEsaPost.edges.map(postEdge => {
      const postNode = postEdge.node
      const { field, number, tags } = postNode
      const { title } = postNode.fields
      return {
        title, tags, number,
        path: `/posts/${number}`
      }
    })

    fs.writeFileSync('./static/search.json', JSON.stringify(searchJSON, null , 2))

    createPaginatedPages({
      edges: [...allEsaPost.edges, ...allFeedNotePost.edges, ...allExternalPostsYaml.edges].sort((a, b) => {
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

    allEsaPost.edges.forEach(postEdge => {
      const post = postEdge.node
      const number = post.number

      post.tags.forEach(tag => {
        tagMap.set(tag, tagMap.get(tag) ? tagMap.get(tag).concat(number) : [number])
      })

      const category = post.relative_category || 'blog'
      const numbersByCategory = categoryMap.get(category)
      categoryMap.set(category, numbersByCategory ? numbersByCategory.concat(number) : [number])

      console.log(Array.from(seriesMap.keys()), post.number, seriesMap.get(post.number), typeof post.number)
      createPage({
        path: `posts/${post.number}`,
        component: blogPost,
        context: {
          number: post.number,
          series: seriesMap.get(post.number),
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
}
