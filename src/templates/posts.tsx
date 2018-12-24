import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import styled from '@emotion/styled'

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
          {group.map(({ node }: any) => (
            <PostCell key={node.number || node.link} post={node} />
          ))}
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

export const Container = styled.div`
  /* max-width: 980px; */
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;

  @media (min-width: 980px) {
    flex-direction: row;
  }
`

export const MainColumn = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
`

const Pagination = styled.div`
  display: flex;
  width: 100%;
  margin: 24px 0;
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
