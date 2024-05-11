import React, { useState } from "react";
import { MultiSelectAutoCompleteInputProps } from "./type";
import CloseIcon from "../../assets/icon-close.svg";
import classes from "./style.module.css";
const MultiSelectAutoCompleteInput: React.FunctionComponent<
  MultiSelectAutoCompleteInputProps
> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputStr, setInputStr] = useState("");
  const onChangeInput = (e) => {
    const value = e.target.value;
    setInputStr(value);
  };
  const filteredOptions = options.filter((str) =>
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

  return (
    <div className={classes.multiselect_autocomplete}>
      <div className={classes.input_container}>
        <div className={classes.selected_options}>
          {selectedOptions.map((o) => {
            return (
              <div className={classes.chip}>
                {o.label}
                <img
                  onClick={() => {
                    selectOption(o);
                  }}
                  className={classes.chip_close}
                  width={12}
                  height={12}
                  src={CloseIcon}
                />
              </div>
            );
          })}
          <input onChange={onChangeInput} className={classes.input} />
        </div>
      </div>
      <div className={classes.options}>
        {filteredOptions.map((o) => {
          return (
            <div className={classes.option}>
              <button onClick={() => selectOption(o)}>check</button>
              {o.renderedItem}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MultiSelectAutoCompleteInput;
