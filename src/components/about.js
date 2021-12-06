import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Socials from "./socials"

export default function About ({ data }) {

  return (
    <StaticQuery
      query = {graphql`
        query AboutQuery {
          wpPage(isFrontPage: {eq: true}) {
            id
            title
            homeFields {
              heroTitle
              heroText
              cvButtonText
              cvFile {
                localFile {
                  url
                  name
                }
              }
            }
          }
        }
      `}

      render = { data => (
        <section className="section about" id="about">
          <h1 className="section-title">{data.wpPage.homeFields.heroTitle}</h1>
          <div className="section-text" dangerouslySetInnerHTML={{ __html: data.wpPage.homeFields.heroText }}></div>
          <div className="sm:flex items-center mt-5">
            <a href={data.wpPage.homeFields.cvFile.localFile.url} target="_blank" rel="noreferrer" className="btn btn-main m-0 mr-4 transition-300">{data.wpPage.homeFields.cvButtonText}</a>
            <Socials />
          </div>
        </section>
      )}
    />

  )
}