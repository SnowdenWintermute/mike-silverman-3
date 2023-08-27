import React, { useEffect, useRef, useState } from "react";
import { Project, nullProject } from "./projects";
import ArrowShape from "../../app/img/ui/arrow-button-icon.svg";
import ProjectDetails from "./ProjectDetails";

type Props = {
  project: Project;
  handleSelectProject: (project: Project, liRef: React.MutableRefObject<HTMLLIElement | null>) => void;
  isActive: boolean;
  nullProjectSelected: boolean;
};

const ProjectListItem = ({ project, handleSelectProject, isActive, nullProjectSelected }: Props) => {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const [expandedClass, setExpandedClass] = useState("");
  const [shouldShowDetails, setShouldShowDetails] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previouslyActive = useRef<boolean>(false);

  const handleClick = () => {
    if (isActive) handleSelectProject(nullProject, itemRef);
    else handleSelectProject(project, itemRef);
  };

  const { logo, title, tagline, url, github } = project;

  useEffect(() => {
    if (isActive) {
      clearTimeout(timeoutRef.current);
      setExpandedClass("project-list-li__details-container--expanded");
      setShouldShowDetails(true);
    } else {
      setExpandedClass("");

      clearTimeout(timeoutRef.current);
      if (!previouslyActive.current) setShouldShowDetails(false);
      else {
        timeoutRef.current = setTimeout(() => {
          setShouldShowDetails(false);
          // the 600ms should be the same as the css transition time for the parent class
          // to prevent the collapse from instantly happening with no animation
        }, 600);
      }
    }

    previouslyActive.current = isActive;
  }, [isActive]);

  return (
    <li ref={itemRef} className={`project-list-li ${!nullProjectSelected && "project-list-li--collapsed"}`}>
      <div
        onClick={handleClick}
        className={`project-list-li__main-bar ${isActive ? "project-list-li__main-bar--active" : ""} ${
          !nullProjectSelected && "project-list-li__main-bar--collapsed-left"
        } `}
      >
        <span className={`project-list-li__image-container ${!nullProjectSelected && "project-list-li__image-container--collapsed-left"}`}>
          <img src={logo} aria-hidden={true} />
        </span>
        <span className={`project-list-li__title ${!nullProjectSelected && "hidden-when-large-screen"}`}>{title}</span>
        <span className={`project-list-li__tagline ${!nullProjectSelected && "hidden-when-large-screen"}`}>{tagline}</span>
        <button className={`project-list-li__expand-button`}>
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
