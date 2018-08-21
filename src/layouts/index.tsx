import React, { MouseEvent, SFC } from 'react';
import Link from 'gatsby-link';
import balloonImage from '../pages/images/hotairballoon-small.svg';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import { graphql } from "gatsby";


class Layout extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    /* const siteTitle = this.props.data.site.siteMetadata.siteName
     * const siteDescription = this.props.data.site.siteMetadata.description
     * const { location, children } = this.props

     * let rootPath = `/`

     * let content; */

    /* if (location.pathname === rootPath) {
     *   content = (
     *     <div id="wrapper">
     *       <Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
     *       <Main
     *         isArticleVisible={this.state.isArticleVisible}
     *         timeout={this.state.timeout}
     *         articleTimeout={this.state.articleTimeout}
     *         article={this.state.article}
     *         onCloseArticle={this.handleCloseArticle}
     *       />
     *       <Footer timeout={this.state.timeout} />
     *     </div>
     *   )
     * } else {
     *   content = (
     *     <div id="wrapper" className="page">
     *       <div style={{
     *         maxWidth: '1140px'
     *       }}>
     *         {children()}
     *       </div>
     *     </div>
     *   )
     * } */
    const siteTitle = this.props.data.site.siteMetadata.siteName
    const siteDescription = this.props.data.site.siteMetadata.description

    return (
      <div>
          <Helmet>
              <title>{siteTitle}</title>
              <meta name="description" content={siteDescription} />
          </Helmet>
          <div id="wrapper">
              <Header />
          </div>
          <div id="bg"></div>
      </div>

    )
  }
}

export default Layout;

/* interface ListLinkProps {
 *   to: string,
 *   children: string
 * }
 * 
 * const ListLink: React.SFC<ListLinkProps> = (props: any) => (
 *   <li style={{ display: `inline-block`, marginRight: `1rem` }}>
 *       <Link to={props.to}>{props.children}</Link>
 *   </li>
 * );
 * 
 * interface IndexLayoutProps {
 *   children: any,
 *   data: any,
 *   location: any
 * }
 * 
 * const IndexLayout: React.SFC<IndexLayoutProps> = ({children, data, location}:{children:any, data:any, location: any}) => (
 *   <div style={{ margin: `0 auto`, maxWidth: 1000, padding: `1.25rem 1rem` }}>
 *       <header style={{ marginBottom: `1.5rem` }}>
 *           {(location && location.pathname == '/') ||
 *           <Link to="/" activeStyle={{ textShadow: `none`, backgroundImage: `none` }}>
 *               <img style={{ display: `inline`, maxWidth: 57.5, maxHeight: 75}} src={balloonImage} alt="Cool balloon image" />
 *           </Link>
 *           }
 *           <ul style={{ listStyle: `none`, float: `right` }}>
 *               <ListLink to="/blog">Blog</ListLink>
 *               <ListLink to="/podcast">Podcast</ListLink>
 *               <ListLink to="/learn">Learning</ListLink>        
 *               <ListLink to="/about">About</ListLink>
 * 
 *           </ul>
 *       </header>
 *       {children}
 *   </div>
 * );
 * 
 * export default IndexLayout;
 *  */
