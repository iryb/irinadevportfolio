import React from 'react'
import { graphql } from 'gatsby'
import Image from "gatsby-image"
import Layout from '../components/layout'
import Seo from "../components/seo"

const WpProjectTemplate = ({ data: { wpProject } }) => {
  const { title, content, projectFields } = wpProject;
  return (
    <Layout>
      <Seo title={title} />
      <section className="project-hero h-40 mb-5 bg-gray-200">
        <div className="container mx-auto h-full flex flex-col justify-center items-center">
          <h1 className="page-title text-center">{title}</h1>
          <a className="underline project-link" href={projectFields.link} target="_blank" rel="nofollow">Link to website</a>
        </div>
      </section>
      <section className="project-content py-5">
        <div className="container mx-auto">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {projectFields.gallery.length > 1 &&<>
          <h2 className="text-center">Screenshots</h2>
          <div className="project-gallery md:flex flex-wrap justify-center">
            {projectFields.gallery.map( item => {
              { return item.image && (
                <div className="post-image md:w-1/3 p-2">
                  <div className="post-image-container rounded-3xl">
                    <Image
                        fluid={item.image?.localFile?.childImageSharp?.fluid}
                        alt={item.image?.altText}
                    />
                  </div>
                </div>
              )}
            })}
          </div>
          </>}
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    wpProject(id: { eq: $id }) {
      title
      content
      projectFields {
        link
        gallery {
          image {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 400, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default WpProjectTemplate;