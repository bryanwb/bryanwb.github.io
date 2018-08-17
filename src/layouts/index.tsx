import React, { MouseEvent, SFC } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

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
  data: any
}

const IndexLayout: React.SFC<IndexLayoutProps> = ({children, data}:{children:any, data:any}) => (
  <div style={{ margin: `0 auto`, maxWidth: 1000, padding: `1.25rem 1rem` }}>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" activeStyle={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>{data.site.siteMetadata.title}</h3>
      </Link>
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

