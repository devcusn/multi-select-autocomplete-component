import React from "react";

import IconButton from "../IconButton";
import classes from "./style.module.css";
import SelectedOptions from "./SelectedOptions";
import ArrowDownIcon from "../../assets/arrow-down.svg";
import { MultiSelectInputAreaProps } from "./types";

const InputArea: React.FunctionComponent<MultiSelectInputAreaProps> = ({
  next,
  setNext,
  selectedOptions,
  selectOption,
  onChangeInputHandler,
  handleToggle,
}) => {
  const selectedOptionsKeyPressHandler: React.KeyboardEventHandler<
    HTMLDivElement
  > = (e) => {
    if (e.key === "ArrowRight") {
      setNext((prev) => prev + 1);
      const selectedEl = document.querySelectorAll<HTMLDivElement>(
        '[data-target="selected-option"]'
      )[next + 1];
      selectedEl.focus();
    } else if (e.key === "ArrowLeft") {
      setNext((prev) => prev - 1);
      const selectedEl = document.querySelectorAll<HTMLDivElement>(
        '[data-target="selected-option"]'
      )[next - 1];
      selectedEl.focus();
    }
  };
  return (
    <div className={classes.input_container}>
      <div
        onKeyUp={selectedOptionsKeyPressHandler}
        className={classes.selected_options}
      >
        <SelectedOptions
          selectedOptions={selectedOptions}
          selectOption={selectOption}
        />
        <input onChange={onChangeInputHandler} className={classes.input} />
      </div>
      <IconButton icon={ArrowDownIcon} onClick={handleToggle} />
    </div>
  );
};

export default InputArea;
