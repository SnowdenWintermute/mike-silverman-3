import WebTechnologyIcon, { WebTechNames } from "@/app/projects/WebTechnologyIcon";
import { randIntBetween } from "@/app/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function index() {
  return (
    <section className="intro-page">
      <div className="intro-page__content">
        <h1 className="intro-page__title">Mike Silverman</h1>
        <h4>Full stack from Canvas to Kubernetes</h4>
        <span className="intro-page__sub-title">michael.p.silverman@gmail.com</span>
        <span className="intro-page__links">
          <Link href="/projects">Projects</Link>
          <Link href="https://github.com/SnowdenWintermute">GitHub</Link>
          <Link href="https://www.linkedin.com/in/michael-silverman-8a854610/">LinkedIn</Link>
        </span>
      </div>
    </section>
  );
}

export default index;
