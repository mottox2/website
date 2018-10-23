import dayjs from 'dayjs'
import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { Category } from './post'

const Cell = styled.div`
  height: 100%;
  border: 1px solid #eee;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transform: translateY(0);
  transition: transform 0.15s ease-in, box-shadow 0.15s ease-in;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
    transform: translateY(-4px);
  }
`

const CellContent = styled.div`
  padding: 20px 12px 12px;
  @media (min-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const NavLink = (props: any) => {
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
  overflow-y: hidden;
  max-height: ${14 * 1.6 * 3}px;
`

const CellFooter = styled.div`
  border-top: 1px solid #eee;
  padding: 9px 20px 12px;
  margin-top: auto;
`

const Day = styled.time`
  font-size: 12px;
  font-weight: 600;
  color: #888;
  &:after {
    content: " ";
    width: 1px;
    height: 100%;
    background-color: #ddd;
    display: inline-block;
  }
`

const Tag = styled.span`
  font-size: 12px;
  margin-left: 4px;
  &:before {
    content: "#";
  }
`

const BetterLink = (props: any) => {
  const { node } = props
  return node.link ? (
    <a
      href={node.link}
      style={{ textDecoration: 'none', boxShadow: 'none', color: 'inherit' }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ) : (
    <Link
      style={{ textDecoration: 'none', boxShadow: 'none', color: 'inherit' }}
      to={`/posts/${node.number}/`}
    >
      {props.children}
    </Link>
  )
}

const IndexPage = ({ pageContext, location }: any) => {
  const { group, index, first, last, additionalContext } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : '/page/' + (index - 1).toString()
  const nextUrl = '/page/' + (index + 1).toString()
  const { tag, category } = additionalContext

  return (
    <Layout location={location}>
      <Container>
        <Helmet title={`mottox2 blog`}>
          <meta
            name="description"
            content={
              'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとかを中心に書いています。'
            }
          />
        </Helmet>
        {tag && (
          <Title>
            {tag}
            <small>に関する記事</small>
          </Title>
        )}
        {category && (
          <Title>
            {category}
            <small>に関する記事</small>
          </Title>
        )}
        <Grid>
          {group.map(({ node }: any) => {
            return (
              <BetterLink node={node} key={node.number || node.link}>
                <Cell>
                  <CellContent>
                    <Category type={node.link ? 'note' : 'blog'}>
                      {node.relative_category || 'blog'}
                    </Category>
                    <PostTitle
                      dangerouslySetInnerHTML={{ __html: node.fields.title }}
                    />
                    <PostDescription>
                      {node.body_md.slice(0, 100)}
                    </PostDescription>
                  </CellContent>
                  <CellFooter>
                    <Day>
                      {dayjs(node.childPublishedDate.published_on).format(
                        'YYYY/MM/DD',
                      )}
                    </Day>
                    {node.tags &&
                      node.tags.map((tagName: string) => {
                        return <Tag key={tagName}>{tagName}</Tag>
                      })}
                  </CellFooter>
                </Cell>
              </BetterLink>
            )
          })}
        </Grid>
        <Pagination>
          <div>
            <NavLink test={first} url={previousUrl} text="< Previous" />
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <NavLink test={last} url={nextUrl} text="Next >" />
          </div>
        </Pagination>
      </Container>
    </Layout>
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
