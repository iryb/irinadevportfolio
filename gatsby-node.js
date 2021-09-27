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