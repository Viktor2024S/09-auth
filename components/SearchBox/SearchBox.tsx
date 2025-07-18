import searchStyles from "./SearchBox.module.css";

interface SearchBoxProps {
  currentValue: string;
  onTextChange: (searchText: string) => void;
}

export default function SearchBox({
  currentValue,
  onTextChange,
}: SearchBoxProps) {
  return (
    <input
      className={searchStyles.input}
      type="text"
      placeholder="Search notes"
      onChange={(changeEvent) => onTextChange(changeEvent.target.value)}
      value={currentValue}
    />
  );
}
