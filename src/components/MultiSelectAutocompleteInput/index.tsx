import React, { useState } from "react";

import useToggle from "../../hooks/useToggle";
import classes from "./style.module.css";
import FilteredOptions from "./FilteredOptions";
import { MultiSelectAutoCompleteInputProps, OptionType } from "./types";
import InputArea from "./InputArea";

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

  const selectOption = (o: OptionType, cursor: boolean = false) => {
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

  return (
    <div className={classes.multiselect_autocomplete}>
      <InputArea
        next={next}
        setNext={setNext}
        selectedOptions={selectedOptions}
        selectOption={selectOption}
        onChangeInputHandler={onChangeInputHandler}
        handleToggle={handleToggle}
      />
      {toggle && (
        <FilteredOptions
          filteredOptions={filteredOptions}
          selectedOptions={selectedOptions}
          selectOption={selectOption}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MultiSelectAutoCompleteInput;
