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
                link
              }
            }
          }
        }
      `}

      render = { data => (
        <section className="section about" id="about">
          <h1 className="section-title">{data.wpPage.homeFields.heroTitle}</h1>
          <div className="section-text" dangerouslySetInnerHTML={{ __html: data.wpPage.homeFields.heroText }}></div>
          <div className="flex items-center mt-5">
            <a href={data.wpPage.homeFields.cvFile.link} download className="btn btn-main m-0 mr-4">{data.wpPage.homeFields.cvButtonText}</a>
            <Socials />
          </div>
        </section>
      )}
    />

  )
}