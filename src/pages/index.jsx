import { graphql } from "gatsby";
import Link from 'gatsby-link';
import React from 'react';
import Layout from '../layouts';

export default function Index({data}) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
        <div className="blog-posts">
            {posts
              .filter(post => post.node.frontmatter.title.length > 0)
              .map(({ node: post }) => {
                return (
                  <div>
                      <h1><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h1>
                  </div>
                );
              })}
        </div>
    </Layout>
  );
}


export const postQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: {frontmatter: {tags: {in: ["blog", "podcast"]}}}
    ) {
      edges {
        node {
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
`;
