import { Link } from 'gatsby'
import React, { useState } from 'react'
import Logo from './logo.svg'
import Search from './Search'

import { css } from '@emotion/core'
import styled from '@emotion/styled'

const simpleHeaderBreakpoint = 600
const searchClassName = 'search'

export default (props: any) => {
  const [showLogo, updateShowLogo] = useState(true)

  return (
    <Base>
      <h1 css={title} style={showLogo ? {} : { display: 'none' }}>
        <Link style={{ display: 'flex' }} to={'/'}>
          <img src={Logo} alt="mottox2 blog" />
        </Link>
      </h1>

      <Search
        className={searchClassName}
        style={showLogo ? {} : { display: 'block' }}
        location={props.location}
        isMobileShow={!showLogo}
      />
      <button css={searchToggle} onClick={() => updateShowLogo(!showLogo)}>
        {showLogo ? (
          <svg
            css={toggleIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        ) : (
          <svg
            css={toggleIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        )}
      </button>
    </Base>
  )
}

const Base = styled.header`
  background-image: linear-gradient(45deg, #4d9abf 0, #00a2c7 100%);
  font-weight: 500;
  padding: 16px 12px;
  position: relative;
  display: flex;

  img {
    position: relative;
    top: 1px;
  }

  /* FIXME */
  @media screen and (max-width: ${simpleHeaderBreakpoint + 1}px) {
    .${searchClassName} {
      display: none;
      width: 100%;
      > input {
        width: 100%;
      }
    }
  }
`

const title = css`
  display: flex;
  margin-right: auto;
  margin-left: 4px;

  @media screen and (min-width: 980px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`

const toggleIcon = css`
  fill: white;
`

const searchToggle = css`
  min-height: 34px;
  margin: 0 -12px;
  padding: 0 12px;
  margin-left: 0px;
  @media screen and (min-width: ${simpleHeaderBreakpoint}px) {
    display: none;
  }
`
