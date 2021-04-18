import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import path from "path";

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const result = await graphql<{
    posts: Pick<GatsbyTypes.Query['allMarkdownRemark'], 'edges'>;
  }>(`
    query {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const posts = result.data?.posts.edges;

  if (posts) {
    posts.forEach(({ node }, index) => {
      const slug = node.fields?.slug;
      const next = index === 0 ? null : posts[index - 1].node;
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;

      if (slug) {
        createPage({
          path: slug,
          component: path.resolve('src/templates/post.tsx'),
          context: {
            slug,
            next,
            previous,
          },
        });
      }
    });
  }
};
