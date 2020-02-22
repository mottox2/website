import { Link } from 'gatsby'
import React from 'react'

import styled from '@emotion/styled'

import Profile from './Profile'
import Tag from './Tag'

const Sidebar = () => {
  return (
    <Base>
      <SideSectionTitle>PROFILE</SideSectionTitle>
      <SideSection>
        <Profile />
      </SideSection>
      <SideSectionTitle>PICKUP TAGS</SideSectionTitle>
      <SideSection>
        <Tag to="/tags/gatsby">gatsby</Tag>
        <Tag to="/tags/netlify">netlify</Tag>
      </SideSection>
    </Base>
  )
}

const Base = styled.aside`
  min-width: 320px;
  padding: 32px 12px;
  background-color: #f7f8fa;

  @media (min-width: 980px) {
    width: 320px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 20px;
    border-left: 1px #eee solid;
  }
`

const SideSection = styled.div`
  margin: 12px 0 24px;
`

const SideSectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 1px;
  color: #30627a;
`

export default Sidebar
