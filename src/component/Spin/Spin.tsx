import React from "react";
import { Spin as AntSpin, SpinProps as AntSpinProps } from "antd";

interface Props extends AntSpinProps {}

const Spin = ({ ...rest }: Props) => {
  return <AntSpin {...rest} />;
};

export default Spin;
