"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useNoteStore } from "@/lib/store/noteStore";
import { createNoteAction } from "@/lib/actions";
import { NoteData, Tag } from "@/types/note";
import css from "./NoteForm.module.css";

const noteTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const createNoteMutation = useMutation({
    mutationFn: createNoteAction,
    onSuccess: (result) => {
      toast.dismiss();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Note created successfully! Redirecting...");
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }
    },
    onError: (error: Error) => {
      toast.dismiss();
      if (error.message === "NEXT_REDIRECT") {
        return;
      }
      toast.error(error.message || "Failed to create note.");
    },
  });

  const handleFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft(e.target.name as keyof NoteData, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNoteMutation.mutate(draft);
  };

  const { isPending } = createNoteMutation;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={draft.title}
          onChange={handleFieldChange}
          className={css.input}
          required
          disabled={isPending}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleFieldChange}
          className={css.textarea}
          disabled={isPending}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleFieldChange}
          className={css.select}
          disabled={isPending}
        >
          {noteTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
