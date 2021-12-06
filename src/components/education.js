import React from 'react'
import { FaGraduationCap, FaLaptopCode } from 'react-icons/fa'
import { useStaticQuery, graphql } from "gatsby"

export default function Education() {
  const data = useStaticQuery(graphql`
    query EducationQuery {
      wpPage(isFrontPage: {eq: true}) {
        homeFields {
          experienceTitle
          education {
            title
            text
            years
          }
          jobs {
            company
            text
            title
            years
          }
        }
      }
    }
  `)

  return (
    <section className="section education" id="experience">
      <h2 className="section-title">{data.wpPage.homeFields.experienceTitle}</h2>
      <div className="space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
        <div className="lg:w-1/2">
          <div className="timeline bg-white rounded-3xl py-7 px-7 shadow space-y-10 relative">
            {data.wpPage.homeFields.education.map((item, index)=> {
              return <div className="timeline-container" key={index}>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 text-secondary text-3xl bg-white z-10"><FaGraduationCap /></div>
                  <div className="text-subtitle text-sm pt-1 pb-0">{item.years}</div>
                  <h3 className="text-lg leading-6 my-3">{item.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                </div>
              </div>
            })}
            <span className="absolute top-0 bottom-8 left-10 w-px bg-secondary"></span>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="timeline bg-white rounded-3xl py-7 px-7 shadow space-y-10 relative">
          {data.wpPage.homeFields.jobs.map((item, index)=> {
              return <div className="timeline-container" key={index}>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 text-secondary text-3xl bg-white z-10"><FaLaptopCode /></div>
                  <div className="text-subtitle text-sm pt-1 pb-0">{item.years}</div>
                  <h3 className="text-lg leading-6 my-3">{item.title}</h3>
                  <p className="text-subtitle text-sm mb-3">{item.company}</p>
                  <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                </div>
              </div>
            })
          }
            <span className="absolute top-0 bottom-8 left-10 w-px bg-secondary"></span>
          </div>
        </div>
      </div>
    </section>
  )
}
