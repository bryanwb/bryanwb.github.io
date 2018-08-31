import React from 'react';
import Link from 'gatsby-link';

const Footer = (props) => (
    <footer id="footer" style={{
        backgroundColor: "rgba(96, 135, 192, 0.82)",
        color: "white",
        textAlign: "center",
        bottom: 0,
        clear:"left"
    }}>
    <div className="copyright" style={{ marginLeft: "1rem", paddingTop: "1rem" }}>
      <Link to="/">
        <img style={{ maxWidth: 57.5, maxHeight: 75, verticalAlign: "middle" }} src="/favicon.png" alt="Cool balloon" />
      </Link>
      &nbsp;&nbsp;&copy; 2018 Bryan Willson Berry&nbsp;&nbsp;
  <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  </a>
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
        &nbsp;&nbsp;<img alt="Creative Commons License" style={{ borderWidth: 0, marginBottom: 0, verticalAlign: "middle" }} src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
      </a>
    </div>
  </footer>
);

export default Footer;
