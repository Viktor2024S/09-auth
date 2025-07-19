"use client";

import formStyles from "./NoteForm.module.css";
import { useId } from "react";
import { createNote } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const NoteForm = () => {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(draft);
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <div className={formStyles.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={formStyles.input}
          required
          value={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={formStyles.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={formStyles.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={formStyles.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={formStyles.select}
          value={draft.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
          <option value="Ideas">Ideas</option>
          <option value="Travel">Travel</option>
          <option value="Finance">Finance</option>
          <option value="Health">Health</option>
          <option value="Important">Important</option>
        </select>
      </div>

      <div className={formStyles.actions}>
        <button
          type="button"
          className={formStyles.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
