import Chip from "../Chip/Chip";
import { SelectedOptionsProps } from "./types";

const SelectedOptions: React.FunctionComponent<SelectedOptionsProps> = ({
  selectedOptions,
  selectOption,
}) => {
  return selectedOptions?.map((o) => {
    return (
      <Chip
        name={o.label}
        onClick={() => {
          selectOption(o, true);
        }}
      />
    );
  });
};
export default SelectedOptions;
