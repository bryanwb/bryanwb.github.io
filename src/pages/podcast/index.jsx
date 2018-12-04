import { graphql } from "gatsby";
import Layout from "../../layouts";
import Link from "gatsby-link";
import React from 'react';
import HeadShot from './round-headshot.png';
import styled, { css } from 'react-emotion';
import { FaRss, FaApple, FaHeadphones, FaSpotify } from 'react-icons/fa';

const LinkBar = styled('div')`
 ul {
   list-style-type: none;
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   margin: -4px 0;
   padding-bottom: 2em;
 }
`;

const PodcastClass = css`
   margin: 4px 8px;
   pointer: cursor;
   transition: background-color 333ms, color 333ms;
   box-shadow: inset 0 0 0 2px #202020;
   border-radius: 2px;
   color: #202020;
   padding: 0.5em 1em;
   line-height: 1;
   a, a:visited {
     color: #202020;
   }

   &:hover {
     background-color: #202020;
     color: #FFFFFF;
        a, a:visited {
          color: #FFFFFF;
        }
   }
`;

const PodcastLink = (props) => (
  <li id={'li-' + props.name} className={PodcastClass}>
  <a id={'a-'+ props.name} href={props.url}>
  {props.children}
      </a>
  </li>
);


export default function Podcast({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const disqusShortname = 'hotair-tech';
  return (
    <Layout >
        <LinkBar>
            <ul>
                <PodcastLink name="rss" url="http://hotair.libsyn.com/rss"><FaRss></FaRss>  RSS</PodcastLink>
                <PodcastLink name="apple" url="https://itunes.apple.com/us/podcast/welcome-to-hot-air/id1445366094"><FaApple></FaApple>  Apple Podcasts</PodcastLink>
                <PodcastLink name="overcast"><FaHeadphones id="fa-overcast"></FaHeadphones>  Overcast</PodcastLink>
                <PodcastLink name="spotify" url="https://open.spotify.com/show/4tTGunmpkaTsjhb1Ee5g4o"><FaSpotify></FaSpotify>  Spotify</PodcastLink>
                <PodcastLink name="tunein" url="https://tunein.com/podcasts/Technology-Podcasts/Welcome-to-Hot-Air-p1179991/"><FaHeadphones id="fa-headphones"></FaHeadphones>  Tunein</PodcastLink>
            </ul>
        </LinkBar>
        <div id="about-the-show" style={{paddingBottom: '1em',
                                         display: 'flex',
                                         flexWrap: 'nowrap',
                                         justifyContent: 'space-between',
                                         margin: 'auto',
                                         maxWidth: '1200px'}}>
            <div id="about-the-show" style={{flex: 1}}>
                <h2>ABOUT THE SHOW</h2>
                <div style={{marginRight: '96px'}}>
                    The world of decentralized finance is complex, exciting, and changing rapidly. Join me
                    to discuss the development of new protocols, companies, and technologies that will propel the Internet of Money. This show focuses on the finer details both financial and technical. Decentralized Finance is often referred to as <i>De.fi</i> and you can learn more about it on the <a href="https://www.reddit.com/r/defi">De.fi subreddit</a> and <a href="http://t.me/de_fi">Telegram channel</a>. A good list of companies, techologies, and resources in the <i>De.fi</i> space can be found <a href="https://github.com/ong/awesome-decentralized-finance">here</a>.
                    <br /><br />
                    Disclaimer: No content on this site should be taken as investment advice. I am a software engineer NOT a registered financial advisor.
                    <br /><br />
                    Follow me on Twitter at <a href="https://twitter.com/bryanwb">@bryanwb</a>
                </div>
            </div>
            <aside id="your-host">
                <h2>YOUR HOST</h2>
                <div>
                    <img src={HeadShot} />
                    <div style={{textAlign: 'center'}}>
                        <div style={{display: 'inline-block'}}>Bryan W. Berry</div>
                    </div>
                </div>
            </aside>
        </div>
        <div style={{flex: '0 1 256px'}}>
            <h2>EPISODE LIST</h2>
        </div>
        <div className="podcast-posts">
            {posts
              .filter(post => post.node.frontmatter.title.length > 0)
              .map(({ node: post }) => {
                let disqusConfig = {
                  identifier: post.id,
                  title: post.frontmatter.title,
                };

                return (
                  <div>
                      <h1><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.html,
                        }}
                      />
                  </div>
                );
              })}
        </div>
    </Layout>
  );
}

export const podcastQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: {frontmatter: {tags: {in: "podcast"}}}
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
            tags
          }
        }
      }
    }
  }
`;
