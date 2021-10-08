import React from "react"
import {StaticQuery, graphql, Link} from "gatsby"
import Image from "gatsby-image"

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
                      fluid(maxWidth: 500, quality: 100) {
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
                <div className="project md:flex-1" key={post.id}>
                    <h3 className="project-title">{post.title}</h3>
                    {post.featuredImage && (
                      <div className="post-image-container">
                          <Image
                              fluid={post.featuredImage?.node?.localFile?.childImageSharp?.fluid}
                              alt={post.featuredImage?.node?.altText}
                          />
                      </div>
                    )}
                    <a href={post.projectFields.link} target="_blank" rel="nofollow">Link</a>
                    <Link to={post.link} className="ml-3">Read more</Link>
                </div>
            ))}
          </>
        )}
    />

  )
}