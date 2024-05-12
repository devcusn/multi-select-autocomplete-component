import CloseIcon from "../../assets/icon-close.svg";

import classes from "./style.module.css";
import { ChipProps } from "./types";
const Chip: React.FunctionComponent<ChipProps> = ({ name, onClick }) => {
  return (
    <div
      onClick={() => onClick(true)}
      data-target="selected-option"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(false);
        }
      }}
      tabIndex={0}
      className={classes.chip}
    >
      {name}
      <img
        onClick={() => onClick(false)}
        className={classes.chip_close}
        width={12}
        height={12}
        src={CloseIcon}
      />
    </div>
  );
};
export default Chip;
