import React, { useState } from "react";
import { Project } from "./projects";
import GitHubIcon from "../../app/img/ui/github-icon.svg";
import WebLinkIcon from "../../app/img/ui/internet-icon.svg";
import HoverOffsetZoomViewer from "../components/HoverZoomViewer";
import FullScreenImageViewer from "../components/FullScreenImageViewer";
import WebTechnologyIcon from "./WebTechnologyIcon";

export const ProjectDetailsContent = ({ project }: { project: Project }) => {
  const [viewingFullscreenImage, setViewingFullscreenImage] = useState(false);
  const [displayedTechnologyName, setDisplayedTechnologyName] = useState("Technologies Used");
  return (
    <>
      <div className="project-details__tagline-with-project-links">
        <p className="project-details__tagline">{project.tagline}</p>
        <span className="project-links">
          {project.github && (
            <a href={project.github} className="project-link">
              <GitHubIcon className="project-link-icon" />
            </a>
          )}
          {project.url && (
            <a href={project.url} className="project-link">
              <WebLinkIcon className="project-link-icon" />
            </a>
          )}
        </span>
      </div>
      {project.image && (
        <div className="project-details__image-container">
          <HoverOffsetZoomViewer image={project.image} handleClick={() => setViewingFullscreenImage(true)} />
          {
            // <img src={project.image} alt="" aria-hidden={true} onClick={() => setViewingFullscreenImage(true)} />
          }
        </div>
      )}
      <h3 className="project-details__technologies-name">{displayedTechnologyName}</h3>
      {project.technologies && (
        <div className="project-details__technology-icons-container">
          {project.technologies.map((technology) => (
            <WebTechnologyIcon
              name={technology}
              styles="web-tech-icon"
              monochromeStyles="web-tech-icon--monochrome"
              colorStyles="web-tech-icon--color"
              setDisplayedTechnologyName={setDisplayedTechnologyName}
            />
          ))}
        </div>
      )}
      <div className="project-details__description">{project.description && project.description}</div>
      {viewingFullscreenImage && <FullScreenImageViewer image={project.image} closeViewer={() => setViewingFullscreenImage(false)} />}
    </>
  );
};

const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <>
      <div className="project-details__title-bar">
        <h2 className="page-title">
          <a href={project.url} className="page-title__url">
            {project.title}
          </a>
        </h2>
      </div>
      <div className="project-details__content">
        <ProjectDetailsContent project={project} />
      </div>
    </>
  );
};

export default ProjectDetails;
