import React from 'react'
import Link from 'gatsby-link'
import 'ress'
import styled from 'styled-components'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    const headerStyles = {
      marginTop: 0,
      marginBottom: 0,
      fontSize: 20,
      fontFamily: 'lato, sans-selif',
      fontWeight: 900,
    }

    const link = <Link
      style={{
        boxShadow: 'none',
        textDecoration: 'none',
        color: 'inherit'
      }}
      to={'/'}
    >
      mottox2 blog
    </Link>

    if (location.pathname === rootPath) {
      header = (<h1 style={headerStyles}> {link} </h1>)
    } else {
      header = (<h3 style={headerStyles}> {link} </h3>)
    }
    return (
      <div>
        <Header>
          <Container>{header}</Container>
        </Header>
        <Container>{children()}</Container>
      </div>
    )
  }
}

const Container = styled.div`
  max-width: 42rem;
  margin: auto;
  font-family: -apple-system-body, BlinkMacSystemFont, "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans Japanese", "游ゴシック  Medium", "Yu Gothic Medium", "メイリオ", meiryo, sans-serif;
  @media screen and (-webkit-min-device-pixel-ratio: 2),screen and (min-resolution:2dppx) {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`

const Header = styled.header`
  border-bottom: 1px solid #eee;
  text-align: center;
  background-image: linear-gradient(45deg,#4d9abf 0,#00c7b7 100%);
  color: white;
  font-weight: 500;
  padding: 24px 0;
`

export default Template
