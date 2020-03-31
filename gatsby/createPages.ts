import fs from 'fs'
import path from 'path'
import { GatsbyNode } from 'gatsby'
const createPaginatedPages = require('gatsby-paginate')

const perPage = 12

interface NodeEdge<T> {
  edges: {
    node: T
  }[]
}

type EsaPostNode = {
  number: number
  relative_category: string
  fields: {
    title: string
    excerpt: string
  }
  name: string
  tags: string[]
  childPublishedDate: {
    published_on: string
    published_on_unix: string
  }
}

type GraphQLResult = {
  allEsaPost: NodeEdge<EsaPostNode>
  allFeedNotePost: NodeEdge<any>
  allExternalPostsYaml: NodeEdge<any>
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const blogList = path.resolve('./src/templates/posts.tsx')
  const blogPost = path.resolve('./src/templates/post.tsx')
  return graphql<GraphQLResult>(`
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
    }
  `).then((result) => {
    if (result.errors) {
      console.error(result.errors)
    }
    const { allEsaPost, allFeedNotePost, allExternalPostsYaml } = result.data!

    const searchJSON = allEsaPost.edges.map(
      (postEdge: { node: EsaPostNode }) => {
        const postNode = postEdge.node
        const { number, tags } = postNode
        const { title } = postNode.fields
        return {
          title,
          tags,
          number,
          path: `/posts/${number}`,
        }
      },
    )

    fs.writeFileSync(
      './static/search.json',
      JSON.stringify(searchJSON, null, 2),
    )

    createPaginatedPages({
      edges: [
        ...allEsaPost.edges,
        ...allFeedNotePost.edges,
        ...allExternalPostsYaml.edges,
      ].sort((a, b) => {
        return (
          b.node.childPublishedDate.published_on_unix -
          a.node.childPublishedDate.published_on_unix
        )
      }),
      createPage,
      pageTemplate: blogList,
      pageLength: perPage,
      pathPrefix: '',
      buildPath: (index: number, pathPrefix: string) =>
        index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
    })

    const categoryMap = new Map()
    const tagMap = new Map()
    const postEntities: Record<
      number,
      {
        node: EsaPostNode
      }
    > = {}

    allEsaPost.edges.forEach((postEdge: { node: EsaPostNode }) => {
      const post = postEdge.node
      const number = post.number

      post.tags.forEach((tag: string) => {
        tagMap.set(
          tag,
          tagMap.get(tag) ? tagMap.get(tag).concat(number) : [number],
        )
      })

      const category = post.relative_category || 'blog'
      const numbersByCategory = categoryMap.get(category)
      categoryMap.set(
        category,
        numbersByCategory ? numbersByCategory.concat(number) : [number],
      )

      createPage({
        path: `posts/${post.number}`,
        component: blogPost,
        context: {
          number: post.number,
        },
      })

      postEntities[post.number] = postEdge
    })

    Array.from(categoryMap.keys()).map((category: string) => {
      const postNumbers = categoryMap.get(category)
      createPaginatedPages({
        edges: postNumbers.map((number: number) => postEntities[number]),
        createPage,
        pageTemplate: blogList,
        pageLength: perPage,
        pathPrefix: `categories/${category}`,
        buildPath: (index: number, pathPrefix: string) =>
          index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
        context: { category },
      })
    })

    Array.from(tagMap.keys()).map((tag: string) => {
      const postNumbers = tagMap.get(tag)
      createPaginatedPages({
        edges: postNumbers.map((number: number) => postEntities[number]),
        createPage,
        pageTemplate: blogList,
        pageLength: perPage,
        pathPrefix: `tags/${tag}`,
        buildPath: (index: number, pathPrefix: string) =>
          index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
        context: { tag },
      })
    })
  })
}
