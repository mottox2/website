import dayjs from 'dayjs'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { Category } from '../templates/post'

const Cell = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  padding: 20px 12px;
  @media (min-width: 624px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const CellContent = styled.div`
  margin-bottom: 8px;
`

const PostTitle = styled.h3`
  margin-bottom: 4px;
  font-size: 18px;
  line-height: 1.48;
  color: #222;
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
  /* border-top: 1px solid #eee; */
  margin-top: auto;
`

const Day = styled.time`
  font-size: 12px;
  font-weight: 700;
  color: #666;
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

const PostLink = ({ node, children, style }: any) => {
  const styles = {
    boxShadow: 'none',
    color: 'inherit',
    display: 'block',
    textDecoration: 'none',
    ...style,
  }
  return node.link ? (
    <a
      href={node.link}
      style={styles}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link style={styles} to={`/posts/${node.number}`}>
      {children}
    </Link>
  )
}

interface Props {
  post: any
  style?: any
}

const PostCell: React.SFC<Props> = ({ post, style = {} }) => {
  const postNode: any = post

  return (
    <PostLink
      style={style}
      node={postNode}
      key={postNode.number || postNode.link}
    >
      <Cell>
        <CellContent>
          <Category type={postNode.link ? 'note' : 'blog'}>
            {postNode.relative_category || 'blog'}
          </Category>
          <PostTitle
            dangerouslySetInnerHTML={{ __html: postNode.fields.title }}
          />
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
      </Cell>
    </PostLink>
  )
}

export default PostCell
