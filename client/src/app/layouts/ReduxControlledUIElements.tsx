import React, { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import Tooltip from "../components/common";

type Props = {
  children: JSX.Element | JSX.Element[] | ReactNode;
};

const ReduxControlledUIElements = ({ children }: Props) => {
  const tooltip = useAppSelector((state) => state.ui.tooltip);
  return (
    <>
      {tooltip && <Tooltip position={tooltip.position}>{tooltip.contents}</Tooltip>}
      {children}
    </>
  );
};

export default ReduxControlledUIElements;
