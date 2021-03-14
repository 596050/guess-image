import React from "react";
import {
  Radio as AntRadio,
  RadioGroupProps as AntRadioGroupProps,
  RadioProps as AntRadioProps,
} from "antd";

import { TestProps } from "../../types/Test.types";

export interface RadioGroupProps extends AntRadioGroupProps, TestProps {}

const RadioGroup = ({ children, ...rest }: RadioGroupProps) => {
  return <AntRadio.Group {...rest}>{children}</AntRadio.Group>;
};

export default RadioGroup;

export interface RadioProps extends AntRadioProps, TestProps {}

export const RadioButton = ({ children, ...rest }: RadioProps) => {
  return <AntRadio.Button {...rest}>{children}</AntRadio.Button>;
};
