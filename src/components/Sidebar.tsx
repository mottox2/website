import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Profile from './Profile'

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

const Tag = styled(Link)`
  display: inline-block;
  background-color: #eee;
  color: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  margin-right: 8px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: #ddd;
  }
  &:before {
    content: "#";
  }
`

const Base = styled.aside`
  min-width: 320px;
  padding: 32px 12px;
  background-color: #f8f8f8;

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
