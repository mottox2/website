import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none'
  },
  body: {
    color: '#3C4A60'
  },
  h2: {
    fontSize: '22px',
    marginBottom: '1.25rem'
  },
  h3: {
    fontSize: '18px',
    marginBottom: '1rem'
  },
  p: {
    marginBottom: '1rem'
  },
  'h1,h2,h3,h4,h5,h6': {
    marginTop: '2rem'
  }
})

delete Wordpress2016.googleFonts

const fonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Helvetica Neue',
  'Hiragino Sans',
  '游ゴシック Medium',
  'YuGothic',
  'Hiragino Kaku Gothic ProN',
  'メイリオ',
  'Meiryo,sans-serif'
]

const typography = new Typography({
  ...Wordpress2016,
  headerFontFamily: fonts,
  headerWeight: 600,
  bodyFontFamily: fonts,
  googleFonts: [
    {
      name: 'lato',
      styles: ['900']
    }
  ]
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
