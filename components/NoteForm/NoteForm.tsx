"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNoteAction } from "@/lib/actions";
import { NoteData, Tag } from "@/types/note";
import css from "./NoteForm.module.css";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormStatus } from "react-dom";

const noteTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: async (noteData: NoteData) => {
      return createNoteAction(noteData);
    },
    onMutate: () => {
      toast.loading("Creating note...");
    },
    onSuccess: (result) => {
      toast.dismiss();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Note created successfully!");
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        router.back();
      }
    },
    onError: (error: Error) => {
      toast.dismiss();
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

  const formAction = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as Tag;

    createNoteMutation.mutate({ title, content, tag });
  };

  const { pending } = useFormStatus();

  return (
    <form className={css.form} action={formAction}>
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
          disabled={pending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={pending}>
          {pending ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
