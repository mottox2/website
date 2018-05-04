import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Auther from '../components/Auther'

const Cell = styled.div`
  padding: 20px 12px;
  border: 1px solid #eee;
  margin-bottom: 24px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  a {
    text-decoration: none;
  }
  @media (min-width: 600px) {
    padding: 24px;
  }
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
                    marginBottom: 4,
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {node.name}
                </h3>
                <p
                  style={{ margin: 0, opacity: 0.6, fontSize: 14, lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: node.body_md.slice(0, 120) }}
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
