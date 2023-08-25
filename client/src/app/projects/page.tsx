"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project, nullProject, projects } from "./projects";
import ProjectDetails from "./ProjectDetails";
import NavbarLayout from "../layouts/Navbar";
import Link from "next/link";

function ProjectsPage() {
  const projectListRef = useRef<HTMLUListElement>(null);
  const selectedProjectLiRef = useRef<HTMLLIElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [activeProject, setActiveProject] = useState<Project>(nullProject);
  // const [projectsPageLeftBoxCollapsedClass, setP]

  let projectDetails = <ProjectDetails project={nullProject} />;
  if (activeProject) projectDetails = <ProjectDetails project={activeProject} />;

  const handleSelectProject = (project: Project, liRef: React.MutableRefObject<HTMLLIElement | null>) => {
    selectedProjectLiRef.current = liRef.current;
    setActiveProject(project);
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

  return (
    <NavbarLayout>
      <section className="projects-page">
        <div className={`projects-page__left-box ${activeProject.title !== nullProject.title && "projects-page__left-box--collapsed"}`}>
          <div className="page-title-bar">
            <h2 className="page-title">Projects</h2>
          </div>
          <ul className={`project-list`} ref={projectListRef}>
            {Object.values(projects).map((project) => (
              <ProjectListItem
                key={project.title}
                project={project}
                handleSelectProject={handleSelectProject}
                isActive={activeProject?.title === project.title}
                nullProjectSelected={activeProject.title === nullProject.title}
              />
            ))}
          </ul>
        </div>
        {/*-----------------------------------*/}
        {/*-----------------------------------*/}
        <div className={`projects-page-right-box ${activeProject.title !== nullProject.title && "projects-page-right-box--expanded-right"}`}>
          <div className="projects-page-right-box__title-bar">
            <h2 className="page-title">
              <Link href={activeProject.url} className="page-title__url">
                {activeProject.title}
              </Link>
            </h2>
          </div>
          <div className="projects-page-right-box__project-details-container">
            <div>
              <ProjectDetails project={activeProject} />
            </div>
          </div>
        </div>
      </section>
    </NavbarLayout>
  );
}

export default ProjectsPage;
