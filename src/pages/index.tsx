import { graphql } from "gatsby";
import Layout from "../layouts";
import React from 'react';


// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      siteName
    }
  }
}
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public render() {
    const { siteName } = this.props.data.site.siteMetadata;
    return (
      <Layout data={this.props.data}>
        <div>
          <h1>Welcome to Hot Air</h1>
          <p>What's Legit and What to Quit in Finance and Technology.</p>
          <p>A project by Bryan Willson Berry.</p>
        </div>
      </Layout>
    )
  }
}

