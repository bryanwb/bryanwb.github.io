import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet';
import PropTypes from "prop-types"
import Link from "gatsby-link";
import styled from 'react-emotion';

const Splash = styled('div')`
  z-index: 1;
  position: relative;
  @media (min-width: 820px) {
     height: 50vh;
  }
  @media (max-width: 820px) {
     height: 80vh;
  }
`;

const SplashImage = styled('div')`
  filter: brightness(70%);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
  @media (min-width: 820px) {
     background-image: url(/aerial-view-cappadocia-2.jpg);
  }
  
  @media (max-width: 820px) {
     background-image: url(/aerial-view-cappadocia-vert.jpg);
  }
`;

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <Link to={props.to}>{props.children}</Link>
  </li>
);

const Header = (props) => (
  <div>
      <Helmet
        link={[
          { rel: 'shortcut icon', type: 'image/png', href: `favicon.png` }
        ]}>
          <title>{props.data.site.siteMetadata.siteName}</title>
          <link rel="canonical" href="https://hotair.tech" />
          <meta name="description" content={props.data.site.siteMetadata.description} />

      </Helmet>
      <header id="header">
          <Splash>
              <SplashImage />
              <div className="inner" style={{
                color: "white",
                fontWeight: "bolder",
                textAlign: "center",
                textShadow: "5px 5px 5px rgba(0, 0, 0, 0.7)",
              }}>
                  <div style={{ fontSize: "8vh", paddingTop: "2vh" }}>Welcome to <span style={{ display: "inline-block" }}>Hot Air</span></div><br />
                  <div style={{ fontSize: "6vh" }}>What's Legit <span style={{ display: "inline-block" }}>and What to Quit</span></div><br />
                  <div style={{ fontSize: "6vh" }}>in Technology and Finance</div><br />
              </div>
          </Splash>
          <div style={{ textAlign: "center", bottom: 0 }}>
              <ul style={{ listStyle: `none`, float: `none`, color: "white", fontSize: "3vh", display: `inline-block`, marginRight: `1.5rem` }}>
                  <ListLink to="/">Home</ListLink>
                  <ListLink to="/blog/">Blog</ListLink>
                  <ListLink to="/podcast/">Podcast</ListLink>
                  <ListLink to="/learn/">Learn</ListLink>
                  <ListLink to="/about/">About</ListLink>
                  <ListLink to="/isbitcoinworthmorethangoldyet/">Charts</ListLink>
              </ul>
          </div>

      </header>
  </div>
);


export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteName
            description
          }
        }
      }
      `}
    render={data => <Header data={data} {...props} />}
  />
)

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  }).isRequired
}

