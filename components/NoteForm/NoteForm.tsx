"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { NoteData } from "@/types/note";
import { createNoteAction } from "@/lib/actions";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  initialData?: NoteData;
  isEdit?: boolean;
}

export default function NoteForm({
  initialData = { title: "", content: "", tag: "Todo" },
  isEdit = false,
}: NoteFormProps) {
  const [formData, setFormData] = useState<NoteData>(initialData);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNoteAction,
    onMutate: () => {
      toast.loading("Creating note...");
    },
    onSuccess: (result) => {
      toast.dismiss();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Note created successfully! Redirecting...");
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        router.push("/notes");
      }
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Failed to create note: ${error.message}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={css.input}
        />
      </label>
      <label className={css.label}>
        Content:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className={css.textarea}
        />
      </label>
      <label className={css.label}>
        Tag:
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.input}
        />
      </label>
      <button
        type="submit"
        disabled={mutation.isPending}
        className={css.button}
      >
        {mutation.isPending
          ? "Saving..."
          : isEdit
            ? "Update Note"
            : "Create Note"}
      </button>
    </form>
  );
}
