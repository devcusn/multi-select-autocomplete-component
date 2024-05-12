import { useState } from "react";

import { FilteredOptionsProps } from "./types";
import classes from "./style.module.css";

const FilteredOptions: React.FunctionComponent<FilteredOptionsProps> = ({
  filteredOptions,
  selectedOptions,
  selectOption,
  isLoading,
}) => {
  const [next, setNext] = useState(0);

  const isCheckedHandler = (value: number) => {
    return selectedOptions.findIndex((so) => so.value === value) > -1
      ? true
      : false;
  };

  const keyPressHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const selectedElements = document.querySelectorAll<HTMLDivElement>(
      '[data-target="select-option"]'
    );
    if (e.key === "ArrowDown") {
      setNext((prev) => {
        const selectedElArr = Array.from(selectedElements).length;
        if (prev === selectedElArr - 1) {
          return prev;
        }
        return prev + 1;
      });

      const selectedEl = selectedElements[next + 1];
      selectedEl.focus();
    } else if (e.key === "ArrowUp") {
      setNext((prev) => {
        console.log(prev);
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
      const selectedEl = selectedElements[next - 1];
      selectedEl.focus();
    }
  };

  return (
    <div onKeyUp={keyPressHandler} className={classes.options}>
      {isLoading && <div>Loading</div>}
      {filteredOptions?.map((o) => {
        return (
          <div className={classes.option}>
            <input
              data-target="select-option"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  selectOption(o, false);
                }
              }}
              checked={isCheckedHandler(o.value)}
              onClick={() => selectOption(o, false)}
              type="checkbox"
            />
            {o.renderedItem}
          </div>
        );
      })}
      {filteredOptions.length === 0 && !isLoading && (
        <div className={classes.not_found}>Not Found</div>
      )}
    </div>
  );
};
export default FilteredOptions;
