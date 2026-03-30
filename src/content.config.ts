import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const katas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/katas' }),
  schema: z.object({
    feeling: z.string(),
    description: z.string(),
    order: z.number().optional(),
    related: z.array(z.string()).optional(),
    stub: z.boolean().optional(),
    toolSteps: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  }),
});

export const collections = { katas };
