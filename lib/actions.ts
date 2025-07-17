const tags = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
] as const;

export type Tag = (typeof tags)[number];

export default tags;
