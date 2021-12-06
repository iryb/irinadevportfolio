import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Socials from "./socials"
import { ReactSVG } from "react-svg"
import { AiOutlineMenu } from "react-icons/ai"
import { useState, useEffect } from "react"

const Header = ({ siteTitle }) => {
  const {
    allWpMenu: {
      nodes: {
        0: {
          menuItems: { nodes }
        }
      }
    }
  } = useStaticQuery(graphql`
    {
      allWpMenu {
        nodes {
          menuItems {
            nodes {
              label
              path
              menuFields {
                icon {
                  localFile {
                    extension
                    publicURL
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const [menuClick, setMenuClick] = useState(false)

  function mobileMenuHandler() {
    setMenuClick(!menuClick)
  }

  return (
    <header className={(menuClick ? "menu-active " : "") + ("fixed left-0 top-0 w-full bg-white md:w-28 md:h-full p-4 z-20")}>
      <div className="flex h-max justify-between items-center md:flex-col md:h-full">
        <div className="logo font-bold font-sans text-3xl text-center transition-300">
          <Link to="/">IRB</Link>
        </div>
        <nav className="main-menu absolute bg-white left-0 top-full w-full md:static">
          <ul className="m-0">
            {nodes.map((item, index) => {
              const { label, path, menuFields } = item;
              return (
                <li key={index} className="text-center mb-8">
                  <Link to={path} className="menu-link">
                    <div className="w-6 mx-auto mb-1 text-secondary">
                      <ReactSVG src={menuFields.icon.localFile.publicURL} />
                    </div>
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="text-center">
          <Socials />
        </div>
        <div className="menu-icon md:hidden text-xl" onClick={mobileMenuHandler}>
          <AiOutlineMenu />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
