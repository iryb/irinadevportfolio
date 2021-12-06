import React from "react"

export default function CategoriesList (props) {
  return (
    <ul className="cat-list flex flex-wrap justify-center m-0 py-1 absolute bottom-0 right-0 bg-primary text-white w-full text-sm rounded-b-3xl z-10">
      {props.list.map( (tech, index) => {
        return tech.technologyFields ? 
          <li 
            key={tech.id}
            className="cat mb-0 px-1 inline-block text-center" 
            data-category={tech.slug}
            >
            {tech.name}
          </li>
        :
          <li 
            key={tech.id}
            className="cat mb-0 px-1 inline-block text-center" 
            data-category={tech.slug}>
            {tech.name}
          </li>;
      })}
    </ul>
  );
}