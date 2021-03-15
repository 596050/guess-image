import React, { ReactNode } from "react";
import { Space as AntSpace, SpaceProps as AntSpaceProps } from "antd";
import { TestProps } from "../../types";

interface Props extends AntSpaceProps, TestProps {
  children?: ReactNode;
}

const Spacer = ({ children, ...rest }: Props) => {
  return (
    <AntSpace direction="vertical" {...rest}>
      {children}
    </AntSpace>
  );
};

export default Spacer;
