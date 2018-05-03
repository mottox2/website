import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (false && location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginTop: 0,
            marginBottom: 0,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            fontSize: 22,
            fontFamily: 'lato, sans-selif',
            fontWeight: 900
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit'
            }}
            to={'/'}
          >
            Gatsby Starter Esa
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: 0,
            padding: `${rhythm(0.8)} 12px`,
            fontSize: 22,
            fontFamily: 'lato, sans-selif',
            fontWeight: 900
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit'
            }}
            to={'/'}
          >
            Gatsby Starter Esa
          </Link>
        </h3>
      )
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
`

const Header = styled.header`
  border-bottom: 1px solid #eee;
  text-align: center;
`

export default Template
