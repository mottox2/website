import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Auther from '../components/Auther'

import { rhythm } from '../utils/typography'

const Cell = styled.div`
  padding: 24px;
  border: 1px solid #eee;
  margin-bottom: 24px;
  background-color: white;
`

const Category = styled.div`
  font-family: lato, sans-serif;
  margin-bottom: 4px;
  opacity: 0.5;
  font-size: 14px;
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const esaPosts = get(this, 'props.data.allEsaPost.edges')

    return (
      <div style={{ paddingTop: 24 }}>
        <Helmet title={siteTitle} />
        {esaPosts.map(({ node }) => {
          return (
            <Cell key={node.number}>
              <Category>{node.category}</Category>
              <Link style={{ boxShadow: 'none', color: 'inherit' }} to={`/posts/${node.number}`}>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: rhythm(1 / 4)
                  }}
                >
                  {node.name}
                </h3>
                <p
                  style={{ margin: 0, opacity: 0.6, fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: node.body_md.slice(0, 60) }}
                />
              </Link>
              <Auther post={node} />
            </Cell>
          )
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
