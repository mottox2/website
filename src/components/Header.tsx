import { Link } from 'gatsby'
import React from 'react'
import Logo from './logo.svg'

import styled from '@emotion/styled'

const Header = () => {
  return (
    <Base>
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
          <img src={Logo} alt="mottox2 blog" />
        </Link>
      </h1>
    </Base>
  )
}

const Base = styled.header`
  text-align: center;
  background-image: linear-gradient(45deg, #4d9abf 0, #00a2c7 100%);
  color: white;
  font-weight: 500;
  padding: 18px 0;

  @media screen and (min-width: 600px) {
    padding: 22px 0;
  }

  img {
    position: relative;
    top: 1px;
  }
`

export default Header
