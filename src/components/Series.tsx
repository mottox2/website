import React from 'react'
import { Link } from 'gatsby'

import styled from '@emotion/styled'

const activeStyle = {
  color: 'inherit',
  textDecoration: 'none',
  opacity: 0.8,
}

const Series: React.FC<{
  series: any
}> = ({ series }) => {
  return (
    <>
      <SeriesTitle
        style={{
          // TODO: いつか直す
          marginTop: -12,
        }}>
        <span className="gray">連載</span>
        {series.name}
      </SeriesTitle>
      {series.posts.map((post: any, index: number) => {
        const {
          number,
          fields: { title },
        } = post
        return (
          <SeriesItem key={number}>
            <span style={{ fontSize: 12, opacity: 0.8 }}>第{index + 1}回</span>
            <br />
            <Link to={`/posts/${number}`} activeStyle={activeStyle}>
              {title}
            </Link>
          </SeriesItem>
        )
      })}
    </>
  )
}

export default Series

const SeriesTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: baseline;
  color: #30627a;
  margin-bottom: 8px;

  .gray {
    color: rgba(0, 0, 0, 0.5);
    margin-right: 4px;
  }
`

const SeriesItem = styled.li`
  font-size: 15px;
  list-style: none;
  margin-bottom: 4px;
`
