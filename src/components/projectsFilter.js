import React, { useState, useEffect, useLayoutEffect, useRef }  from "react"
import ProjectPreview from "../components/projectPreview"
import { useStaticQuery, graphql } from "gatsby"
import { IoMdArrowDropdown } from "react-icons/io"

export default function ProjectsFilter () {
  const data = useStaticQuery(graphql`
  query ProjectsFilterQuery {
    wpPage(isFrontPage: {eq: true}) {
      id
      title
      homeFields {
        projectsTitle
        showProjects {
          ... on WpProject {
            id
            technologies {
              nodes {
                id
                name
                slug
                technologyFields {
                  color
                }
              }
            }
          }
        }
      }
    }
    allWpTechnology(filter: {count: {gt: 0}}) {
      nodes {
        id
        slug
        name
        technologyFields {
          color
        }
      }
    }
  }
`)
let projects = data.wpPage.homeFields.showProjects;
let filters = data.allWpTechnology.nodes;
let projectsTitle = data.wpPage.homeFields.projectsTitle;

let initFilter = localStorage.getItem('activeFilter') ? localStorage.getItem('activeFilter') : 'all';
const [activeFilter, setFilter] = useState(initFilter);
// console.log(localStorage.getItem('activeFilter'));
// console.log(typeof filters[0].slug)

// useEffect(() => console.log('r'));

const fitlersContainerRef = useRef();
const filtersRef = useRef();
const fitlersPlaceholderRef = useRef();
const [isActiveList, setIsActiveList] = useState(false);
const [dropdownHeight, setDropdownHeight] = useState();

function handleListClick(e) {
  e.preventDefault();
  if(window.innerWidth > 900) {
    setDropdownHeight('auto')
    return;
  }
  let listHeight = filtersRef.current.offsetHeight;
  setDropdownHeight(listHeight + 'px')
  setIsActiveList(!isActiveList)

  
  console.log('dropdownHeight=' + dropdownHeight)
  
  
  //fitlersContainerRef.current.style.height = listHeight + 'px';
  console.log(fitlersContainerRef.current.style.height)

  if(!e.target.classList.contains('filters-placeholder')) {
    console.log(fitlersPlaceholderRef.current.textContent)
    fitlersPlaceholderRef.current.textContent = e.target.textContent;
    setDropdownHeight('34px')
  }
}

useEffect(()=> {
  if(window.innerWidth > 900) {
    setDropdownHeight('auto')
  } else {
    setDropdownHeight('34px')
  }
}, [])

return (
  <section className="section projects" id="projects">
    <h2 className="section-title">{projectsTitle}</h2>
    <div className={(isActiveList ? "active " : "") + "filters-container"} 
      style={{"height" : dropdownHeight }} 
      ref={fitlersContainerRef} 
      onClick={handleListClick}>
      <ul className="filters ml-0 flex flex-wrap md:space-x-4" ref={filtersRef}>
        <li className="filter filters-placeholder md:hidden">
          <span ref={fitlersPlaceholderRef}>Please choose a filter</span>
          <IoMdArrowDropdown />
        </li>
        <li 
        className={"filter" + ('all' === localStorage.getItem('activeFilter') ? " active" : "")}
        data-filter="all"
        onClick={() => {
          setFilter('all');
          localStorage.setItem( 'activeFilter', 'all');
        }}>
          All 
        </li>
        { filters.map( tech => {
          return <li 
          className={"filter" + (tech.slug == localStorage.getItem('activeFilter') ? " active" : "")}
          key={tech.id} 
          data-filter={tech.slug}
          onClick={() => {
            setFilter(tech.slug);
            localStorage.setItem( 'activeFilter', tech.slug);
          }}
          >
            {tech.name}
          </li>
        })}
      </ul>
    </div>
    <div className="projects-container flex flex-wrap">
      {projects.map( (post, index) => {
        let techs = post.technologies.nodes;
        let isActiveProject = '';
        let projectFilters = techs.map( tech => {
          if( Object.values(tech).indexOf(localStorage.getItem('activeFilter')) > -1 ) {
            isActiveProject = 'active';
          }
          if(localStorage.getItem('activeFilter') === 'all') {
            isActiveProject = 'active';
          }
          return tech.slug;
        })
        let projectFiltersClass = JSON.stringify(projectFilters).replace(/[,"[\]]+/g, ' ');
        
        return <ProjectPreview 
        key={post.id} 
        id={post.id}
        index={index}
        filter={projectFiltersClass}
        techs={techs}
        class={isActiveProject + " w-full md:w-1/2 lg:w-1/3"}
        ></ProjectPreview>
      })}
    </div>
  </section>
);
}