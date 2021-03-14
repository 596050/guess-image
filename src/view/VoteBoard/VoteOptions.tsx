import React, { useMemo } from "react";
import {
  RadioGroup,
  RadioButton,
  RadioGroupProps,
  Spacer,
} from "../../component";

type Props = {
  onChange: (v: string) => void;
  options: { value: string }[];
  currentValue?: string;
};

const Column = ({ value }: { value: string }) => {
  const title = value
    ?.toLocaleLowerCase()
    .charAt(0)
    ?.toUpperCase()
    .concat(value.slice(1));

  return (
    <RadioButton value={value} datatestid={`vote-radio-button-${value}`}>
      {title}
    </RadioButton>
  );
};

const COL_NUM = 4;

const VoteOptions = ({ onChange, options, currentValue }: Props) => {
  const handleChange: RadioGroupProps["onChange"] = (e) => {
    if (e?.target?.value) {
      onChange(e?.target?.value);
    }
  };

  const votingOptions = useMemo(
    () =>
      options
        // dynamically ensures there are COL_NUM to each row
        .reduce(
          (acc, { value }, index) => {
            acc[acc.length - 1].push(<Column value={value} />);
            if ((index + 1) % COL_NUM === 0) {
              acc.push([]);
            }
            return acc;
          },
          [[]] as JSX.Element[][]
        ),
    [options]
  );

  return (
    <RadioGroup
      datatestid="vote-radio-group"
      onChange={handleChange}
      value={currentValue}
    >
      <Spacer direction="vertical">{votingOptions}</Spacer>
    </RadioGroup>
  );
};

export default VoteOptions;
