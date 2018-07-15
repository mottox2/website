/* eslint import/no-unresolved:"off" */
/* eslint import/extensions:"off" */
/* eslint global-require:"off" */
import React from 'react'

let inlinedStyles = ''
if (process.env.NODE_ENV === 'production') {
  try {
    /* eslint import/no-webpack-loader-syntax: off */
    inlinedStyles = require('!raw-loader!../public/styles.css')
  } catch (e) {
    /* eslint no-console: "off"*/
    console.log(e)
  }
}

export default class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === 'production') {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: inlinedStyles }} />
    }
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <meta name="google-site-verification" content="Ea1K1N5NXjUJEV6XxsrA2va96TOyyIyuSdQE5gLLNu4" />
          {this.props.headComponents}
          <link rel="shortcut icon" href='/favicon.ico' />
          <meta name="theme-color" content="#4D9ABF">
          {css}
        </head>
        <body>
          <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </body>
      </html>
    )
  }
}
