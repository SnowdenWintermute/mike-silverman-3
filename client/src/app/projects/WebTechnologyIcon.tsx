import React, { useState } from "react";
import CSSIcon from "../img/web-tech-logos/css-monochrome.svg";
import CSSIconColor from "../img/web-tech-logos/css-color.svg";
import CypressIcon from "../img/web-tech-logos/cypress-monochrome.svg";
import CypressIconColor from "../img/web-tech-logos/cypress-color.svg";
import DockerIcon from "../img/web-tech-logos/docker-monochrome.svg";
import DockerIconColor from "../img/web-tech-logos/docker-color.svg";
import HTMLIcon from "../img/web-tech-logos/html-5-monochrome.svg";
import HTMLIconColor from "../img/web-tech-logos/html-5-color.svg";
import JestIcon from "../img/web-tech-logos/jest-monochrome.svg";
import JestIconColor from "../img/web-tech-logos/jest-color.svg";
import JavaScriptIcon from "../img/web-tech-logos/js-monochrome.svg";
import JavaScriptIconColor from "../img/web-tech-logos/js-color.svg";
import MaterialUIIcon from "../img/web-tech-logos/material-ui-monochrome.svg";
import MaterialUIIconColor from "../img/web-tech-logos/material-ui-color.svg";
import NextJsIcon from "../img/web-tech-logos/next-js-monochrome.svg";
import NextJsIconColor from "../img/web-tech-logos/next-js-color.svg";
import NGINXIcon from "../img/web-tech-logos/nginx-monochrome.svg";
import NGINXIconColor from "../img/web-tech-logos/nginx-color.svg";
import NodeJsIcon from "../img/web-tech-logos/node-js-monochrome.svg";
import NodeJsIconColor from "../img/web-tech-logos/node-js-color.svg";
import PostgresIcon from "../img/web-tech-logos/postgres-monochrome.svg";
import PostgresIconColor from "../img/web-tech-logos/postgres-color.svg";
import ProtobufIcon from "../img/web-tech-logos/protobuf-monochrome.svg";
import ProtobufIconColor from "../img/web-tech-logos/protobuf-color.png";
import ReactIcon from "../img/web-tech-logos/react-monochrome.svg";
import ReactIconColor from "../img/web-tech-logos/react-color.svg";
import RedisIcon from "../img/web-tech-logos/redis-monochrome.svg";
import RedisIconColor from "../img/web-tech-logos/redis-color.svg";
import ReduxIcon from "../img/web-tech-logos/redux-monochrome.svg";
import ReduxIconColor from "../img/web-tech-logos/redux-color.svg";
import SCSSIcon from "../img/web-tech-logos/sass-monochrome.svg";
import SCSSIconColor from "../img/web-tech-logos/sass-color.svg";
import SocketIOIcon from "../img/web-tech-logos/socket-io-monochrome.svg";
import SocketIOIconColor from "../img/web-tech-logos/socket-io-color.svg";
import TypeScriptIcon from "../img/web-tech-logos/ts-monochrome.svg";
import TypeScriptIconColor from "../img/web-tech-logos/ts-color.svg";

export enum WebTechNames {
  css = "CSS3",
  cypress = "Cypress",
  docker = "Docker",
  html = "HTML 5",
  jest = "Jest",
  javascript = "JavaScript",
  materialUi = "Material UI",
  nextJs = "Next.js",
  nginx = "NGINX",
  nodeJs = "Node.js",
  postgres = "PostgreSQL",
  protobuf = "Protocol Buffers",
  react = "React",
  redis = "Redis",
  redux = "Redux",
  sass = "SCSS",
  socketIo = "Socket.IO",
  typescript = "TypeScript",
}

const WebTechnologyIcon = ({
  name,
  styles,
  monochromeStyles,
  setDisplayedTechnologyName,
}: {
  name: WebTechNames;
  styles?: string;
  monochromeStyles?: string;
  setDisplayedTechnologyName?: (name: string) => void;
}) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseOver = () => {
    setHovering(true);
    if (setDisplayedTechnologyName) setDisplayedTechnologyName(name);
  };
  const handleMouseOut = () => {
    setHovering(false);
    if (setDisplayedTechnologyName) setDisplayedTechnologyName("Technologies Used");
  };

  const handleMouseLeave = () => {
    handleMouseOut();
  };

  const iconsByName = {
    [WebTechNames.css]: <CSSIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.cypress]: <CypressIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.docker]: <DockerIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.html]: <HTMLIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.jest]: <JestIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.javascript]: <JavaScriptIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.materialUi]: <MaterialUIIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.nextJs]: <NextJsIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.nginx]: <NGINXIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.nodeJs]: <NodeJsIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.postgres]: <PostgresIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.protobuf]: <ProtobufIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.react]: <ReactIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.redis]: <RedisIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.redux]: <ReduxIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.sass]: <SCSSIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.socketIo]: <SocketIOIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.typescript]: <TypeScriptIcon className={`${styles}  ${monochromeStyles}`} />,
  };
  const colorIconsByName = {
    [WebTechNames.css]: <CSSIconColor className={`${styles}`} />,
    [WebTechNames.cypress]: <CypressIconColor className={`${styles}`} />,
    [WebTechNames.docker]: <DockerIconColor className={`${styles}`} />,
    [WebTechNames.html]: <HTMLIconColor className={`${styles}`} />,
    [WebTechNames.jest]: <JestIconColor className={`${styles}`} />,
    [WebTechNames.javascript]: <JavaScriptIconColor className={`${styles}`} />,
    [WebTechNames.materialUi]: <MaterialUIIconColor className={`${styles}`} />,
    [WebTechNames.nextJs]: <NextJsIconColor className={`${styles}`} />,
    [WebTechNames.nginx]: <NGINXIconColor className={`${styles}`} />,
    [WebTechNames.nodeJs]: <NodeJsIconColor className={`${styles}`} />,
    [WebTechNames.postgres]: <PostgresIconColor className={`${styles}`} />,
    [WebTechNames.protobuf]: (
      <img
        src="../img/web-tech-logos/protobuff-color.png"
        className={`${styles}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseLeave={handleMouseLeave}
      />
    ),
    [WebTechNames.react]: <ReactIconColor className={`${styles}`} />,
    [WebTechNames.redis]: <RedisIconColor className={`${styles}`} />,
    [WebTechNames.redux]: <ReduxIconColor className={`${styles}`} />,
    [WebTechNames.sass]: <SCSSIconColor className={`${styles}`} />,
    [WebTechNames.socketIo]: <SocketIOIconColor className={`${styles}`} />,
    [WebTechNames.typescript]: <TypeScriptIconColor className={`${styles}`} />,
  };
  const icon = hovering ? colorIconsByName[name] : iconsByName[name];
  return (
    <div className="web-tech-icon__container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onMouseLeave={handleMouseLeave}>
      {icon}
    </div>
  );
};

export default WebTechnologyIcon;
