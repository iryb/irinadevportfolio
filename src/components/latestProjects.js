import React from "react"
import ProjectPreview from "../components/projectPreview"
import { StaticQuery, graphql } from "gatsby"

export default function LatestProjects ({ data }) {

  return (
    <StaticQuery
      query = {graphql`
        query LatestProjectsQuery {
          wpPage(isFrontPage: {eq: true}) {
            id
            title
            homeFields {
              showProjects {
                ... on WpProject {
                  id
                }
              }
            }
          }
        }
      `}

      render = { data => (
        <section className="section latest-projects">
          <div className="container">
            <h2 className="section-title">Latest Projects</h2>
            <div className="projects-container md:flex md:flex-wrap space-y-4 md:space-x-2">
              {data.wpPage.homeFields.showProjects.map(post => (
                <ProjectPreview id={post.id}></ProjectPreview>
              ))}
            </div>
          </div>
        </section>
      )}
    />

  )
}