import searchStyles from "./SearchBox.module.css";

interface SearchInputProps {
  currentValue: string;
  onTextChange: (searchText: string) => void;
}

export const NotesSearchInput = ({
  currentValue,
  onTextChange,
}: SearchInputProps) => {
  return (
    <input
      className={searchStyles.input}
      type="text"
      placeholder="Search notes"
      onChange={(changeEvent) => onTextChange(changeEvent.target.value)}
      value={currentValue}
    />
  );
};
