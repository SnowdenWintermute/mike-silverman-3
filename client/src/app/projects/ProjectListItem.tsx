import React, { useRef, useState } from "react";
import { Project } from "./projects";
import ArrowShape from "../../app/img/ui/arrow-button-icon.svg";
import ProjectDetails, { ProjectDetailsContent } from "./ProjectDetails";

type Props = {
  project: Project;
  setActiveProject: (project: Project | null) => void;
  isActive: boolean;
};

const ProjectListItem = ({ project, setActiveProject, isActive }: Props) => {
  const handleClick = () => {
    if (isActive) setActiveProject(null);
    else setActiveProject(project);
  };
  const handleMouseOver = () => {};
  const handleMouseOut = () => {};

  const { logo, title, tagline, url, github } = project;

  return (
    <li
      className={`project-list-li ${
        isActive ? "project-list-li--expanded" : ""
      }`}
    >
      <div
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={`project-list-li__main-bar ${
          isActive ? "project-list-li__main-bar--active" : ""
        }`}
      >
        <span className="project-list-li__image-container">
          <img src={logo} aria-hidden={true} />
        </span>
        <span className="project-list-li__title">{title}</span>
        <span className="project-list-li__tagline">{tagline}</span>
        <button className="project-list-li__expand-button">
          <ArrowShape
            className={`project-list-li__expand-button-icon ${
              isActive && "project-list-li__expand-button-icon--expanded"
            }`}
          />
        </button>
      </div>
      <div
        className={`project-list-li__expanded-details ${
          isActive && "project-list-li__expanded-details--expanded"
        }`}
      >
        {<ProjectDetailsContent project={project} />}
      </div>
    </li>
  );
};

export default ProjectListItem;
