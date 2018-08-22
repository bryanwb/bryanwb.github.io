import React from 'react';
import balloonImage from '../pages/images/hotairballoon-small.svg';
import Link from 'gatsby-link';

const Footer = (props) => (
  <footer id="footer" style={{ display: `inline`}}>
    <Link to="/" style={{float: 'left'}}>
    <img style={{maxWidth: 57.5, maxHeight: 75 }} src={balloonImage} alt="Cool balloon image" />
    </Link>
    <div className="copyright" style={{marginLeft: "1rem", paddingTop: "1rem"}}>
      &copy; Bryan Willson Berry, This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a> <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
    <img alt="Creative Commons License" style={{ borderWidth: 0, marginBottom: 0 }} src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>
    </div>
  </footer>
);

export default Footer;
