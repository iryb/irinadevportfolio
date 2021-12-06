import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { SiLinkedin, SiUpwork  } from "react-icons/si";
import { GrMail } from "react-icons/gr";

export default function Socials() {
  const data = useStaticQuery(graphql`
    query SocialsQuery {
      wpPage(isFrontPage: {eq: true}) {
        homeFields {
          socials {
            link
            social
          }
          email
        }
      }
    }
  `)

  return (
    <div>
      {data.wpPage.homeFields.socials.map((item, index)=> {
        return <div className="social m-3 inline-block" key={index}>
          <a href={item.link} target="_blank" className="social-link text-secondary text-2xl transition-300">
            {item.social === 'linkedin' && <SiLinkedin />}
            {item.social === 'upwork' && <SiUpwork />}
          </a>
        </div>
        })
      }
      <div className="social m-3 inline-block">
        <a href={"mailto:" + data.wpPage.homeFields.email} className="social-link text-secondary text-2xl transition-300">
          <GrMail />
        </a>
      </div>
    </div>
  )
}