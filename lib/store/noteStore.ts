import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteData } from "@/types/note";

const initialDraft: NoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteState {
  draft: NoteData;
  setDraft: (field: keyof NoteData, value: string) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (field, value) =>
        set((state) => ({
          draft: { ...state.draft, [field]: value },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);
