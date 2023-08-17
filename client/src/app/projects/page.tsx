"use client";
import React, { useRef, useState, useEffect } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project, nullProject, projects } from "./projects";
import ProjectDetails from "./ProjectDetails";
import useScrollbarSize from "@/app/hooks/useScrollbarSize";
import useElementIsOverflowing from "@/app/hooks/useElementIsOverflowing";

function ProjectsPage() {
  const projectListRef = useRef<HTMLUListElement>(null);
  const isOverflowingAfterResize = useElementIsOverflowing(projectListRef.current);
  const scrollbarSize = useScrollbarSize();
  const [activeProject, setActiveProject] = useState<Project | null>(nullProject);
  const [listOverflowClass, setListOverflowClass] = useState();
  const [isOverflowing, setIsOverflowing] = useState(isOverflowingAfterResize);

  useEffect(() => {
    if (!projectListRef.current) setIsOverflowing(false);
    else if (projectListRef.current.clientHeight < projectListRef.current.scrollHeight) setIsOverflowing(true);
    else setIsOverflowing(false);
  });

  let projectDetails = <ProjectDetails project={nullProject} />;
  if (activeProject) projectDetails = <ProjectDetails project={activeProject} />;
  return (
    <section className="projects-page">
      <div className="page-content projects-page-content">
        <div className="projects-page__left-box">
          <div className="page-title-bar">
            <h2 className="page-title">Projects</h2>
          </div>
          <ul className={`project-list ${isOverflowing && "project-list-overflowing"}`} ref={projectListRef}>
            {Object.values(projects).map((project: Project) => (
              <ProjectListItem key={project.title} project={project} setActiveProject={setActiveProject} isActive={activeProject?.title === project.title} />
            ))}
          </ul>
        </div>
        <div className="projects-page__right-box">{projectDetails}</div>
      </div>
    </section>
  );
}

export default ProjectsPage;
