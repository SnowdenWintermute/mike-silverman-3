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
  const [expandedClass, setExpandedClass] = useState("");
  const [shouldShowDetails, setShouldShowDetails] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleClick = () => {
    if (isActive) handleSelectProject(nullProject, itemRef);
    else handleSelectProject(project, itemRef);
  };

  const { logo, title, tagline, url, github } = project;

  useEffect(() => {
    if (isActive) {
      setExpandedClass("project-list-li__details-container--expanded");
      setShouldShowDetails(true);
    } else {
      setExpandedClass("");
      timeoutRef.current = setTimeout(() => {
        setShouldShowDetails(false);
        // the 600ms should be the same as the css transition time for the parent class
        // to prevent the collapse from instantly happening with no animation
      }, 600);
    }
  }, [isActive]);

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
      <div className={`project-list-li__details-container ${expandedClass}`}>
        {shouldShowDetails && (
          <div className={`project-list-li__expanded-details`}>
            <ProjectDetails project={project} />
          </div>
        )}
      </div>
    </li>
  );
};

export default ProjectListItem;
