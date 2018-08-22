import React from 'react';
import backgroundImage from '../pages/images/aerial-view-cappadocia-1.jpg';
import backgroundImageVertical from '../pages/images/aerial-view-cappadocia-vert.jpg';
import Link from "gatsby-link";

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const Header = (props) => (
  <header id="header">
    <div id="splashImage" style={{
      width: "100%", backgroundSize: "cover"
    }}>

      <div className="inner" style={{
        textAlign: "center", color: "white",
        textShadow: "3px 3px 50px rgba(0, 0, 0, 0.7)",
        fontWeight: "bolder"
      }}>
        <div style={{ fontSize: "8vh", paddingTop: "2vh" }}>Welcome to <span style={{ display: "inline-block" }}>Hot Air</span></div><br />
        <div style={{ fontSize: "6vh" }}>What's Legit <span style={{ display: "inline-block" }}>and What to Quit</span></div><br />
        <div style={{ fontSize: "6vh" }}>in Finance and Technology</div><br />
      </div>
    </div>
    <div style={{ textAlign: "center", bottom: 0 }}>
      <ul style={{ listStyle: `none`, float: `none`, color: "white", fontSize: "3vh", display: `inline-block`, marginRight: `1.5rem` }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/blog/">Blog</ListLink>
        <ListLink to="/podcast/">Podcast</ListLink>
        <ListLink to="/learn/">Learn</ListLink>
        <ListLink to="/about/">About</ListLink>
      </ul>
    </div>

  </header >
);


export default Header;
