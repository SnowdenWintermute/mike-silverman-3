import React, { useState } from "react";
import { Project } from "./projects";
import FullScreenImageViewer from "./FullScreenImageViewer";
import GitHubIcon from "../../app/img/ui/github-icon.svg";
import WebLinkIcon from "../../app/img/ui/internet-icon.svg";

export const ProjectDetailsContent = ({ project }: { project: Project }) => {
  const [viewingFullscreenImage, setViewingFullscreenImage] = useState(false);
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
          <img
            src={project.image}
            alt=""
            aria-hidden={true}
            onClick={() => setViewingFullscreenImage(true)}
          />
        </div>
      )}
      {project.description && project.description}
      {viewingFullscreenImage && (
        <FullScreenImageViewer
          image={project.image}
          closeViewer={() => setViewingFullscreenImage(false)}
        />
      )}
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
