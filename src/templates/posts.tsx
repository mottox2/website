import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostCell from '../components/PostCell'
import Sidebar from '../components/Sidebar'

const IndexPage = ({ pageContext, location }: any) => {
  const { group, index, first, last, additionalContext } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : `/page/${index - 1}`
  const nextUrl = `/page/${index + 1}`
  const { tag, category } = additionalContext

  return (
    <Layout location={location}>
      <Helmet title={`mottox2 blog`}>
        <meta
          name="description"
          content={
            'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとかを中心に書いています。'
          }
        />
      </Helmet>
      <Container>
        <MainColumn>
          {(tag || category) && (
            <Title>
              {tag || category}
              <small>に関する記事</small>
            </Title>
          )}
          {/* <Grid> */}
          {group.map(({ node }: any) => (
            <PostCell key={node.number || node.link} post={node} />
          ))}
          {/* </Grid> */}
          <Pagination>
            {!first && <Link to={previousUrl}>{'< Previous'}</Link>}
            {!last && (
              <Link style={{ marginLeft: 'auto' }} to={nextUrl}>
                {'Next >'}
              </Link>
            )}
          </Pagination>
        </MainColumn>
        <Sidebar />
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

export const Container = styled.div`
  /* max-width: 980px; */
  /* margin: 0 auto; */
  display: flex;
`

export const MainColumn = styled.div`
  max-width: 600px;
  margin: 20px auto;
`

const Pagination = ScreenWidth.extend`
  display: flex;
  margin: 16px auto 32px;
  padding: 0 12px;
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
