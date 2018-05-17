import React, { Component } from 'react'
import Helmet from 'react-helmet'
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

const Title = styled.h1`
  margin: 24px 0;
  font-size: 22px;
  text-align: center;
  small {
    font-size: 13px;
    font-weight: 400;
    margin-left: 4px;
    opacity: 0.6;
  }
`

const PostTitle = styled.h3`
  margin-bottom: 4px;
  font-size: 20px;
  font-weight: 600;
`

const PostDescription = styled.p`
  opacity: 0.6;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
`

const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount, additionalContext } = pathContext
  const previousUrl = index - 1 == 1 ? '/' : '/page/' + (index - 1).toString()
  const nextUrl = '/posts/page/' + (index + 1).toString()
  const { tag, category } = additionalContext

  return (
    <div style={{marginTop: 24}}>
      <Helmet title={`mottox2 blog`} />
      { tag && <Title>{tag}<small>に関する記事</small></Title> }
      { category && <Title>{category}<small>に関する記事</small></Title> }
      {group.map(({ node }) => {
        return (
          <Cell key={node.number}>
            <Category>{node.category}</Category>
            <Link style={{ boxShadow: 'none', color: 'inherit' }} to={`/posts/${node.number}`}>
              <PostTitle>{node.name}</PostTitle>
              <PostDescription dangerouslySetInnerHTML={{ __html: node.body_md.slice(0, 120)}} />
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
