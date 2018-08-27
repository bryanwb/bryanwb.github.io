/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require(`lodash`);
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // the only difference currently between the page template and the blog template
  // is that the blog template has a comments section
  const pageTemplate = path.resolve(`src/templates/page-template.jsx`);
  const blogPostTemplate = path.resolve(`src/templates/blog-template.jsx`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              title
              tags
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const [ pagePosts, blogPosts ] = _.partition(result.data.allMarkdownRemark.edges, edge => {
        const tags = _.get(edge, `node.frontmatter.tags`);
        return _.includes(tags, 'nocomments');
      });

      // pagePosts don't have a comments section
      pagePosts.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: pageTemplate,
          context: {}, // additional data can be passed via context
        });
      });
    
      blogPosts.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {}, // additional data can be passed via context
        });
      });

    });

};
