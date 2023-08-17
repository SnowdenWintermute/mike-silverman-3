import React, { useState } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project, projects } from "./projects";
import ProjectDetails from "./ProjectDetails";

function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(projects.battleSchool);

  let projectDetails = <div>No project selected</div>;
  if (activeProject) projectDetails = <ProjectDetails project={activeProject} />;
  return (
    <section className="projects-page">
      <div className="projects-page__parallax-space-creator" />
      <div className="page-content projects-page-content">
        <div className="projects-page__left-box">
          <div className="page-title-bar">
            <h2 className="page-title">Projects</h2>
          </div>
          <ul className="project-list">
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
