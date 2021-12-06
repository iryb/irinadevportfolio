/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react"
 import PropTypes from "prop-types"
 import { useStaticQuery, graphql } from "gatsby"
 
 const ProjectLayout = ({ children }) => {
   const data = useStaticQuery(graphql`
     query ProjectSiteTitleQuery {
       site {
         siteMetadata {
           title
         }
       }
     }
   `)
 
   return (
     <>
      <main>{children}</main>
      <footer
        style={{
          marginTop: `2rem`,
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
     </>
   )
 }
 
 ProjectLayout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default ProjectLayout
 