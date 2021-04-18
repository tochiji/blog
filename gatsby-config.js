module.exports = {
  siteMetadata: {
    title: 'tochiji blog',
    description: 'とちじのblogです',
    siteUrl: 'https://tochiji.github.io',
    image: '/images/logo.png',
    twitterImage: '/images/twitter.png',
    social: {
      twitter: {
        account: '@tochiji1',
        url: 'https://twitter.com/tochiji1',
      },
      github: {
        name: 'tochiji',
        url: 'https://github.com/tochiji',
      },
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        // eslint-disable-next-line no-undef
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        cssLoaderOptions: {
          esModule: true,
          modules: {
            namedExport: true,
          },
        },
      },
    },
    'gatsby-plugin-typegen',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-numbered-footnotes',
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              isIconAfterHeader: true,
            },
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 560,
              height: 315,
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { fields: [frontmatter___date], order: DESC },
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        description
                        date
                      }
                      fields { slug }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "tochiji blog's RSS Feed",
          },
        ],
      },
    },
  ],
};
