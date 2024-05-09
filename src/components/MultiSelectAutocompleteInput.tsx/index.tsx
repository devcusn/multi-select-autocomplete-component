import React from "react";
import { MultiSelectAutoCompleteInputProps } from "./type";

import classes from "./style.module.css";
const MultiSelectAutoCompleteInput: React.FunctionComponent<
  MultiSelectAutoCompleteInputProps
> = ({ options }) => {
  return (
    <div>
      <div className={classes.input}>asdas</div>
      <div className={classes.options}>
        {options.map((o) => {
          return <div className={classes.option}>{o.renderedItem}</div>;
        })}
      </div>
    </div>
  );
};
export default MultiSelectAutoCompleteInput;
