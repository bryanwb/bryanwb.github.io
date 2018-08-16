import { graphql } from "gatsby";
import Layout from "../../layouts";
import React from 'react';


// to generate all types from graphQL schema
interface AboutPageProps {
  data: {
    allMarkdownRemark: any,
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}


export default class IndexAbout extends React.Component<AboutPageProps, {}> {
  public render() {
    const { siteName } = this.props.data.site.siteMetadata;
    return (
      <Layout data={this.props.data}>
        <div>
          <h1>{this.props.data.allMarkdownRemark.edges[0].node.frontmatter.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.data.allMarkdownRemark.edges[0].node.html,
            }}
          />
        </div>
      </Layout>
    )
  }
}

/*eslint no-undef: "off"*/
export const pageQuery = graphql`
  query AboutPageQuery {
    site {
      siteMetadata {
        siteName
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;
