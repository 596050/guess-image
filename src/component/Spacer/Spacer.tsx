import React, { ReactNode } from "react";
import { Space as AntSpace, SpaceProps as AntSpaceProps } from "antd";

interface Props extends AntSpaceProps {
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
