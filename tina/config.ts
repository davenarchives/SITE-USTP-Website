import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
    branch,
    clientId: process.env.PUBLIC_TINA_CLIENT_ID || null,
    token: process.env.TINA_TOKEN || null,

    build: {
        outputFolder: "tina",
        publicFolder: "public",
    },
    media: {
        loadCustomStore: async () => {
            const pack = await import("next-tinacms-cloudinary");
            return pack.TinaCloudCloudinaryMediaStore;
        },
    },

    schema: {
        collections: [
            {
                name: "news",
                label: "News",
                path: "src/content/news",
                format: "md",
                defaultItem: () => {
                    return {
                        pubDate: new Date().toISOString(),
                    }
                },
                ui: {
                    filename: {
                        readonly: true,
                        slugify: (values) => {
                            return `${values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'new-post'}`;
                        },
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Header",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Sub Header",
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "pubDate",
                        label: "Publication Date",
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "updatedDate",
                        label: "Updated Date",
                    },
                    {
                        type: "image",
                        name: "heroImage",
                        label: "Hero Image",
                    },
                    {
                        type: "string",
                        name: "photoDescription",
                        label: "Photo Description",
                    },
                    {
                        type: "string",
                        name: "author",
                        label: "Author",
                    },
                    {
                        type: "string",
                        list: true,
                        name: "tags",
                        label: "Tags",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                    },
                ],
            },

            {
                name: "resources",
                label: "Resources",
                path: "src/content/resources",
                format: "md",
                defaultItem: () => {
                    return {
                        date: new Date().toISOString(),
                    }
                },
                ui: {
                    filename: {
                        readonly: true,
                        slugify: (values) => {
                            return `${values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'new-resource'}`;
                        },
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "category",
                        label: "Category",
                        options: ['Academic', 'Syllabus', 'Guide', 'Software'],
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "heroImage",
                        label: "Hero Image",
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Date",
                    },
                    {
                        type: "object",
                        list: true,
                        name: "embeds",
                        label: "Embeds (Sections)",
                        ui: {
                            itemProps: (item) => {
                                return { label: item?.title || 'New Embed' }
                            }
                        },
                        fields: [
                            {
                                type: "string",
                                name: "title",
                                label: "Title",
                                required: true,
                            },
                            {
                                type: "string",
                                name: "description",
                                label: "Description",
                                ui: {
                                    component: "textarea"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: "events",
                label: "Events",
                path: "src/content/events",
                format: "md",
                defaultItem: () => {
                    return {
                        date: new Date().toISOString(),
                    }
                },
                ui: {
                    filename: {
                        readonly: true,
                        slugify: (values) => {
                            const dateStr = values?.date ? new Date(values.date).toISOString().split('T')[0] : 'undated';
                            const titleStr = values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'new-event';
                            return `${dateStr}-${titleStr}`;
                        },
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Date Payload (Start Time)",
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "endDate",
                        label: "End Date/Time",
                    },
                    {
                        type: "string",
                        name: "time",
                        label: "Time String (e.g. '1:00 PM - 5:00 PM')",
                    },
                    {
                        type: "string",
                        name: "location",
                        label: "Location",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "city",
                        label: "City / Region",
                        required: true,
                        ui: {
                            defaultValue: "Cagayan de Oro City",
                        }
                    },

                    {
                        type: "string",
                        name: "registrationLink",
                        label: "Registration Link",
                    },
                    {
                        type: "image",
                        name: "heroImage",
                        label: "Event Poster Subtitle/Image",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Event Details Body",
                        isBody: true,
                    },
                ]
            },
            {
                name: "documents",
                label: "Documents",
                path: "src/content/documents",
                format: "json",
                defaultItem: () => {
                    return {
                        date: new Date().toISOString(),
                    }
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description/Subtitle",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "category",
                        label: "Category",
                        required: true,
                    },

                    {
                        type: "datetime",
                        name: "date",
                        label: "Document Date",
                        required: true,
                    },
                    {
                        type: "image",
                        name: "file",
                        label: "Upload Document",
                        required: true,
                    },
                ]
            }
        ],
    },
});
