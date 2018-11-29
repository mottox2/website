import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostCell from '../components/PostCell'

const IndexPage = ({ pageContext, location }: any) => {
  const { group, index, first, last, additionalContext } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : `/page/${index - 1}`
  const nextUrl = `/page/${index + 1}`
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
        {(tag || category) && (
          <Title>
            {tag || category}
            <small>に関する記事</small>
          </Title>
        )}
        <Grid>
          {group.map(({ node }: any) => <PostCell key={node.number || node.link} post={node} />)}
        </Grid>
        <Pagination>
          {!first && <Link to={previousUrl}>{'< Previous'}</Link>}
          {!last && (
            <Link style={{ marginLeft: 'auto' }} to={nextUrl}>
              {'Next >'}
            </Link>
          )}
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

export default IndexPage
