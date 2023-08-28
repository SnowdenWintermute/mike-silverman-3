"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project, nullProject, projects } from "./projects";
import ProjectDetails from "./ProjectDetails";
import NavbarLayout from "../layouts/Navbar";
import Link from "next/link";
import ArrowShape from "../img/ui/arrow-button-icon.svg";

function ProjectsPage() {
  const projectListRef = useRef<HTMLUListElement>(null);
  const selectedProjectLiRef = useRef<HTMLLIElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [activeProject, setActiveProject] = useState<Project | null>(nullProject);

  let projectDetails = <ProjectDetails project={nullProject} />;
  if (activeProject) projectDetails = <ProjectDetails project={activeProject} />;

  const handleSelectProject = (project: Project, liRef?: React.MutableRefObject<HTMLLIElement | null>) => {
    if (liRef) selectedProjectLiRef.current = liRef.current;
    setActiveProject(null);
    setTimeout(() => {
      setActiveProject(project);
    }, 100);
  };

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (!projectListRef.current || !selectedProjectLiRef.current) return;
    timeoutRef.current = setTimeout(() => {
      if (!projectListRef.current || !selectedProjectLiRef.current) return;
      selectedProjectLiRef.current.scrollIntoView({ behavior: "smooth" });
      // this timeout is based on the animation of expanding the tab
    }, 650);
  }, [activeProject]);

  const projectSelected = activeProject?.title !== nullProject.title;

  return (
    <NavbarLayout>
      <section className="projects-page">
        <div className={`projects-page__left-box ${projectSelected && "projects-page__left-box--collapsed"}`}>
          <div className={`project-page-title-bar  ${projectSelected && `projects-page-title-bar--collapsed`}`}>
            <div className={`project-page-title-bar__content  ${projectSelected && `projects-page-title-bar--collapsed`}`}>
              <h2 className={`page-title ${projectSelected && `projects-page-page-title--collapsed`}`}>Projects</h2>
              <button
                className={`projects-page-unselect-project-button ${projectSelected && "projects-page-unselect-project-button--collapsed"}`}
                onClick={() => handleSelectProject(nullProject)}
              >
                <ArrowShape className="project-page-unselect-project-button__arrow-shape" />
              </button>
            </div>
          </div>
          <ul className={`project-list ${projectSelected && "project-list--collapsed"}`} ref={projectListRef}>
            {Object.values(projects).map((project) => (
              <ProjectListItem
                key={project.title}
                project={project}
                handleSelectProject={handleSelectProject}
                isActive={activeProject?.title === project.title}
                nullProjectSelected={activeProject?.title === nullProject.title}
              />
            ))}
          </ul>
        </div>
        {/*-----------------------------------*/}
        {/*-----------------------------------*/}
        <div className={`projects-page-right-box ${activeProject?.title !== nullProject.title && "projects-page-right-box--expanded-right"}`}>
          <div className="projects-page-right-box__title-bar">
            <h2 className="page-title">
              <Link href={activeProject?.url || "/"} className="page-title__url">
                {activeProject?.title}
              </Link>
            </h2>
          </div>
          <div className="projects-page-right-box__project-details-container">
            <div>{activeProject && <ProjectDetails project={activeProject} />}</div>
          </div>
        </div>
      </section>
    </NavbarLayout>
  );
}

export default ProjectsPage;
