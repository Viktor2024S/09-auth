"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod"; // <-- REMOVE THIS LINE
import toast from "react-hot-toast";
import type { NoteData } from "@/types/note";
import { noteSchema } from "@/types/note";
import { createNoteAction } from "@/app/actions";
import css from "./NoteForm.module.css";

export const NoteForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteData>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (data: NoteData) => {
    try {
      await createNoteAction(data);
      toast.success("Note created successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to create note.");
      console.error("Note creation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title")} className={css.input} />
        {errors.title && <p className={css.error}>{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          {...register("content")}
          className={css.textarea}
        />
        {errors.content && (
          <p className={css.error}>{errors.content.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="tag">Tag</label>
        <select id="tag" {...register("tag")} className={css.select}>
          <option value="">Select a tag</option>
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
        {errors.tag && <p className={css.error}>{errors.tag.message}</p>}
      </div>
      <button type="submit" className={css.button}>
        Create Note
      </button>
    </form>
  );
};
