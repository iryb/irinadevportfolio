import React from 'react';
import { graphql } from 'gatsby';

const WpProjectTemplate = ({ data: { wpProject } }) => {
  const { title, content } = wpProject;

  return (
    <section>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};

export const query = graphql`
  query($id: String!) {
    wpProject(id: { eq: $id }) {
      title
      content
    }
  }
`;
export default WpProjectTemplate;