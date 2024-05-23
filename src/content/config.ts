import { z, defineCollection } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    time: z.string(),
    description: z.string(),
    client: z.string(),
    role: z.string(),
    cover: z.string(),
    logo: z.string(),
  }),
});

export const collections = {
  projects: projects,
};
