import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'

import Auther from '../components/Auther'
import Content from '../components/Content'

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

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.esaPost
    const { previous, next } = this.props.pathContext

    return (
      <Wrapper>
        <Helmet title={`${post.name}`} />
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
