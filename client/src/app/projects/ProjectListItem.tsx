import React, { RefObject, useRef, useState } from "react";
import { Project } from "./projects";
import ArrowShape from "../../app/img/ui/arrow-button-icon.svg";
import { ProjectDetailsContent } from "./ProjectDetails";

type Props = {
  project: Project;
  handleSelectProject: (project: Project | null, liRef: React.MutableRefObject<HTMLLIElement | null>) => void;
  isActive: boolean;
};

const ProjectListItem = ({ project, handleSelectProject, isActive }: Props) => {
  const itemRef = useRef<HTMLLIElement | null>(null);

  const handleClick = () => {
    if (isActive) handleSelectProject(null, itemRef);
    else handleSelectProject(project, itemRef);
  };

  const { logo, title, tagline, url, github } = project;

  return (
    <li ref={itemRef} className={`project-list-li ${isActive ? "project-list-li--expanded" : "project-list-li--collapsed"}`}>
      <div onClick={handleClick} className={`project-list-li__main-bar ${isActive ? "project-list-li__main-bar--active" : ""}`}>
        <span className="project-list-li__image-container">
          <img src={logo} aria-hidden={true} />
        </span>
        <span className="project-list-li__title">{title}</span>
        <span className="project-list-li__tagline">{tagline}</span>
        <button className="project-list-li__expand-button">
          <ArrowShape className={`project-list-li__expand-button-icon ${isActive && "project-list-li__expand-button-icon--expanded"}`} />
        </button>
      </div>
      <div className={`project-list-li__expanded-details ${isActive && "project-list-li__expanded-details--expanded"}`}>
        {isActive && <ProjectDetailsContent project={project} />}
      </div>
    </li>
  );
};

export default ProjectListItem;
