import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Author from '../components/Author'
import { Category } from './PostTemplate'

const Cell = styled.div`
  height: 100%;
  padding: 20px 12px;
  border: 1px solid #eee;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  transform: translateY(0);
  transition: transform .15s ease-in, box-shadow .15s ease-in;
  display: flex;
  flex-direction: column;
  align-items: start;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
    transform: translateY(-4px);
  }
  @media (min-width: 600px) {
    padding: 20px;
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
  font-size: 18px;
  line-height: 1.48;
  font-weight: 600;
`

const PostDescription = styled.p`
  opacity: 0.58;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
  margin-bottom: 12px;
  overflow-y: hidden;
  max-height: ${14 * 1.6 * 3}px;
`

const BetterLink = (props) => {
  const { node }  = props
  return node.url ?
    <a
      href={node.url}
      style={{ textDecoration: 'none', boxShadow: 'none', color: 'inherit' }}
      target='_blank'
      rel="noopener noreferrer"
    >{props.children}</a> :
    <Link
      style={{ textDecoration: 'none', boxShadow: 'none', color: 'inherit' }}
      to={`/posts/${node.number}/`}
    >
      {props.children}
    </Link>
}

const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount, additionalContext } = pathContext
  const previousUrl = index - 1 == 1 ? '/' : '/page/' + (index - 1).toString()
  const nextUrl = '/page/' + (index + 1).toString()
  const { tag, category } = additionalContext

  return (
    <Container>
      <Helmet title={`mottox2 blog`}>
        <meta property="description" content={'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとかを中心に書いています。'} />
      </Helmet>
      { tag && <Title>{tag}<small>に関する記事</small></Title> }
      { category && <Title>{category}<small>に関する記事</small></Title> }
      <Grid>
      {group.map(({ node }, index) => {
        return (
        <BetterLink node={node} key={index}>
          <Cell key={node.number}>
            <Category type={node.type}>{node.category}</Category>
            <PostTitle>{node.name}</PostTitle>
            <PostDescription dangerouslySetInnerHTML={{ __html: node.body_md.slice(0, 100)}} />
            <Author style={{ marginTop: 'auto' }} post={node} />
          </Cell>
        </BetterLink>
        )
      })}
      </Grid>
      <Pagination>
        <div>
          <NavLink test={first} url={previousUrl} text="< Previous" />
        </div>
        <div style={{marginLeft: 'auto'}}>
          <NavLink test={last} url={nextUrl} text="Next >" />
        </div>
      </Pagination>
    </Container>
  )
}

const ScreenWidth = styled.div`
  @media (min-width: ${(320 + 24) * 2}px) {
    max-width: ${(320 + 24) * 2}px;
  }

  @media (min-width: ${(320 + 24) * 3}px) {
    max-width: ${(320 + 24) * 3}px;
  }
`

const Container = styled.div`
  margin-top: 12px;
  @media screen and (min-width: 600px) {
    margin-top: 24px;
  }
`

const Pagination = ScreenWidth.extend`
  display: flex;
  margin: 16px auto 32px;
  padding: 0 12px;
`

const Grid = ScreenWidth.extend`
  margin: 0 auto;
  max-width: 100%;

  display: flex;
  flex-wrap: wrap;
  column-count: 3;
  column-gap: 0;

  > * {
    display: inline-block;
    margin: 0 12px;
    vertical-align: top;
    width: 100%;
    margin-bottom: 12px;

    /* max-widthのあれ */
    @media (min-width: ${(320 + 24) * 2}px) {
      width: 320px;
      margin-bottom: 20px;
    }

    @media (min-width: ${(320 + 24) * 3}px) {
      width: 320px;
    }
  }
`

export default IndexPage
