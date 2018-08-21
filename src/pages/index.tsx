/* import { graphql } from "gatsby";
 * import Layout from "../layouts";
 * import React from 'react';
 * import balloonImage from './images/hotairballoon.svg';
 * 
 * // Please note that you can use https://github.com/dotansimha/graphql-code-generator
 * // to generate all types from graphQL schema
 * interface IndexPageProps {
 *   data: {
 *     site: {
 *       siteMetadata: {
 *         siteName: string
 *       }
 *     }
 *   },
 *   location: any
 * }
 * 
 * export const pageQuery = graphql`
 *   query IndexQuery {
 *     site {
 *       siteMetadata {
 *         siteName
 *       }
 *     }
 *   }
 * `
 * 
 * export default class IndexPage extends React.Component<IndexPageProps, {}> {
 *   public render() {
 *     const { siteName } = this.props.data.site.siteMetadata;
 *     return (
 *       <Layout data={this.props.data} location={this.props.location || {}}>
 *           <div style={{textAlign: "center", display: "inline-block"}}>
 *               <p style={{fontSize: "3rem"}} >Welcome to Hot Air</p>
 *               <p style={{fontSize: "2rem"}}>What's Legit and What to Quit in Finance and Technology</p>
 *               <p style={{marginTop: "2rem"}}>
 *                   <img src={balloonImage} alt="Cool balloon image" />
 *               </p>
 *           </div>
 *       </Layout>
 *     )
 *   }
 * } */

import React from 'react'
import Link from 'gatsby-link'
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
`

class IndexPage extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <Layout data={this.props.data} location={this.props.location} />
    )

  }

}

/* const IndexPage = () => (
 *   <div>
 *       <h1>Hi people</h1>
 *       <p>Welcome to your new Gatsby site.</p>
 *       <p>Now go build something great.</p>
 *   </div>
 * ) */

export default IndexPage

