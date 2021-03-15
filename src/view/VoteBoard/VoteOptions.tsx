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

const Column = ({ value, index }: { value: string; index: number }) => {
  const title = value
    ?.toLocaleLowerCase()
    .charAt(0)
    ?.toUpperCase()
    .concat(value.slice(1));

  return (
    <RadioButton value={value}>
      <div data-testid={`vote-radio-button-${index}`}>{title}</div>
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
            acc[acc.length - 1].push(<Column value={value} index={index} />);
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
      data-testid="vote-radio-group"
      onChange={handleChange}
      value={currentValue}
    >
      <Spacer data-testid="voteboard-options" direction="vertical">
        {votingOptions}
      </Spacer>
    </RadioGroup>
  );
};

export default VoteOptions;
