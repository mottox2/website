import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

const AuthorProfile = props => {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src='https://img.esa.io/uploads/production/members/26458/icon/thumb_m_19f30e93b0112f046e71c4c5a2569034.jpg' width='48' height='48'/>
      </ImgWrapper>
      <div>
        <Name>@mottox2</Name>
        <Position>フリーランスWebデベロッパー</Position>
        <Description>都内でフリーランスエンジニア・デザイナーとしてWebサービスやスマホアプリを作っています。Ruby on Railsでの新規事業の爆速立ち上げや、使いやすいSPAの開発が得意です。</Description>
        <Contact>
          <Link to='/contact'>
            お問い合わせはこちら
          </Link>
        </Contact>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 32px;
  border-top: 1px solid #ddd;
  padding: 32px 0;
  display: flex;
`

const ImgWrapper = styled.div`
  width: 48px;
  min-width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  margin-right: 12px;
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
`

const Position = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 6px;
`

const Description = styled.p`
  margin-top: 4px;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
`

const Contact = styled.p`
  margin-top: 4px;
  font-size: 12px;
  line-height: 20px;
`

export default AuthorProfile
