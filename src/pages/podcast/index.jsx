import { graphql } from "gatsby";
import Layout from "../../layouts";
import Link from "gatsby-link";
import React from 'react';

export default function Podcast({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout >
      <div className="podcast-posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div>
                <h1><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.html,
                  }}
                />
              </div>
            );
          })}
      </div>
    </Layout>
  );
}

export const podcastQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: {frontmatter: {tags: {in: "podcast"}}}
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
