import { graphql } from "gatsby";
import Link from 'gatsby-link';
import Layout from "../../layouts";
import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

export default function Blog({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const disqusShortname = 'hotair-tech';
  return (
    <Layout >
        <div className="blog-posts">
            {posts
              .filter(post => post.node.frontmatter.title.length > 0)
              .map(({ node: post }) => {
                let disqusConfig = {
                  identifier: post.id,
                  title: post.frontmatter.title,
                };

                return (
                  <div>
                      <h1><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.html,
                        }}
                      />
                      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                  </div>
                );
              })}
        </div>
    </Layout>
  );
}

export const blogQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: {frontmatter: {tags: {in: "blog"}}}
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
