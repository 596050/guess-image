import React from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import { TestProps } from "../../types";

interface Props extends AntButtonProps, TestProps {}

const Button = ({ children, ...rest }: Props) => {
  return <AntButton {...rest}>{children}</AntButton>;
};

export default Button;
