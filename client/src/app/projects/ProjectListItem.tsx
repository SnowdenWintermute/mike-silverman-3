import React, { useEffect, useRef, useState } from "react";
import { Project, nullProject } from "./projects";
import ArrowShape from "../../app/img/ui/arrow-button-icon.svg";
import ProjectDetails from "./ProjectDetails";

type Props = {
  project: Project;
  handleSelectProject: (project: Project, liRef: React.MutableRefObject<HTMLLIElement | null>) => void;
  isActive: boolean;
};

const ProjectListItem = ({ project, handleSelectProject, isActive }: Props) => {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [expandedClass, setExpandedClass] = useState("");
  const [expandedHeight, setExpandedHeight] = useState(0);

  const handleClick = () => {
    if (isActive) handleSelectProject(nullProject, itemRef);
    else handleSelectProject(project, itemRef);
  };

  const { logo, title, tagline, url, github } = project;

  useEffect(() => {
    if (!detailsRef.current) {
      setExpandedClass("");
      return;
    }
    setExpandedClass("project-list-li__details-container--expanded");
  }, [expandedHeight]);

  useEffect(() => {
    if (!detailsRef.current) {
      setExpandedHeight(0);
      return;
    }
    const detailsRect = detailsRef.current.getBoundingClientRect();
    console.log(detailsRef.current.clientHeight);
    // setExpandedHeight(detailsRect.height);
    setExpandedHeight(detailsRef.current.clientHeight);
  }, [isActive]);
  // const expandedClass = "project-list-li__details-container--expanded";

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
      <div className={`project-list-li__details-container ${expandedClass}`} style={{ height: `${expandedHeight}px` }}>
        {isActive && (
          <div ref={detailsRef} className={`project-list-li__expanded-details`}>
            <ProjectDetails project={project} />
          </div>
        )}
      </div>
    </li>
  );
};

export default ProjectListItem;
