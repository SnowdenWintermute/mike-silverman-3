"use client";
import React, { useRef, useState } from "react";
import CanvasIcon from "../../img/web-tech-logos/canvas-monochrome.svg";
import CanvasIconColor from "../../img/web-tech-logos/canvas-color.svg";
import CSSIcon from "../../img/web-tech-logos/css-monochrome.svg";
import CSSIconColor from "../../img/web-tech-logos/css-color.svg";
import CypressIcon from "../../img/web-tech-logos/cypress-monochrome.svg";
import CypressIconColor from "../../img/web-tech-logos/cypress-color.svg";
import DockerIcon from "../../img/web-tech-logos/docker-monochrome.svg";
import DockerIconColor from "../../img/web-tech-logos/docker-color.svg";
import HTMLIcon from "../../img/web-tech-logos/html-5-monochrome.svg";
import HTMLIconColor from "../../img/web-tech-logos/html-5-color.svg";
import JestIcon from "../../img/web-tech-logos/jest-monochrome.svg";
import JestIconColor from "../../img/web-tech-logos/jest-color.svg";
import JavaScriptIcon from "../../img/web-tech-logos/js-monochrome.svg";
import JavaScriptIconColor from "../../img/web-tech-logos/js-color.svg";
import KubernetesIcon from "../../img/web-tech-logos/kubernetes-monochrome.svg";
import KubernetesIconColor from "../../img/web-tech-logos/kubernetes-color.svg";
import MaterialUIIcon from "../../img/web-tech-logos/material-ui-monochrome.svg";
import MaterialUIIconColor from "../../img/web-tech-logos/material-ui-color.svg";
import MatterJsIcon from "../../img/web-tech-logos/matter-js-monochrome.svg";
import MatterJsIconColor from "../../img/web-tech-logos/matter-js-color.svg";
import MongoDBIcon from "../../img/web-tech-logos/mongo-db-monochrome.svg";
import MongoDBIconColor from "../../img/web-tech-logos/mongo-db-color.svg";
import NextJsIcon from "../../img/web-tech-logos/next-js-monochrome.svg";
import NextJsIconColor from "../../img/web-tech-logos/next-js-color.svg";
import NGINXIcon from "../../img/web-tech-logos/nginx-monochrome.svg";
import NGINXIconColor from "../../img/web-tech-logos/nginx-color.svg";
import NodeJsIcon from "../../img/web-tech-logos/node-js-monochrome.svg";
import NodeJsIconColor from "../../img/web-tech-logos/node-js-color.svg";
import PostgresIcon from "../../img/web-tech-logos/postgres-monochrome.svg";
import PostgresIconColor from "../../img/web-tech-logos/postgres-color.svg";
import ProtobufIcon from "../../img/web-tech-logos/protobuf-monochrome.svg";
import ProtobufIconColor from "../../img/web-tech-logos/protobuf-color.svg";
import ReactIcon from "../../img/web-tech-logos/react-monochrome.svg";
import ReactIconColor from "../../img/web-tech-logos/react-color.svg";
import RedisIcon from "../../img/web-tech-logos/redis-monochrome.svg";
import RedisIconColor from "../../img/web-tech-logos/redis-color.svg";
import ReduxIcon from "../../img/web-tech-logos/redux-monochrome.svg";
import ReduxIconColor from "../../img/web-tech-logos/redux-color.svg";
import SCSSIcon from "../../img/web-tech-logos/sass-monochrome.svg";
import SCSSIconColor from "../../img/web-tech-logos/sass-color.svg";
import SocketIOIcon from "../../img/web-tech-logos/socket-io-monochrome.svg";
import SocketIOIconColor from "../../img/web-tech-logos/socket-io-color.svg";
import TypeScriptIcon from "../../img/web-tech-logos/ts-monochrome.svg";
import TypeScriptIconColor from "../../img/web-tech-logos/ts-color.svg";
import WebsocketsIcon from "../../img/web-tech-logos/websockets-monochrome.svg";
import WebsocketsIconColor from "../../img/web-tech-logos/websockets-color.svg";

import { useAppDispatch } from "@/app/redux/hooks";
import { setTooltipContents } from "@/app/redux/slices/ui-slice";

export enum WebTechNames {
  canvas = "Canvas",
  css = "CSS3",
  cypress = "Cypress",
  docker = "Docker",
  html = "HTML 5",
  jest = "Jest",
  javascript = "JavaScript",
  kubernetes = "Kubernetes",
  materialUi = "Material UI",
  matterJs = "Matter.js",
  mongoDb = "Mongo.DB",
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
  websockets = "Websockets",
}

const WebTechnologyIcon = ({
  name,
  styles,
  monochromeStyles,
  colorStyles,
}: {
  name: WebTechNames;
  styles?: string;
  monochromeStyles?: string;
  colorStyles?: string;
}) => {
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [hovering, setHovering] = useState(false);
  const [colorIconStyle, setColorIconStyle] = useState(colorStyles);

  const handleMouseOver = () => {
    setHovering(true);
    if (!iconContainerRef.current) return;
    const clientRect = iconContainerRef.current.getBoundingClientRect();
    dispatch(setTooltipContents({ contents: name, position: { x: clientRect.x + clientRect.width / 2, y: clientRect.y } }));
  };

  const handleMouseLeave = () => {
    setHovering(false);
    dispatch(setTooltipContents(null));
  };

  const iconsByName = {
    [WebTechNames.canvas]: <CanvasIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.css]: <CSSIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.cypress]: <CypressIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.docker]: <DockerIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.html]: <HTMLIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.jest]: <JestIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.javascript]: <JavaScriptIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.kubernetes]: <KubernetesIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.materialUi]: <MaterialUIIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.matterJs]: <MatterJsIcon className={`${styles}  ${monochromeStyles}`} />,
    [WebTechNames.mongoDb]: <MongoDBIcon className={`${styles}  ${monochromeStyles}`} />,
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
    [WebTechNames.websockets]: <WebsocketsIcon className={`${styles}  ${monochromeStyles}`} />,
  };
  const colorIconsByName = {
    [WebTechNames.canvas]: <CanvasIconColor className={`${styles}  ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.css]: <CSSIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.cypress]: <CypressIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.docker]: <DockerIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.html]: <HTMLIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.jest]: <JestIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.javascript]: <JavaScriptIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.kubernetes]: <KubernetesIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.materialUi]: <MaterialUIIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.matterJs]: <MatterJsIconColor className={`${styles}  ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.mongoDb]: <MongoDBIconColor className={`${styles}  ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.nextJs]: <NextJsIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.nginx]: <NGINXIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.nodeJs]: <NodeJsIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.postgres]: <PostgresIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.protobuf]: <ProtobufIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.react]: <ReactIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.redis]: <RedisIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.redux]: <ReduxIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.sass]: <SCSSIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.socketIo]: <SocketIOIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.typescript]: <TypeScriptIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
    [WebTechNames.websockets]: <WebsocketsIconColor className={`${styles} ${colorIconStyle} ${hovering && "opacity-1"}`} />,
  };
  return (
    <div ref={iconContainerRef} className="web-tech-icon__container" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {colorIconsByName[name]}
      {iconsByName[name]}
    </div>
  );
};

export default WebTechnologyIcon;
