import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/blog" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.string(),
        description: z.string(),
        author: z.string(),
        tags: z.array(z.string()),
    }),
});

export const collections = { blog };
