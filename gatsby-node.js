const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");
const dayjs = require('dayjs')
const h2p = require('html2plaintext')
const cheerio = require('cheerio')

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

  let day, dateNode;
  switch(node.internal.type) {
    case 'EsaPost':
      createNodeField({ node, name: 'title', value: node.name.replace(DATE_REGEXP, '') })
      createNodeField({ node, name: 'excerpt', value: h2p(node.body_html)})

      const html = cheerio.load(node.body_html)
      const imageUrl = html('img[alt="thumbnail"]').attr('src')
      createNodeField({ node, name: 'thumbnail', value: imageUrl })

      // Extract the date part from node.name (ex. "[2018-10-08] I participated in Techbook Festival")
      const matched = node.name.match(DATE_REGEXP)
      day = matched ? dayjs(matched[1]) : dayjs(node.updated_at)
      dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
      createNode(dateNode)
      createParentChildLink({parent: node, child: dateNode})
      break
    case 'FeedNotePost':
      createNodeField({ node, name: 'title', value: node.title })
      createNodeField({ node, name: 'excerpt', value: node.contentSnippet })
      createNodeField({ node, name: 'category', value: 'note' })

      day = dayjs(node.pubDate)
      dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
      createNode(dateNode)
      createParentChildLink({parent: node, child: dateNode})
      break
    case 'ExternalPostsYaml':
      createNodeField({ node, name: 'title', value: node.title })
      createNodeField({ node, name: 'excerpt', value: node.excerpt })
      createNodeField({ node, name: 'category', value: node.category })

      day = dayjs(node.pubDate)
      dateNode = buildDateNode({ nodeId: node.id, day, createNodeId })
      createNode(dateNode)
      createParentChildLink({parent: node, child: dateNode})
      break
  }
}

exports.createPages = require('./gatsby/createPages')
