import React, { useState } from "react";
import { Project } from "./projects";
import FullScreenImageViewer from "./FullScreenImageViewer";

export const ProjectDetailsContent = ({ project }: { project: Project }) => {
  const [viewingFullscreenImage, setViewingFullscreenImage] = useState(false);
  return (
    <>
      <p className="project-details__tagline">{project.tagline}</p>
      <div className="project-details__image-container">
        <img src={project.image} alt="" aria-hidden={true} onClick={() => setViewingFullscreenImage(true)} />
      </div>
      {viewingFullscreenImage && <FullScreenImageViewer image={project.image} closeViewer={() => setViewingFullscreenImage(false)} />}
    </>
  );
};

const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <>
      <div className="project-details__title-bar">
        <h2 className="page-title">
          <a href={project.url} target="_blank" className="page-title__url">
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
