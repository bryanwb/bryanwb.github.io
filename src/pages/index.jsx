import { graphql } from "gatsby";
import Link from 'gatsby-link';
import React from 'react';
import Layout from '../layouts';
import styled from 'react-emotion';

const BlogPostList = styled('div')`
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 1rem;
  @media (min-width: 820px) {
    max-width: 50vw;   
  }
  @media (max-width: 820px) {
    max-width: 100vw;
  }
`;

export default function Index({data}) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
        <BlogPostList>
            {posts
            .map(({ node }) => {
            return (
            <div>
                <h3 style={{
                    marginBottom: "0.25em"
                    }}>
                    <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
                </h3>
                <small><strong>{node.frontmatter.date}</strong></small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
            );
              })}
        </BlogPostList>
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
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;
