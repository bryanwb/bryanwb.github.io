// import React from 'react'
// import Link from 'gatsby-link'

// const Header = ({ siteTitle }) => (
//   <div
//     style={{
//       background: 'rebeccapurple',
//       marginBottom: '1.45rem',
//     }}
//   >
//     <div
//       style={{
//         margin: '0 auto',
//         maxWidth: 960,
//         padding: '1.45rem 1.0875rem',
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: 'white',
//             textDecoration: 'none',
//           }}
//         >
//           {siteTitle}
//         </Link>
//       </h1>
//     </div>
//   </div>
// )

// export default Header


import React from 'react';
import backgroundImage from '../pages/images/aerial-view-cappadocia-1.jpg';
import Link from "gatsby-link";

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);


const Header = (props) => (
  <header id="header">
      <div style={{
        backgroundImage: `url(${backgroundImage})`, width: "100%",
        height: "60vh", backgroundSize: "cover"
      }}>
          <div className="inner" style={{
            textAlign: "center", color: "white",
            textShadow: "3px 3px 50px rgba(0, 0, 0, 0.7)",
            fontWeight: "bolder"
          }}>
              <p style={{ fontSize: "6em", paddingTop: "5vh" }}>Welcome to Hot Air</p>
              <p style={{ fontSize: "4em" }}>What's Legit and What to Quit</p>
              <p style={{ fontSize: "4em" }}>in Finance and Technology</p>
          </div>
      </div>
      <div style={{ textAlign: "center", bottom: 0 }}>
          <ul style={{ listStyle: `none`, float: `none`, color: "white", fontSize: "2em", display: `inline-block`, marginRight: `1.5rem` }}>
              <ListLink to="/">Home</ListLink>
              <ListLink to="/blog/">Blog</ListLink>
              <ListLink to="/podcast/">Podcast</ListLink>
              <ListLink to="/learn/">Learn</ListLink>
              <ListLink to="/about/">About</ListLink>
          </ul>
      </div>

  </header>
);


export default Header;
