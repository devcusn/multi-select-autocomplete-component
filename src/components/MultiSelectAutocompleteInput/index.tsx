import React, { useState } from "react";
import { MultiSelectAutoCompleteInputProps, OptionType } from "./type";
import ArrowDownIcon from "../../assets/arrow-down.svg";
import classes from "./style.module.css";
import Chip from "../Chip/Chip";
import IconButton from "../IconButton";
import useToggle from "../../hooks/useToggle";

const MultiSelectAutoCompleteInput: React.FunctionComponent<
  MultiSelectAutoCompleteInputProps
> = ({ options, onChangeInput, isLoading }) => {
  const [toggle, handleToggle] = useToggle(true);
  const [inputStr, setInputStr] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Array<OptionType>>([]);

  const onChangeInputHandler = (e) => {
    const value = e.target.value;

    onChangeInput(value);
    setInputStr(value);
  };

  const filteredOptions = options?.filter((str) =>
    str.label.toLowerCase().includes(inputStr.toLowerCase())
  );

  const selectOption = (o) => {
    const optionIndex = selectedOptions.findIndex((so) => so.value === o.value);
    if (optionIndex > -1) {
      setSelectedOptions((prev) => {
        prev.splice(optionIndex, 1);
        return [...prev];
      });
      return;
    }
    setSelectedOptions((prev) => {
      return [...prev, o];
    });
  };

  const isCheckedHandler = (value: number) => {
    return selectedOptions.findIndex((so) => so.value === value) > -1
      ? true
      : false;
  };

  return (
    <div className={classes.multiselect_autocomplete}>
      <div className={classes.input_container}>
        <div className={classes.selected_options}>
          {selectedOptions?.map((o) => {
            return (
              <Chip
                name={o.label}
                onClick={() => {
                  selectOption(o);
                }}
              />
            );
          })}
          <input onChange={onChangeInputHandler} className={classes.input} />
        </div>
        <IconButton icon={ArrowDownIcon} onClick={handleToggle} />
      </div>
      {toggle && (
        <div className={classes.options}>
          {isLoading && <div>Loading</div>}
          {filteredOptions ? (
            filteredOptions?.map((o) => {
              return (
                <div className={classes.option}>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        selectOption(o);
                      }
                    }}
                    checked={isCheckedHandler(o.value)}
                    onClick={() => selectOption(o)}
                    type="checkbox"
                  />
                  {o.renderedItem}
                </div>
              );
            })
          ) : (
            <div className={classes.not_found}>Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectAutoCompleteInput;
