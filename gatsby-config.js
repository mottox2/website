module.exports = {
  siteMetadata: {
    title: 'Gatsby Esa Starter',
    author: 'mottox2',
    description: 'A starter blog pulling data from esa',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/'
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
    {
      resolve: `gatsby-source-esa`,
      options: {
        accessToken: process.env.ACCESS_TOKEN,
        teamName: process.env.TEAM_NAME,
        q: `in:public`
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
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    }
  ]
}
