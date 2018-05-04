import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'

import Auther from '../components/Auther'

const Wrapper = styled.div`
  padding: 12px;
  margin-top: 12px;
`

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
  font-family: -apple-system, 'BlinkMacSystemFont', 'Helvetica Neue', 'Hiragino Sans',
    '游ゴシック Medium', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'メイリオ', 'Meiryo,sans-serif';

  @media (min-width: 600px) {
    font-size: 30px;
  }
`

const Content = styled.div`
  margin-top: 24px;
  line-height: 1.8;
  font-size: 15px;
  .hidden {
    display: none;
  }

  pre {
    display: block;
    padding: 10.5px;
    margin: 0 0 11px;
    font-size: 13px;
    line-height: 1.6;
    word-break: break-all;
    word-wrap: break-word;
    color: #333333;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px
}

pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    white-space: pre-wrap;
    background-color: transparent;
    border-radius: 0
}


  h1 {
    font-size: 200%;
    border-bottom: 3px solid rgba(0,0,0,0.1);
    padding-bottom: 10px;
    margin: 30px 0;
    margin-bottom: 10px
  }

  h1 .emoji {
      width: 36px;
      height: 36px
  }

  h1 a {
      color: #0a9b94
  }

  h1 a:hover {
      color: #08837d
  }

  h2 {
      font-size: 160%;
      margin: 30px 0;
      margin-bottom: 10px;
      font-weight: 900;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      padding-bottom: 10px
  }

  h2 .emoji {
      width: 28px;
      height: 28px
  }

  h2 a {
      color: #0a9b94
  }

  h2 a:hover {
      color: #08837d
  }

  h3 {
      margin: 30px 0;
      margin-bottom: 10px;
      font-size: 130%;
      font-weight: 900
  }

  h3 .emoji {
      width: 22px;
      height: 22px
  }

  h4 {
      font-size: 120%;
      font-weight: 900
  }

  .markdown>ul,.markdown>ol {
      margin: 20px 0
  }

  li {
      margin: 10px 0
  }

  li>p {
      margin: 0
  }

  dt {
      margin-top: 14px;
      margin-bottom: 4px
  }

  dd {
      padding: 0 14px;
      margin-bottom: 4px
  }

  p {
      margin: 20px 0
  }

  p img {
      margin-bottom: 0
  }

  blockquote {
      font-size: 100%;
      color: rgba(60,74,96,0.7);
      border-left: 5px solid rgba(0,0,0,0.1);
      margin-bottom: 30px;
      padding: 0 20px
  }

  blockquote p {
      margin: 10px 0 !important
  }

  code {
      color: #3c4a60;
      white-space: pre-wrap;
      border-radius: 4px;
      background-color: rgba(0,0,0,0.05)
  }

  pre {
      border: none
  }

  pre code {
      background: #f6f6f6;
      white-space: pre
  }

  .code-block .highlight {
      border-radius: 4px
  }

  .code-block__copy-button {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      background-color: white;
      border: 1px solid rgba(0,0,0,0.1);
      padding: 2px 7px;
      font-size: 10px;
      font-family: "Lato", Emoji, Arial, "ヒラギノ角ゴPro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", sans-serif
  }

  .code-block__copy-button i {
      color: rgba(60,74,96,0.3)
  }

  .code-block__copy-button:hover {
      background-color: #f6f6f6;
      border: 1px solid rgba(0,0,0,0.2)
  }

  .code-block__copy-label::after {
      content: 'Copy'
  }

  .code-block__copy-label.copied::after {
      content: 'Copied'
  }

  .code-block .highlight {
      position: relative
  }

  .code-block:hover .code-block__copy-button {
      display: block
  }

  table {
      border: 1px solid rgba(0,0,0,0.1);
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin: 20px 0;
      margin-bottom: 30px
  }

  table tr:nth-child(odd) td {
      background-color: #f9f9f9
  }

  table tr th,table tr td {
      padding: 8px;
      line-height: 1.6;
      vertical-align: top;
      border: 1px solid rgba(0,0,0,0.1)
  }

  strong {
      font-weight: 900
  }

  img {
      max-width: 100%;
      border: 1px solid #eee
  }

  .anchor {
      transition-duration: 0;
      display: none;
      margin-left: -20px;
      width: 20px;
      height: 20px;
      font-size: 20px;
      text-align: right;
      padding-top: 8px
  }

  .anchor i:hover {
      color: #08837d
  }

  .anchor .fa-pencil {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg)
  }

  h1,h2,h3,h4 {
      -webkit-font-smoothing: antialiased
  }

  h1:hover .anchor,h2:hover .anchor,h3:hover .anchor {
      display: inline-block
  }

  h2 .anchor {
      padding-top: 5px;
      font-size: 18px
  }

  h2 .anchor i {
      top: 4px
  }

  h3 .anchor {
      padding-top: 3px;
      font-size: 15px
  }

  h3 .anchor i {
      top: 4px
  }

  .emoji {
      border: none
  }

  iframe {
      max-width: 100%
  }

  .code-filename {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;
      top: 4px;
      display: inline-block;
      padding: 3px 10px;
      background-color: #f6f6f6;
      color: #888;
      font-size: 85%;
      line-height: 1.5;
      margin-bottom: -10px
  }

  .code-filename i {
      color: rgba(60,74,96,0.3);
      margin-right: 4px
  }

  @media (max-width: 900px) {
      video {
          width:100%
      }
  }

.highlight code table td {
    padding: 5px
}

.highlight code table pre {
    margin: 0
}

.highlight code .cm {
    color: #999988;
    font-style: italic
}

.highlight code .cp {
    color: #999999;
    font-weight: bold
}

.highlight code .c1 {
    color: #999988;
    font-style: italic
}

.highlight code .cs {
    color: #999999;
    font-weight: bold;
    font-style: italic
}

.highlight code .c,.highlight code .cd {
    color: #999988;
    font-style: italic
}

.highlight code .err {
    color: #a61717;
    background-color: #e3d2d2
}

.highlight code .gd {
    color: #000000;
    background-color: #ffdddd
}

.highlight code .ge {
    color: #000000;
    font-style: italic
}

.highlight code .gr {
    color: #aa0000
}

.highlight code .gh {
    color: #999999
}

.highlight code .gi {
    color: #000000;
    background-color: #ddffdd
}

.highlight code .go {
    color: #888888
}

.highlight code .gp {
    color: #555555
}

.highlight code .gs {
    font-weight: bold
}

.highlight code .gu {
    color: #aaaaaa
}

.highlight code .gt {
    color: #aa0000
}

.highlight code .kc {
    color: #000000;
    font-weight: bold
}

.highlight code .kd {
    color: #000000;
    font-weight: bold
}

.highlight code .kn {
    color: #000000;
    font-weight: bold
}

.highlight code .kp {
    color: #000000;
    font-weight: bold
}

.highlight code .kr {
    color: #000000;
    font-weight: bold
}

.highlight code .kt {
    color: #445588;
    font-weight: bold
}

.highlight code .k,.highlight code .kv {
    color: #000000;
    font-weight: bold
}

.highlight code .mf {
    color: #009999
}

.highlight code .mh {
    color: #009999
}

.highlight code .il {
    color: #009999
}

.highlight code .mi {
    color: #009999
}

.highlight code .mo {
    color: #009999
}

.highlight code .m,.highlight code .mb,.highlight code .mx {
    color: #009999
}

.highlight code .sb {
    color: #d14
}

.highlight code .sc {
    color: #d14
}

.highlight code .sd {
    color: #d14
}

.highlight code .s2 {
    color: #d14
}

.highlight code .se {
    color: #d14
}

.highlight code .sh {
    color: #d14
}

.highlight code .si {
    color: #d14
}

.highlight code .sx {
    color: #d14
}

.highlight code .sr {
    color: #009926
}

.highlight code .s1 {
    color: #d14
}

.highlight code .ss {
    color: #990073
}

.highlight code .s {
    color: #d14
}

.highlight code .na {
    color: #008080
}

.highlight code .bp {
    color: #999999
}

.highlight code .nb {
    color: #0086B3
}

.highlight code .nc {
    color: #445588;
    font-weight: bold
}

.highlight code .no {
    color: #008080
}

.highlight code .nd {
    color: #3c5d5d;
    font-weight: bold
}

.highlight code .ni {
    color: #800080
}

.highlight code .ne {
    color: #990000;
    font-weight: bold
}

.highlight code .nf {
    color: #990000;
    font-weight: bold
}

.highlight code .nl {
    color: #990000;
    font-weight: bold
}

.highlight code .nn {
    color: #555555
}

.highlight code .nt {
    color: #000080
}

.highlight code .vc {
    color: #008080
}

.highlight code .vg {
    color: #008080
}

.highlight code .vi {
    color: #008080
}

.highlight code .nv {
    color: #008080
}

.highlight code .ow {
    color: #000000;
    font-weight: bold
}

.highlight code .o {
    color: #000000;
    font-weight: bold
}

.highlight code .w {
    color: #bbbbbb
}

.highlight code {
    background-color: #f8f8f8
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
}
`

const Category = styled.div`
  font-family: lato, sans-serif;
  margin-bottom: 6px;
  opacity: 0.5;
  font-size: 14px;
`

const Tag = styled.div`
  background-color: white;
  font-weight: 600;
  opacity: .58;
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  font-size: 12px;
  margin: 4px 8px 4px 0;
  border-radius: 20px;
`

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.esaPost
    const { previous, next } = this.props.pathContext

    return (
      <Wrapper>
        <Helmet title={`${post.name}`} />
        <Category>{post.category}</Category>
        <Title style={{ margin: 0 }}>{post.name}</Title>
        {
          post.tags.map(tag => (
          <Tag>
            {tag}
          </Tag>
          ))
        }
        <Auther post={post} />
        <Content dangerouslySetInnerHTML={{ __html: post.body_html }} />
      </Wrapper>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($number: Int!) {
    esaPost(number: { eq: $number }) {
      number
      category
      name
      wip
      body_html
      tags
      updated_at
      updated_by {
        name
        screen_name
        icon
      }
    }
  }
`
