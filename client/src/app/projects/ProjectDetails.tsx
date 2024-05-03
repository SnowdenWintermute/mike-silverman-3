import React, { useState } from "react";
import { Project, nullProject } from "./projects";
import GitHubIcon from "../../app/img/ui/github-icon.svg";
import WebLinkIcon from "../../app/img/ui/internet-icon.svg";
import FullScreenImageViewer from "../components/FullScreenImageViewer";
import Link from "next/link";
import WebTechnologyIcon, { WebTechCategories, getTechnologiesInCategory } from "../components/WebTechnologyIcon";
import TooltippedComponent from "../components/common/TooltippedComponent";

export default function ProjectDetails({ project, includeMobileImage }: { project: Project; includeMobileImage?: boolean }) {
  const [fullScreenImageURI, setFullScreenImageURI] = useState("");
  return (
    <>
      {" "}
      <div className="project-details__tagline-with-project-links">
        <div className="project-details__tagline">
          <div>{project.tagline}</div>
          <div className="project-details__dates">
            {project.dateStarted ? `${new Date(project.dateStarted).toLocaleString("en-US", { year: "numeric" })}` : ""}
            {project.dateRetired && new Date(project.dateStarted).getFullYear() !== new Date(project.dateRetired).getFullYear()
              ? ` to ${new Date(project.dateRetired).toLocaleString("en-US", { year: "numeric" })}`
              : ""}
          </div>
        </div>
        <span className="project-links">
          {project.github && (
            <>
              <Link href={project.github} className="project-link-button">
                View Code
              </Link>
              <Link href={project.github} className="project-link-icon-container">
                <TooltippedComponent tooltipText="view code">
                  <GitHubIcon className="project-link-icon" />
                </TooltippedComponent>
              </Link>
            </>
          )}
          {project.url && (
            <>
              <Link href={project.url} className="project-link-button project-link-button--accent">
                Visit
              </Link>
              <Link href={project.url} className="project-link-icon-container">
                <TooltippedComponent tooltipText="visit">
                  <WebLinkIcon className="project-link-icon" />
                </TooltippedComponent>
              </Link>
            </>
          )}
        </span>
      </div>
      {project.embeded_video && (
          <div>
            <video controls style={{maxWidth:"750px", width:"100%"}}>
            <source src={project.embeded_video} type="video/mp4" />
              <a href={project.embeded_video}>MP4</a>
            </video>
          </div>
      )}
      <div className="project-details__images">
        {project.image && (
          <div className="project-details__image-container">
            <img src={project.image} alt="" aria-hidden={true} onClick={() => setFullScreenImageURI(project.image!)} />
          </div>
        )}
        {project.mobileImage && includeMobileImage && (
          <div className="project-details__image-container">
            <img src={project.mobileImage} alt="" aria-hidden={true} onClick={() => setFullScreenImageURI(project.mobileImage || "")} />
          </div>
        )}
      </div>
      {project.youtube_video && (
        <iframe
          // width="560"
          // height="315"
          className="project-details__video-iframe"
          src="https://www.youtube-nocookie.com/embed/mBAn0_6rcZU?si=2h3TUa2Y3qAbLM6X"
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
        ></iframe>
      )}
      {project.title == nullProject.title && 
        <p style={{marginBottom:".25rem"}}>🛈 Hover a technology icon to see the name</p>}
      {project.title !== nullProject.title &&
        <h3 className="project-details__technologies-name">Built with</h3>
      }
      {project.title == nullProject.title && (
        <ul key="technology icons" style={{listStyle: "none"}}>
           {Object.entries(WebTechCategories).map(( [ key, value ] ) => 
           <li>
             <p style={{fontSize: "1.25rem", marginBottom: ".25rem"}}>
               {value}
             </p>
             <ul style={{display: "flex", listStyle: "none"}}>
             {Object.entries(getTechnologiesInCategory(value)).map(([ key, value ]) => 
              <li style={{marginRight: ".25rem"}}>
                <WebTechnologyIcon
                  key={value}
                  name={value}
                  styles="web-tech-icon"
                  monochromeStyles="web-tech-icon--monochrome"
                  colorStyles="web-tech-icon--color"
                />
              </li>
               )}
              </ul>
           </li>)}
        </ul>
      )}
      {project.title != nullProject.title && project.technologies && (
        <div className="project-details__technology-icons-container" key="technology icons">
          {project.technologies.map((technology) => (
            <WebTechnologyIcon
              key={technology}
              name={technology}
              styles="web-tech-icon"
              monochromeStyles="web-tech-icon--monochrome"
              colorStyles="web-tech-icon--color"
            />
          ))}
        </div>
      )}
      {project.linesOfCode ? <p>{project.linesOfCode} lines of code</p> : ""}
      <div className="project-details__description">
        {project.description && project.description.map((item, idx) => React.cloneElement(item, { key: idx }))}
      </div>
      {fullScreenImageURI && (
        <FullScreenImageViewer key={"full screen image viewer"} image={fullScreenImageURI} closeViewer={() => setFullScreenImageURI("")} />
      )}
    </>
  );
}
