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
    const { title, description, path } = this.props
    const url = 'https://mottox2.com' + path

    const iconSize = 42
    const filter = count => (count > 0 ? count : '')

    return (
      <div className={`social-links ${this.props.className}`} style={{ ...this.props.style }}>
        <TwitterShareButton url={url} title={title} name="Share">
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} description={title}>
          <FacebookIcon round size={iconSize} />
          {/* <FacebookShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </FacebookShareCount> */}
        </FacebookShareButton>
      </div>
    )
  }
}

export default styled(SocialLinks)`
  display: flex;
  justify-content: center;
  > div {
    margin: 0 4px;
  }

  .share-count {
    text-align: center;
  }
`
