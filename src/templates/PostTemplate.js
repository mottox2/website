import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'

import Auther from '../components/Auther'
import Content from '../components/Content'
import SocialLinks from '../components/SocialLinks'

const Wrapper = styled.div`
  padding: 12px;
  margin-top: 24px;
`

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
  font-family: -apple-system, 'BlinkMacSystemFont', 'Helvetica Neue', 'Hiragino Sans',
    '游ゴシック Medium', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'メイリオ', 'Meiryo,sans-serif';

  @media (min-width: 600px) {
    font-size: 30px;
  }
`

const Tag = styled.div`
  background-color: white;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.58);
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  font-size: 12px;
  margin: 4px 8px 4px 0;
  border-radius: 20px;
`

export const Category = Tag.extend`
  background-image: linear-gradient(45deg,#4d9abf 0,#00c7b7 100%);
  color: white;
  border: 1px solid transparent;
  border-color: #00c7b7;
  margin-top: 0;
`

const SocialLinkWrapper = styled.div`
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;
`

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.esaPost
    const { previous, next } = this.props.pathContext
    const title = post.name
    const description = post.body_md.slice(0, 120)
    const image = 'https://img.esa.io/uploads/production/attachments/6967/2018/05/19/4651/139850ac-6690-4bee-bdf3-6f9faf6ac10b.png'
    const url = `https://mottox2.com/posts/${post.number}`

    return (
      <Wrapper>
        <Helmet title={`${post.name} - mottox2 blog`}>
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
        </Helmet>
        <Link to={`/categories/${post.category}`}>
          <Category>{post.category}</Category>
        </Link>
        <Title>{post.name}</Title>
        { post.tags.map(tag => (
          <Link to={`/tags/${tag}`} key={tag}>
            <Tag>{tag}</Tag>
          </Link>
         )) }
        <Auther post={post} />
        <Content dangerouslySetInnerHTML={{ __html: post.body_html }} />
        <SocialLinkWrapper>
        <SocialLinks title={post.name} description={'description'} path={`/posts/${post.number}`}/>
        </SocialLinkWrapper>
      </Wrapper>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($number: Int!) {
    esaPost(number: { eq: $number }) {
      number
      category
      name
      wip
      body_md
      body_html
      tags
      updated_at
      updated_by {
        name
        screen_name
        icon
      }
    }
  }
`
