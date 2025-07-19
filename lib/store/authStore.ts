import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNote } from "../../types/note";

type NoteDraftStore = {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};

const defaultDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (update) => ({
      draft: defaultDraft,

      setDraft: (newDraft) => update(() => ({ draft: newDraft })),

      clearDraft: () => update(() => ({ draft: defaultDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
