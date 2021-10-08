/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const {
    data: { allWpPage },
  } = await graphql(`
    query {
      allWpPage {
        nodes {
          id
          uri
        }
      }
    }
  `)

  const pageTemplate = path.resolve(`./src/templates/page.js`)

  allWpPage.nodes.map((page) => {

    const { id, uri } = page;

    return actions.createPage({
      path: uri,
      component: pageTemplate,
      context: {
        id: id
      }
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createProject } = actions

  // query content for projects
  const {
    data: { allWpProject },
  } = await graphql(`
    query {
      allWpProject {
        nodes {
          id
          uri
        }
      }
    }
  `)

  const projectTemplate = path.resolve(`./src/templates/project.js`)

  allWpProject.nodes.map((project) => {

    const { id, uri } = project;

    return actions.createPage({
      path: uri,
      component: projectTemplate,
      context: {
        id: id
      }
    });
  });
}