import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNote } from "../../types/note";

type PendingNoteState = {
  currentDraft: NewNote;
  updateDraft: (newContent: NewNote) => void;
  resetDraft: () => void;
};

const defaultNoteContent: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteFormStore = create<PendingNoteState>()(
  persist(
    (setState) => ({
      currentDraft: defaultNoteContent,
      updateDraft: (newContent) =>
        setState(() => ({ currentDraft: newContent })),
      resetDraft: () => setState(() => ({ currentDraft: defaultNoteContent })),
    }),
    {
      name: "draft-note-storage",
      partialize: (storeState) => ({ currentDraft: storeState.currentDraft }),
    }
  )
);
