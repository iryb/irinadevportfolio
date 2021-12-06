import React, { Fragment } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
const PageLayout = ({ children }) => {

  return (
    <>
      <main className="">
        <div>{children}</div>
      </main>
    </>
  );
};
export default PageLayout;