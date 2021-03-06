module.exports = {
  siteMetadata: {
    title: `IRB`,
    description: `Portfolio`,
    author: `iryna`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `assets`,
    //     path: `${__dirname}/content/assets`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `http://www.irb.foraisa.com/graphql`,
        includedRoutes: [
          "/*/*/posts",
          "/*/*/pages",
          "/*/*/media",
          "/*/*/menus",
          "/*/*/team"
        ],
        useACF: true,
      },
    },
    {
      resolve: "gatsby-source-wordpress-menus",
      options: {
        wordpressUrl: "http://www.irb.foraisa.com",
        languages: ["en"],
        enableWpml: true,
        allowCache: true,
        maxCacheDurationSeconds: 60 * 60 * 24
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Rubik\:300,400,700`
        ],
        display: 'swap'
      }
    }
  ],
}
