import { defineCollection, z } from 'astro:content';

const news = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        photoDescription: z.string().optional(),
        author: z.string().default('SITE Officer'),
        tags: z.array(z.string()).default([]),
    }),
});


const resources = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        category: z.enum(['Academic', 'Syllabus', 'Guide', 'Software']),
        description: z.string(),
        link: z.string(),
        icon: z.string().optional(), // Icon name or URL
    })
});

const events = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        time: z.string().optional(),
        location: z.string(),
        city: z.string().optional(),
        registrationLink: z.string().optional(),
        heroImage: z.string().optional(),
    })
});

const documents = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        date: z.coerce.date(),
        file: z.string(),
    })
});

export const collections = { news, resources, events, documents };
