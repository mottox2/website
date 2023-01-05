import dayjs from 'dayjs'
import { Link } from 'gatsby'
import React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

const cell = css`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  @media (min-width: 624px) {
    padding-left: 0;
    padding-right: 0;
  }
  &:hover .title {
    color: #4d9abf;
  }
`

const Category = styled.div`
  line-height: 1.4;
  background-color: white;
  font-weight: 600;
  display: inline-block;
  font-size: 12px;
  background-color: rgba(2, 132, 199, 0.1);
  color: #0284c7;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  border-style: solid;
  border-image: initial;
  margin: 0px 8px 4px 0px;
  padding: 4px 6px;
  border-radius: 3px;
  border-width: 0px;
`

const CellContent = styled.div`
  margin-bottom: 8px;
`

const PostTitle = styled.h3`
  margin-bottom: 1px;
  font-size: 18px;
  line-height: 1.48;
  color: #1a202c;
`

const PostDescription = styled.p`
  color: #1a202c;
  opacity: 0.6;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
  overflow-y: hidden;
  max-height: ${14 * 1.6 * 3}px;
`

const CellFooter = styled.div`
  /* border-top: 1px solid #eee; */
  margin-top: auto;
`

const Day = styled.time`
  font-size: 12px;
  font-weight: 700;
  color: #666;
  &:after {
    content: ' ';
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
    content: '#';
  }
`

const PostLink = ({ node, children }: any) => {
  const link = css`
    box-shadow: none;
    color: inherit;
    display: block;
    text-decoration: none;
  `
  return node.link ? (
    <a href={node.link} css={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link css={link} to={`/posts/${node.number}`}>
      {children}
    </Link>
  )
}

interface Props {
  post: any
}

const PostCell: React.FC<Props> = ({ post }) => {
  const postNode: any = post
  const category = postNode.link
    ? postNode.fields.category
    : postNode.relative_category || 'blog'

  return (
    <PostLink node={postNode} key={postNode.number || postNode.link}>
      <div css={cell}>
        <CellContent>
          <Category>{category}</Category>
          <PostTitle className="title">{postNode.fields.title}</PostTitle>
          <PostDescription>
            {postNode.fields.excerpt.slice(0, 100)}
          </PostDescription>
        </CellContent>
        <CellFooter>
          <Day>
            {dayjs(postNode.childPublishedDate.published_on).format(
              'YYYY/MM/DD',
            )}
          </Day>
          {postNode.tags &&
            postNode.tags.map((tagName: string) => {
              return <Tag key={tagName}>{tagName}</Tag>
            })}
        </CellFooter>
      </div>
    </PostLink>
  )
}

export default PostCell
