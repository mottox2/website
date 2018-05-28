import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const UpdatedBy = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`

const Avatar = styled.img`
  border-radius: 50%;
  min-width: 30px;
  width: 30px;
  height: 30px;
  margin: 0;
  margin-right: 8px;
`

const UpdatedUser = styled.div`
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
`

const UpdatedAt = styled.div`
  opacity: 0.58;
  font-size: 10px;
  line-height: 1;
  margin-top: 4px;
`

const Author = props => {
  const node = props.post

  return (
    <UpdatedBy style={props.style}>
      <Avatar alt={node.updated_by.screen_name} src={node.updated_by.icon} width="30" height="30" />
      <div>
        <UpdatedUser>{node.updated_by.screen_name}</UpdatedUser>
        <UpdatedAt>{dayjs(node.published_on).format('YYYY/MM/DD')}</UpdatedAt>
      </div>
    </UpdatedBy>
  )
}

export default Author
