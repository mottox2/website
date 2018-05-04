import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Auther from '../components/Auther'
import { Category } from './PostTemplate'

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
    padding: 20px 24px 24px;
  }
`

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount } = pathContext
  const previousUrl = index - 1 == 1 ? '/' : '/page/' + (index - 1).toString()
  const nextUrl = '/posts/page/' + (index + 1).toString()

  return (
    <div style={{marginTop: 24}}>
      {group.map(({ node }) => {
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
      <div style={{display: 'flex'}}>
        <div>
          <NavLink test={first} url={previousUrl} text="< Previous" />
        </div>
        <div style={{marginLeft: 'auto'}}>
          <NavLink test={last} url={nextUrl} text="Next >" />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
