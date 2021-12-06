import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import About from "../components/about"
import Education from "../components/education"
import ProjectsFilter from "../components/projectsFilter"

const IndexPage = () => (
  <Layout>
    <div className="container mx-auto text-base">
      <Seo title="Home" />
      <About />
      <Education />
      <ProjectsFilter />
    </div>
  </Layout>
)

export default IndexPage
