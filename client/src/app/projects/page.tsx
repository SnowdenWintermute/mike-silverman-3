"use client";
import React, { useRef, useState, useEffect } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project, nullProject, projects } from "./projects";
import ProjectDetails from "./ProjectDetails";
import useElementIsOverflowing from "@/app/hooks/useElementIsOverflowing";
import NavbarLayout from "../layouts/Navbar";
import Link from "next/link";

function ProjectsPage() {
  const projectListRef = useRef<HTMLUListElement>(null);
  const selectedProjectLiRef = useRef<HTMLLIElement | null>(null);
  const isOverflowingAfterResize = useElementIsOverflowing(projectListRef.current);
  const [activeProject, setActiveProject] = useState<Project>(nullProject);
  const [isOverflowing, setIsOverflowing] = useState(isOverflowingAfterResize);

  useEffect(() => {
    if (!projectListRef.current) setIsOverflowing(false);
    else if (projectListRef.current.clientHeight < projectListRef.current.scrollHeight) setIsOverflowing(true);
    else setIsOverflowing(false);
  });

  let projectDetails = <ProjectDetails project={nullProject} />;
  if (activeProject) projectDetails = <ProjectDetails project={activeProject} />;

  const handleSelectProject = (project: Project, liRef: React.MutableRefObject<HTMLLIElement | null>) => {
    selectedProjectLiRef.current = liRef.current;
    setActiveProject(project);
  };

  useEffect(() => {
    // if (!selectedProjectLiRef.current || !projectListRef.current) return;
    // const projectListRect = projectListRef.current.getBoundingClientRect();
    // const liRect = selectedProjectLiRef.current.getBoundingClientRect();
    // const newScrollTop = projectListRef.current.scrollTop + liRect.top - projectListRect.top;
    // projectListRef.current.scrollTop = newScrollTop;
    // selectedProjectLiRef.current.scrollIntoView();
  }, [activeProject]);

  return (
    <NavbarLayout>
      <section className="projects-page">
        <div className="projects-page__left-box">
          <div className="page-title-bar">
            <h2 className="page-title">Projects</h2>
          </div>
          <ul className={`project-list ${isOverflowing && "project-list-overflowing"}`} ref={projectListRef}>
            {Object.values(projects).map((project) => (
              <ProjectListItem
                key={project.title}
                project={project}
                handleSelectProject={handleSelectProject}
                isActive={activeProject?.title === project.title}
              />
            ))}
          </ul>
        </div>
        {/*-----------------------------------*/}
        {/*-----------------------------------*/}
        <div className="projects-page-right-box">
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
