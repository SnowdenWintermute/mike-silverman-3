import React, { useState } from "react";
import { Project } from "./projects";
import GitHubIcon from "../../app/img/ui/github-icon.svg";
import WebLinkIcon from "../../app/img/ui/internet-icon.svg";
import HoverOffsetZoomViewer from "../components/HoverZoomViewer";
import FullScreenImageViewer from "../components/FullScreenImageViewer";
import WebTechnologyIcon from "./WebTechnologyIcon";
import Link from "next/link";

export const ProjectDetailsContent = ({ project }: { project: Project }) => {
  const [viewingFullscreenImage, setViewingFullscreenImage] = useState(false);
  const [displayedTechnologyName, setDisplayedTechnologyName] = useState("Technologies Used");
  return (
    <>
      <div className="project-details__tagline-with-project-links">
        <p className="project-details__tagline">{project.tagline}</p>
        <span className="project-links">
          {project.github && (
            <Link href={project.github} className="project-link" key="git-link">
              <GitHubIcon className="project-link-icon" />
            </Link>
          )}
          {project.url && (
            <Link href={project.url} className="project-link" key="web-link">
              <WebLinkIcon className="project-link-icon" />
            </Link>
          )}
        </span>
      </div>
      {project.image && (
        <div className="project-details__image-container" key="project-image">
          <HoverOffsetZoomViewer image={project.image} handleClick={() => setViewingFullscreenImage(true)} />
          {
            // <img src={project.image} alt="" aria-hidden={true} onClick={() => setViewingFullscreenImage(true)} />
          }
        </div>
      )}
      <h3 className="project-details__technologies-name">Built with</h3>
      {project.technologies && (
        <div className="project-details__technology-icons-container" key="project-details-container">
          {project.technologies.map((technology) => (
            <WebTechnologyIcon
              key={technology}
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
          <Link href={project.url} className="page-title__url">
            {project.title}
          </Link>
        </h2>
      </div>
      <div className="project-details__content">
        <ProjectDetailsContent project={project} />
      </div>
    </>
  );
};

export default ProjectDetails;
