import React from 'react';
import Link from 'gatsby-link';
import { graphql } from "gatsby";
import Layout from '../layouts';
import Helmet from 'react-helmet';


export const IndexQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
        description
      }
    }
  }
`;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Layout data={this.props.data} location={this.props.location} />
    );

  }

}

export default IndexPage;

