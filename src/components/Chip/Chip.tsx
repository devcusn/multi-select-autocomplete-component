import CloseIcon from "../../assets/icon-close.svg";

import classes from "./style.module.css";
import { ChipProps } from "./types";
const Chip: React.FunctionComponent<ChipProps> = ({ name, onClick }) => {
  return (
    <div className={classes.chip}>
      {name}
      <img
        onClick={onClick}
        className={classes.chip_close}
        width={12}
        height={12}
        src={CloseIcon}
      />
    </div>
  );
};
export default Chip;
