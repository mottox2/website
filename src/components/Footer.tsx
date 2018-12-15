import React from 'react'
import styled from 'styled-components'

export default () => {
  return <Footer>
    <Container>
      <a href="/contact">CONTACT</a>
      <Copyright>
        Copyright &copy; 2018 @mottox2 All Rights Reserved.
      </Copyright>
    </Container>
  </Footer>
}

const Footer = styled.footer`
  background-color: #4AA1C4;
  color: white;
  padding: 32px 0;
  text-align: center;
`

const Container = styled.div`
  max-width: 980px;
  margin: auto;
  @media screen and (min-width: 600px) {
    display: flex;
  }
  a {
    color: white;
    font-size: 14px;
    text-decoration: none;
    margin-bottom: 10px;
    display: block;
    @media screen and (min-width: 600px) {
      margin: 0;
      display: inline-block;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`

const Copyright = styled.div`
  margin-left: auto;
  font-size: 14px;
`