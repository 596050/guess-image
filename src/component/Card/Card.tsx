import React, { ReactNode } from "react";
import { Card as AntCard, CardProps as AntCardProps } from "antd";
import { TestProps } from "../../types/Test.types";

interface Props extends AntCardProps, TestProps {
  children: ReactNode;
}

const Card = ({ children, ...rest }: Props) => {
  return <AntCard {...rest}>{children}</AntCard>;
};

export default Card;
