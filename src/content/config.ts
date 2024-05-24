import { z, defineCollection } from "astro:content";

const project = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    time: z.string(),
    description: z.string(),
    cover: z.string(),
  }),
});

export const collections = {
  project,
};
