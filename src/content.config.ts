import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const katas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/katas' }),
  schema: z.object({
    feeling: z.string(), // kata title: can be a feeling, question, or topic
    takeaway: z.string().optional(),
    description: z.string().optional(),
    related: z.array(z.string()).nullable().optional(),
    tags: z.array(z.string()).optional(),
    stub: z.boolean().optional(),
    lastUpdated: z.string().optional(),
    status: z.enum(['draft', 'review', 'done']).optional(),
  }),
});

export const collections = { katas };
