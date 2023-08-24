"use-client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { ReactNode } from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className={pathname === "/" ? "nav-link-current-page" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/projects" className={pathname === "/projects" ? "nav-link-current-page" : ""}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const NavbarLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NavbarLayout;
