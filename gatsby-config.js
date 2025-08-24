/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `HKSkins`,
    siteUrl: `https://www.hkskins.art`
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allSkin } }) => {
              return allSkin.nodes.map(node => {
                return Object.assign({}, {
                  title: node.metadata.name,
                  url: encodeURI(`${site.siteMetadata.siteUrl}/#${node.metadata.name.toLowerCase().replaceAll(' ', '-')}-by-${node.metadata.author.toLowerCase().replaceAll(' ', '-')}`),
                  description: `Newly added ${node.metadata.game === 'hollowKnight' ? "Hollow Knight" : "Silksong"} skin${node.metadata.author ? ` by ${node.metadata.author}` : ''}.`,
                  date: node.metadata.dateAdded,
                  custom_elements: [{"dc:creator": "Tadeas Jun"}],
                });
              });
            },
            query: `
              query Skins {
                allSkin (sort: [{metadata: {dateAdded: DESC}}, {metadata: {name: DESC}}]) {
                  nodes {
                    metadata {
                      name
                      source
                      author
                      game
                      type
                      desc
                      dateAdded
                    }
                  }
                }
              }
          `,
          output: "/rss.xml",
          title: "HKSkins",
          },
        ],
      },
    },
  ],
};
