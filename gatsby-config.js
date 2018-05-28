module.exports = {
  siteMetadata: {
    title: 'mottox2 blog',
    author: 'mottox2',
    description: 'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとか',
    siteUrl: 'https://mottox2.com'
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-esa`,
      options: {
        accessToken: process.env.ACCESS_TOKEN,
        teamName: process.env.TEAM_NAME,
        q: `in:blog wip:false`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-34428182-9'
   }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`
  ]
}
