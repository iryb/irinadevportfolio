import React, { useState, useEffect, useRef }  from "react"
import ProjectPreview from "../components/projectPreview"
import { useStaticQuery, graphql } from "gatsby"

export default function LatestProjects () {

  const data = useStaticQuery(graphql`
    query LatestProjectsQuery {
      wpPage(isFrontPage: {eq: true}) {
        id
        title
        homeFields {
          showProjects {
            ... on WpProject {
              id
            }
          }
        }
      }
    }
  `)

  const [activeSlideIndex, setIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [transformLength, setTransformLength] = useState(0);
  const [direction, setDirection] = useState(1);
  const slider = useRef();

  useEffect(() => {
    setSliderWidth(slider.current.offsetWidth);
    setSlideWidth(slider.current.offsetWidth/3);
  }, []);

  let slidesLength = data.wpPage.homeFields.showProjects.length;
  let slideSize = document.getElementsByClassName('slide');
  let slides= data.wpPage.homeFields.showProjects;
  let clones = [];
  let allowShift = true;
  let posInitial = 100;
  let posFinal = 100;
  let items = document.getElementById('slides');


  function renderPrevSlide() {
    return <ProjectPreview 
    key={slides[slidesLength-1].id} 
    id={slides[slidesLength-1].id} 
    class=" slide" 
    index="-1"
    width={ slideWidth }
    ></ProjectPreview>;
  }

  function shiftSlide(dir) {
    // items.classList.add('shifting');

    console.log('shift=' + dir.target);
  
    // if (dir === 1) {
    //   console.log('func2')
    //   setTransformLength( prev => prev - (sliderWidth/3) );
    //   setIndex(activeSlideIndex + 1);    
    //   console.log('transformLength=' +transformLength)  
    // } 
    
  //  allowShift = false;
  }

  return (
    <section className="section latest-projects">
      <div className="container">
        <h2 className="section-title">Latest Projects</h2>
        <div className="projects-slider mx-auto relative" ref={slider}>
          <div className="projects-slider-wrapper" id="slides"
          style={{
            'transform' : `translateX(${transformLength + "px"})`
          }}
          >
            {renderPrevSlide()}
            {slides.map( (post, index) => {
              return <ProjectPreview 
              key={post.id} 
              id={post.id} 
              class={(index===activeSlideIndex ? "active " : "") + " slide"} 
              index={index}
              width={ slideWidth }
              ></ProjectPreview>
            })}
          </div>
        </div>
        <button onClick={() => shiftSlide(1)} data-dir="ff">Prev</button>
        <button onClick={shiftSlide}>Next {activeSlideIndex}</button>
        
      </div>
    </section>
  )
}