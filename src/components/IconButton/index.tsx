import { IconButtonProps } from "./types";
import classes from "./styled.module.css";
const IconButton: React.FunctionComponent<IconButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <button className={classes.icon_button} onClick={onClick}>
      <img src={icon} width={18} height={18} />
    </button>
  );
};
export default IconButton;
