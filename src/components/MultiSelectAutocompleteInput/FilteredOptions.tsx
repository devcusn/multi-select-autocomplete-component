import { FilteredOptionsProps } from "./types";
import classes from "./style.module.css";

const FilteredOptions: React.FunctionComponent<FilteredOptionsProps> = ({
  filteredOptions,
  selectedOptions,
  selectOption,
}) => {
  const isCheckedHandler = (value: number) => {
    return selectedOptions.findIndex((so) => so.value === value) > -1
      ? true
      : false;
  };

  return filteredOptions?.map((o) => {
    return (
      <div className={classes.option}>
        <input
          data-target="select-option"
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
  });
};
export default FilteredOptions;
