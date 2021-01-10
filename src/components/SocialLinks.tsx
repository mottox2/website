import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

import styled from '@emotion/styled'

const SocialLinks = (props: any) => {
  const { title, url } = props

  const iconSize = 42

  return (
    <div className={props.className}>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round={true} size={iconSize} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon round={true} size={iconSize} />
      </FacebookShareButton>
      <HatenaShareButton url={url}>
        <HatenaIcon round={true} size={iconSize} />
      </HatenaShareButton>
    </div>
  )
}

export default styled(SocialLinks)`
  display: flex;
  justify-content: center;

  > button {
    margin: 0 2px;
  }

  .share-count {
    text-align: center;
  }

  path {
    transform: scale(0.9);
    transform-origin: center;
  }
`
