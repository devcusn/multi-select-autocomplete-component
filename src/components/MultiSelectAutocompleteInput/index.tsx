import React, { useState } from "react";
import { MultiSelectAutoCompleteInputProps, OptionType } from "./types";
import ArrowDownIcon from "../../assets/arrow-down.svg";
import classes from "./style.module.css";
import IconButton from "../IconButton";
import useToggle from "../../hooks/useToggle";
import SelectedOptions from "./SelectedOptions";
import FilteredOptions from "./FilteredOptions";

const MultiSelectAutoCompleteInput: React.FunctionComponent<
  MultiSelectAutoCompleteInputProps
> = ({ options, onChangeInput, isLoading }) => {
  const [next, setNext] = useState(0);
  const [toggle, handleToggle] = useToggle(true);
  const [inputStr, setInputStr] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Array<OptionType>>([]);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChangeInput(value);
    setInputStr(value);
  };

  const filteredOptions = options?.filter((str) =>
    str.label.toLowerCase().includes(inputStr.toLowerCase())
  );

  const selectOption = (o: OptionType, cursor: boolean) => {
    const optionIndexInSelectedOptions = selectedOptions.findIndex(
      (so) => so.value === o.value
    );
    const optionIndexInOptions = filteredOptions.findIndex(
      (so) => so.value === o.value
    );
    setNext(cursor ? optionIndexInSelectedOptions : optionIndexInOptions);
    if (cursor) return;
    if (optionIndexInSelectedOptions > -1) {
      setSelectedOptions((prev) => {
        prev.splice(optionIndexInSelectedOptions, 1);
        return [...prev];
      });
      return;
    }

    setSelectedOptions((prev) => {
      return [...prev, o];
    });
  };

  const keyPressHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setNext((prev) => prev + 1);
      const selectedEl = document.querySelectorAll(
        '[data-target="select-option"]'
      )[next + 1];
      selectedEl.focus();
    } else if (e.key === "ArrowUp") {
      setNext((prev) => prev - 1);
      const selectedEl = document.querySelectorAll(
        '[data-target="select-option"]'
      )[next - 1];
      selectedEl.focus();
    }
  };

  const selectedOptionsKeyPressHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setNext((prev) => prev + 1);
      const selectedEl = document.querySelectorAll(
        '[data-target="selected-option"]'
      )[next + 1];
      selectedEl.focus();
    } else if (e.key === "ArrowLeft") {
      setNext((prev) => prev - 1);
      const selectedEl = document.querySelectorAll(
        '[data-target="selected-option"]'
      )[next - 1];
      selectedEl.focus();
    }
  };

  return (
    <div className={classes.multiselect_autocomplete}>
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
      {toggle && (
        <div onKeyUp={keyPressHandler} className={classes.options}>
          {isLoading && <div>Loading</div>}
          {filteredOptions && (
            <FilteredOptions
              filteredOptions={filteredOptions}
              selectedOptions={selectedOptions}
              selectOption={selectOption}
            />
          )}
          {!filteredOptions && (
            <div className={classes.not_found}>Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectAutoCompleteInput;
