module.exports = {
  siteMetadata: {
    siteName: 'Hot Air',
    description: ""
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-124641733-1",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hot Air",
        short_name: "HotAir",
        start_url: "/",
        display: "minimal-ui",
        background_color: "white",
        theme_color: "white",
        icon: "static/favicon.png", // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
};
