import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().trim().max(200, "Title cannot exceed 200 characters").optional(),
    content: z.string({ message: "Content is required" }).trim().min(1, "Content is required").max(2000, "Content cannot exceed 2000 characters"),
    image: z.string().trim().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z
    .object({
      title: z.string().trim().max(200, "Title cannot exceed 200 characters").optional(),
      content: z.string().trim().min(1, "Content cannot be empty").max(2000, "Content cannot exceed 2000 characters").optional(),
      image: z.string().trim().optional(),
    })
    .refine(
      (data) => data.title !== undefined || data.content !== undefined || data.image !== undefined,
      { message: "At least one field (title, content, or image) is required to update" }
    ),
});
