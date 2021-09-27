import React, { Fragment } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
const PageLayout = ({ children }) => {
  const {
    allWpMenu: {
      nodes: {
        0: {
          menuItems: { nodes }
        }
      }
    }
  } = useStaticQuery(graphql`
    {
      allWpMenu {
        nodes {
          menuItems {
            nodes {
              label
              path
            }
          }
        }
      }
    }
  `);
  return (
    <Fragment>
      <header>
        <nav>
          <ul>
            {nodes.map((item, index) => {
              const { label, path } = item;
              return (
                <li key={index}>
                  <Link to={path}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </Fragment>
  );
};
export default PageLayout;