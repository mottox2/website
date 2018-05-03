module.exports = {
  siteMetadata: {
    title: 'mottox2 blog',
    author: 'mottox2',
    description: 'mottox2のエンジニア・デザインブログ。RailsとかReactとかTypeScriptとか',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/'
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
    {
      resolve: `gatsby-source-esa`,
      options: {
        accessToken: process.env.ACCESS_TOKEN,
        teamName: process.env.TEAM_NAME,
        q: `in:blog`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ]
}
