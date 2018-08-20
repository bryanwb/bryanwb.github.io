import React, { MouseEvent, SFC } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import balloonImage from '../pages/images/hotairballoon-small.svg';

interface ListLinkProps {
  to: string,
  children: string
}

const ListLink: React.SFC<ListLinkProps> = (props: any) => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <Link to={props.to}>{props.children}</Link>
  </li>
);

interface IndexLayoutProps {
  children: any,
  data: any,
  location: any
}

const IndexLayout: React.SFC<IndexLayoutProps> = ({children, data, location}:{children:any, data:any, location: any}) => (
  <div style={{ margin: `0 auto`, maxWidth: 1000, padding: `1.25rem 1rem` }}>
      <header style={{ marginBottom: `1.5rem` }}>
          {(location && location.pathname == '/') ||
          <Link to="/" activeStyle={{ textShadow: `none`, backgroundImage: `none` }}>
              <img style={{ display: `inline`, maxWidth: 57.5, maxHeight: 75}} src={balloonImage} alt="Cool balloon image" />
          </Link>
          }
          <ul style={{ listStyle: `none`, float: `right` }}>
              <ListLink to="/">Home</ListLink>
              <ListLink to="/blog">Blog</ListLink>
              <ListLink to="/podcast">Podcast</ListLink>
              <ListLink to="/learn">Learning</ListLink>        
              <ListLink to="/about">About</ListLink>

          </ul>
      </header>
      {children}
  </div>
);

export default IndexLayout;

