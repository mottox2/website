import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import 'ress'
import styled from 'styled-components'

const Template = (props: any) => {
  return (
    <Container>
      <Helmet>
        <meta
          name="google-site-verification"
          content="Ea1K1N5NXjUJEV6XxsrA2va96TOyyIyuSdQE5gLLNu4"
        />
      </Helmet>
      <Header>
        <h1
          style={{
            fontFamily: 'lato, sans-selif',
            fontSize: 20,
            fontWeight: 900,
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              color: 'inherit',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            mottox2 blog
          </Link>
        </h1>
      </Header>
      <div>{props.children}</div>
    </Container>
  )
}

const Container = styled.div`
  font-family: -apple-system-body, BlinkMacSystemFont, "Helvetica Neue",
    "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans Japanese",
    "游ゴシック  Medium", "Yu Gothic Medium", "メイリオ", meiryo, sans-serif;
  @media screen and (-webkit-min-device-pixel-ratio: 2),
    screen and (min-resolution: 2dppx) {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`

const Header = styled.header`
  text-align: center;
  background-image: linear-gradient(45deg, #4d9abf 0, #00a2c7 100%);
  color: white;
  font-weight: 500;
  padding: 18px 0;

  @media screen and (min-width: 600px) {
    padding: 22px 0;
  }
`

export default Template
