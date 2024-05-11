export type OptionType = {
  label: string;
  value: number;
  renderedItem: React.ReactElement;
};
export type MultiSelectAutoCompleteInputProps = {
  options: Array<OptionType>;
  onChangeInput: (param: string) => void;
  isLoading: boolean;
};
