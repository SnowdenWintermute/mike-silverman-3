import React, { useState } from "react";
import { Project } from "./projects";
import GitHubIcon from "../../app/img/ui/github-icon.svg";
import WebLinkIcon from "../../app/img/ui/internet-icon.svg";
import FullScreenImageViewer from "../components/FullScreenImageViewer";
import Link from "next/link";
import WebTechnologyIcon from "../components/WebTechnologyIcon";

export default function ProjectDetails({ project }: { project: Project }) {
  const [viewingFullscreenImage, setViewingFullscreenImage] = useState(false);
  return (
    <>
      {" "}
      <div className="project-details__tagline-with-project-links">
        <p className="project-details__tagline">{project.tagline}</p>
        <span className="project-links">
          {project.github && (
            <Link href={project.github} className="project-link" key="git-link">
              <GitHubIcon className="project-link-icon" />
            </Link>
          )}
          {project.url && (
            <Link href={project.url} className="project-link" key="web-link">
              <WebLinkIcon className="project-link-icon" />
            </Link>
          )}
        </span>
      </div>
      {project.image && (
        <div className="project-details__image-container" key="project-image">
          <img src={project.image} alt="" aria-hidden={true} onClick={() => setViewingFullscreenImage(true)} />
        </div>
      )}
      <h3 className="project-details__technologies-name">Built with</h3>
      {project.technologies && (
        <div className="project-details__technology-icons-container" key="technology icons">
          {project.technologies.map((technology) => (
            <WebTechnologyIcon
              key={technology}
              name={technology}
              styles="web-tech-icon"
              monochromeStyles="web-tech-icon--monochrome"
              colorStyles="web-tech-icon--color"
            />
          ))}
        </div>
      )}
      <div className="project-details__description">
        {project.description && project.description.map((item, idx) => React.cloneElement(item, { key: idx }))}
      </div>
      {viewingFullscreenImage && (
        <FullScreenImageViewer key={"full screen image viewer"} image={project.image} closeViewer={() => setViewingFullscreenImage(false)} />
      )}
    </>
  );
}
