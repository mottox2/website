import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import styled from '@emotion/styled'

import Author from '../components/Author'
import AuthorProfile from '../components/AuthorProfile'
import Content from '../components/Content'
import Layout from '../components/Layout'
import PostCell from '../components/PostCell'
import Sidebar from '../components/Sidebar'
import SocialLinks from '../components/SocialLinks'
import Tag from '../components/Tag'
import { Container, MainColumn } from './posts'

export const Wrapper = styled.div`
  padding: 12px;
  max-width: 42rem;
  margin: 24px auto 48px;
`

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.4;
  font-weight: 700;
  color: #222;
  font-family: -apple-system, "BlinkMacSystemFont", "Helvetica Neue",
    "Hiragino Sans", "游ゴシック Medium", "YuGothic",
    "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo,sans-serif";

  @media (min-width: 600px) {
    font-size: 30px;
  }
`

const Category = styled(Tag)<{ type: string }>`
  background-image: ${props =>
    props.type === 'note'
      ? 'linear-gradient(45deg,#41C9B4 0,#41C9B4 100%)'
      : 'linear-gradient(45deg,#4d9abf 0,#00a2c7 100%)'};
  color: white;
  margin-bottom: 4px;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  &:hover {
    border-color: inherit;
    color: white;
  }
  &:before {
    content: "";
  }
`

const SocialLinkWrapper = styled.div`
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;
  z-index: 10;
`

const PostTemplate = (props: any) => {
  const post = props.data.esaPost
  const { latestPosts } = props.pageContext
  const title = post.fields.title.replace(/&#35;/g, '#')
  const description = post.fields.excerpt.slice(0, 120)
  const category = post.relative_category || 'blog'
  const image =
    'https://img.esa.io/uploads/production/attachments/6967/2018/05/19/4651/139850ac-6690-4bee-bdf3-6f9faf6ac10b.png'
  const url = `https://mottox2.com/posts/${post.number}`

  return (
    <Layout location={props.location}>
      <Helmet title={`${title} - mottox2 blog`}>
        <meta name="description" content={description} />

        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {/* <meta property="fb:app_id" content={config.siteFBAppID ? config.siteFBAppID : ''} /> */}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={'@mottox2'} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="canonical" href={url} />
      </Helmet>

      <Container>
        <MainColumn style={{ marginTop: 32 }}>
          <Padding>
            <Category to={`/categories/${category}`}>{category}</Category>
            <Title dangerouslySetInnerHTML={{ __html: title }} />
            {post.tags.map((tag: any) => (
              <Tag
                to={`/tags/${tag}`}
                key={tag}
                style={{ marginTop: 4, marginBottom: 8 }}
              >
                {tag}
              </Tag>
            ))}
            <Author post={post} />
            <Content dangerouslySetInnerHTML={{ __html: post.body_html }} />
            <AuthorProfile />
            <SocialLinkWrapper>
              <SocialLinks title={title} url={url} />
            </SocialLinkWrapper>
          </Padding>
          {latestPosts.map((postEdge: any) => {
            const postNode = postEdge.node
            return <PostCell key={postNode.number} post={postNode} />
          })}
        </MainColumn>
        <Sidebar />
      </Container>
    </Layout>
  )
}

export default PostTemplate

const Padding = styled.div`
  padding: 0 12px;
  @media (min-width: 980px) {
    padding: 0;
  }
`

export const pageQuery = graphql`
  query BlogPostBySlug($number: Int!) {
    esaPost(number: { eq: $number }) {
      number
      relative_category
      fields {
        title
        excerpt
      }
      wip
      body_md
      body_html
      tags
      updated_at
      childPublishedDate {
        published_on
      }
      updated_by {
        name
        screen_name
        icon
      }
    }
  }
`
