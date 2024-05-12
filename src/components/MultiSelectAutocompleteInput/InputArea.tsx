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
      const selectedElements = document.querySelectorAll<HTMLDivElement>(
        '[data-target="selected-option"]'
      );
      const selectedEl = selectedElements[next];
      setNext((prev) => {
        const selectedElArr = Array.from(selectedElements).length;
        if (prev === selectedElArr - 1) {
          return prev;
        }
        return prev + 1;
      });

      selectedEl.focus();
    } else if (e.key === "ArrowLeft") {
      setNext((prev) => {
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
      const selectedEl = document.querySelectorAll<HTMLDivElement>(
        '[data-target="selected-option"]'
      )[next];
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
