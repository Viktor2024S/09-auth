import styles from "./SearchBox.module.css";

type Props = {
  value: string;
  onSearch: (text: string) => void;
};

export function SearchBox({ value, onSearch }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.currentTarget.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      aria-label="Search notes"
      placeholder="Search notes"
      onChange={handleInputChange}
      value={value}
    />
  );
}
