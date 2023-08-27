"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Snow from "../Snow/Snow";

function index() {
  const [percentScrolled, setPercentScrolled] = useState(1);

  const handleScroll = () => {
    const newPercentScrolled = 1 - window.scrollY / window.innerHeight;
    setPercentScrolled(newPercentScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window]);

  return (
    <section className="intro-page">
      {percentScrolled < 0.9 && <Snow percentScrolled={percentScrolled} />}
      <div className="intro-page__content">
        <h1 className="intro-page__title">Mike Silverman</h1>
        <h4>Full stack, from Canvas to Kubernetes</h4>
        <span className="intro-page__sub-title">michael.p.silverman@gmail.com</span>
        <span className="intro-page__links">
          <Link href="/projects">Portfolio</Link>
          <Link href="https://github.com/SnowdenWintermute">GitHub</Link>
          <Link href="https://www.linkedin.com/in/michael-silverman-8a854610/">LinkedIn</Link>
        </span>
      </div>
    </section>
  );
}

export default index;
