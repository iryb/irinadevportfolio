import React from "react"
import {StaticQuery, graphql, Link} from "gatsby"
import Image from "gatsby-image"
import CategoriesList from "./categoriesList";

export default function ProjectPreview ( props, { data }) {

  return (
    <StaticQuery
      query={graphql`
        query ProjectQuery{
          allWpProject {
            nodes {
              id
              title
              link
              projectFields {
                link
              }
              featuredImage {
                node {
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
      `}


        render={data => (
          <>
            {data.allWpProject.nodes.filter(post => post.id === props.id).map(post => (
                <div className={"project project-preview relative py-7 " + props.class} 
                    key={post.id} 
                    index={props.index}
                    style={{
                      'width' : props.width
                    }}
                    data-filter={props.filter}
                >
                  <div className="project-inner transition-300 relative shadow-lg rounded-3xl z-10">
                    {post.featuredImage && (
                      <div className="post-image-container rounded-3xl">
                        <div className="project-page-link"><Link to={post.link}></Link></div>
                        <Image
                            fluid={post.featuredImage?.node?.localFile?.childImageSharp?.fluid}
                            alt={post.featuredImage?.node?.altText}
                        />
                      </div>
                    )}
                    <CategoriesList list={props.techs}></CategoriesList>
                  </div>
                </div>
            ))}
          </>
        )}
    />

  )
}