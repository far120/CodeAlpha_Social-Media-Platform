import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    content: z
      .string({ message: "Content is required" })
      .trim()
      .min(1, "Comment content cannot be empty")
      .max(1000, "Comment cannot exceed 1000 characters"),
  }),
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: z
      .string({ message: "Content is required" })
      .trim()
      .min(1, "Comment content cannot be empty")
      .max(1000, "Comment cannot exceed 1000 characters"),
  }),
});
