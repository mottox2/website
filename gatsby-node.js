const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require("gatsby-paginate");
const dayjs = require('dayjs')
const h2p = require('html2plaintext')
const cheerio = require('cheerio')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const Parser = require('rss-parser')
const parser = new Parser()

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const { createNode, createParentChildLink, createNodeField }  = actions
  // const defaultFileNode = await createRemoteFileNode({
  //   url: 'https://img.esa.io/uploads/production/teams/6967/icon/thumb_ms_fec180ecca810585b0ad19eb60c24fcc.jpg',
  //   store, cache, createNode, createNodeId,
  // })
  store.getState().nodes.forEach(async node => {
    if (node.internal && node.internal.type == "EsaPost") {
      if ( node.fields && node.fields.thumbnail) {
        const fileNode = await createRemoteFileNode({
          url: node.fields.thumbnail,
          store, cache, createNode, createNodeId,
        })
        createNodeField({ node, name: 'file', value: fileNode })
        // createParentChildLink({
        //   parent: node, child: fileNode
        // })
      } else {
        // createParentChildLink({
        //   parent: node, child: defaultFileNode
        // })
      }
    }
  })

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

    const html = cheerio.load(node.body_html)
    const imageUrl = html('img[alt="thumbnail"]').attr('src')
    createNodeField({ node, name: 'thumbnail', value: imageUrl })

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

exports.createPages = require('./gatsby/createPages')
