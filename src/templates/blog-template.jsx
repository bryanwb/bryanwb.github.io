import React from "react";
import Helmet from "react-helmet";
import { graphql } from 'gatsby';
import Layout from '../layouts';
import { DiscussionEmbed } from 'disqus-react';

export default function Template({
  data
}) {
  const post = data.markdownRemark;
  const disqusShortname = 'hotair-tech';
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
  };
  return (
    <Layout>
        <div className="blog-post-container">
            <Helmet title={`Hot Air - ${post.frontmatter.title}`} />
            <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />        
        </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
              markdownRemark(frontmatter: {path: {eq: $path } }) {
              html
      frontmatter {
              date(formatString: "MMMM DD, YYYY")
          path
          title
          tags
        }
      }
    }
  `
  ;

