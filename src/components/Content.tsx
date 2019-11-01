import styled from '@emotion/styled'

export default styled.div`
  margin-top: 24px;
  line-height: 1.8;
  font-size: 15px;
  word-break: break-all;
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
    background-color: #3e4149;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    white-space: pre-wrap;
    background-color: transparent;
    border-radius: 0;
  }

  h1 {
    font-size: 200%;
    border-bottom: 3px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
    margin: 30px 0;
    margin-bottom: 10px;
  }

  h1 .emoji {
    width: 36px;
    height: 36px;
  }

  h1 a {
    color: #0a9b94;
  }

  h1 a:hover {
    color: #08837d;
  }

  h2 {
    font-size: 160%;
    margin: 30px 0 16px;
    font-weight: 900;
    border-bottom: 3px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 4px;
    position: relative;
    &:before {
      position: absolute;
      content: " ";
      width: 100px;
      bottom: -3px;
      height: 3px;
      background-color: #4d9abf;
    }
  }

  h2 .emoji {
    width: 28px;
    height: 28px;
  }

  h2 a {
    color: #0a9b94;
  }

  h2 a:hover {
    color: #08837d;
  }

  h3 {
    margin: 24px 0;
    margin-bottom: 10px;
    font-size: 130%;
    font-weight: 900;
  }

  h3 .emoji {
    width: 22px;
    height: 22px;
  }

  h4 {
    font-size: 120%;
    font-weight: 900;
  }

  .markdown > ul,
  .markdown > ol {
    margin: 16px 0;
  }

  ul,
  ol {
    padding-left: 40px;
  }

  li {
    margin: 4px 0;
  }

  li > p {
    margin: 0;
  }

  dt {
    margin-top: 14px;
    margin-bottom: 4px;
  }

  dd {
    padding: 0 14px;
    margin-bottom: 4px;
  }

  p {
    margin: 16px 0;
  }

  p img {
    margin-bottom: 0;
  }

  blockquote {
    font-size: 100%;
    color: rgba(60, 74, 96, 0.7);
    border-left: 5px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    padding: 0 20px;
  }

  blockquote p {
    margin: 10px 0 !important;
  }

  code {
    color: #3c4a60;
    white-space: pre-wrap;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }

  pre {
    border: none;
  }

  pre code {
    background: #f6f6f6;
  }

  .code-block .highlight {
    border-radius: 4px;
  }

  .code-block__copy-button {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2px 7px;
    font-size: 10px;
    font-family: "Lato", Emoji, Arial, "ヒラギノ角ゴPro W3",
      "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, "ＭＳ Ｐゴシック",
      sans-serif;
  }

  .code-block__copy-button i {
    color: rgba(60, 74, 96, 0.3);
  }

  .code-block__copy-button:hover {
    background-color: #f6f6f6;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .code-block__copy-label::after {
    content: "Copy";
  }

  .code-block__copy-label.copied::after {
    content: "Copied";
  }

  .code-block .highlight {
    position: relative;
  }

  .code-block:hover .code-block__copy-button {
    display: block;
  }

  table {
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 20px 0;
    margin-bottom: 30px;
  }

  table tr:nth-child(odd) td {
    background-color: #f9f9f9;
  }

  table tr th,
  table tr td {
    padding: 8px;
    line-height: 1.6;
    vertical-align: top;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  strong {
    font-weight: 700;
  }

  img {
    max-width: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .anchor {
    transition-duration: 0;
    display: none;
    margin-left: -20px;
    width: 20px;
    height: 20px;
    font-size: 20px;
    text-align: right;
    padding-top: 8px;
  }

  .anchor i:hover {
    color: #08837d;
  }

  .anchor .fa-pencil {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  h1,
  h2,
  h3,
  h4 {
    -webkit-font-smoothing: antialiased;
  }

  h1:hover .anchor,
  h2:hover .anchor,
  h3:hover .anchor {
    display: inline-block;
  }

  h2 .anchor {
    padding-top: 5px;
    font-size: 18px;
  }

  h2 .anchor i {
    top: 4px;
  }

  h3 .anchor {
    padding-top: 3px;
    font-size: 15px;
  }

  h3 .anchor i {
    top: 4px;
  }

  .emoji {
    border: none;
  }

  iframe {
    max-width: 100%;
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
    background-color: #3e4149;
    color: #fff;
    font-size: 85%;
    line-height: 1.5;
    margin-bottom: -10px;
  }

  .code-filename i {
    color: rgba(60, 74, 96, 0.3);
    /* margin-right: 4px; */
  }

  @media (max-width: 900px) {
    video {
      width: 100%;
    }
  }

  .highlight code table td {
    padding: 5px;
  }
  .highlight code table pre {
    margin: 0;
  }
  .highlight code .c,
  .highlight code .cd {
    color: #75715e;
    font-style: italic;
  }
  .highlight code .cm {
    color: #75715e;
    font-style: italic;
  }
  .highlight code .c1 {
    color: #75715e;
    font-style: italic;
  }
  .highlight code .cp {
    color: #75715e;
    font-weight: bold;
  }
  .highlight code .cs {
    color: #75715e;
    font-weight: bold;
    font-style: italic;
  }
  .highlight code .err {
    color: #960050;
    background-color: #1e0010;
  }
  .highlight code .gi {
    color: #ffffff;
    background-color: #324932;
  }
  .highlight code .gd {
    color: #ffffff;
    background-color: #493131;
  }
  .highlight code .ge {
    color: #000000;
    font-style: italic;
  }
  .highlight code .gr {
    color: #aa0000;
  }
  .highlight code .gt {
    color: #aa0000;
  }
  .highlight code .gh {
    color: #999999;
  }
  .highlight code .go {
    color: #888888;
  }
  .highlight code .gp {
    color: #555555;
  }
  .highlight code .gs {
    font-weight: bold;
  }
  .highlight code .gu {
    color: #aaaaaa;
  }
  .highlight code .k,
  .highlight code .kv {
    color: #66d9ef;
    font-weight: bold;
  }
  .highlight code .kc {
    color: #66d9ef;
    font-weight: bold;
  }
  .highlight code .kd {
    color: #66d9ef;
    font-weight: bold;
  }
  .highlight code .kp {
    color: #66d9ef;
    font-weight: bold;
  }
  .highlight code .kr {
    color: #66d9ef;
    font-weight: bold;
  }
  .highlight code .kt {
    color: #66d9ef;
    font-weight: bold;
  }
  .highlight code .kn {
    color: #f92672;
    font-weight: bold;
  }
  .highlight code .ow {
    color: #f92672;
    font-weight: bold;
  }
  .highlight code .o {
    color: #f92672;
    font-weight: bold;
  }
  .highlight code .mf {
    color: #ae81ff;
  }
  .highlight code .mh {
    color: #ae81ff;
  }
  .highlight code .il {
    color: #ae81ff;
  }
  .highlight code .mi {
    color: #ae81ff;
  }
  .highlight code .mo {
    color: #ae81ff;
  }
  .highlight code .m,
  .highlight code .mb,
  .highlight code .mx {
    color: #ae81ff;
  }
  .highlight code .se {
    color: #ae81ff;
  }
  .highlight code .sb {
    color: #e6db74;
  }
  .highlight code .sc {
    color: #e6db74;
  }
  .highlight code .sd {
    color: #e6db74;
  }
  .highlight code .s2 {
    color: #e6db74;
  }
  .highlight code .sh {
    color: #e6db74;
  }
  .highlight code .si {
    color: #e6db74;
  }
  .highlight code .sx {
    color: #e6db74;
  }
  .highlight code .sr {
    color: #e6db74;
  }
  .highlight code .s1 {
    color: #e6db74;
  }
  .highlight code .ss {
    color: #e6db74;
  }
  .highlight code .s {
    color: #e6db74;
  }
  .highlight code .na {
    color: #a6e22e;
  }
  .highlight code .nc {
    color: #a6e22e;
    font-weight: bold;
  }
  .highlight code .nd {
    color: #a6e22e;
    font-weight: bold;
  }
  .highlight code .ne {
    color: #a6e22e;
    font-weight: bold;
  }
  .highlight code .nf {
    color: #a6e22e;
    font-weight: bold;
  }
  .highlight code .no {
    color: #66d9ef;
  }
  .highlight code .bp {
    color: #f8f8f2;
  }
  .highlight code .nb {
    color: #f8f8f2;
  }
  .highlight code .ni {
    color: #f8f8f2;
  }
  .highlight code .nn {
    color: #f8f8f2;
  }
  .highlight code .vc {
    color: #f8f8f2;
  }
  .highlight code .vg {
    color: #f8f8f2;
  }
  .highlight code .vi {
    color: #f8f8f2;
  }
  .highlight code .nv {
    color: #f8f8f2;
  }
  .highlight code .w {
    color: #f8f8f2;
  }
  .highlight code .nl {
    color: #f8f8f2;
    font-weight: bold;
  }
  .highlight code .nt {
    color: #f92672;
  }
  .highlight code {
    color: #f8f8f2;
    background-color: #3e4149;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }
`
