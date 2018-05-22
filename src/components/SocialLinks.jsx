import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookShareCount,
  FacebookIcon,
  TwitterIcon
} from 'react-share'
import styled from 'styled-components'

class SocialLinks extends Component {
  render() {
    const { title, description, url } = this.props

    const iconSize = 42
    const filter = count => (count > 0 ? count : '')

    return (
      <div className={`social-links ${this.props.className}`} style={{ ...this.props.style }}>
        <TwitterShareButton url={url} title={title} name="Share">
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon round size={iconSize} />
          {/* <FacebookShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </FacebookShareCount> */}
        </FacebookShareButton>
        <div
          role="button"
          tabIndex="0"
          className="SocialMediaShareButton"
          onClick={() => {
            window.open(`http://b.hatena.ne.jp/entry/${url}`)
          }}
        >
          <div style={{ width: 42, height: 42, position: 'relative' }}>
            <svg
              viewBox="0 0 64 64"
              width="42"
              height="42"
              className="social-icon social-icon--facebook "
            >
              <g>
                <circle cx="32" cy="32" r="31" fill="#008fde" />
              </g>
            </svg>
            <HatenaLogo>B!</HatenaLogo>
          </div>
        </div>
      </div>
    )
  }
}

const HatenaLogo = styled.div`
  top: 50%;
  left: 50%;
  color: white;
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bold;
`

export default styled(SocialLinks)`
  display: flex;
  justify-content: center;
  > div {
    margin: 0 4px;
  }

  .share-count {
    text-align: center;
  }

  path {
    transform: scale(0.9);
    transform-origin: center;
  }
`
