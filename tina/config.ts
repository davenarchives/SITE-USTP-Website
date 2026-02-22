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
        tina: {
            mediaRoot: "",
            publicFolder: "public",
        },
    },

    schema: {
        collections: [
            {
                name: "news",
                label: "News",
                path: "src/content/news",
                format: "md",
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
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description",
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
                format: "json",
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
                        type: "string",
                        name: "link",
                        label: "Link",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "icon",
                        label: "Icon",
                    },
                ]
            },
            {
                name: "events",
                label: "Events",
                path: "src/content/events",
                format: "md",
                ui: {
                    filename: {
                        readonly: true,
                        slugify: (values) => {
                            return `${values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'new-event'}`;
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
                        name: "description",
                        label: "Short Description",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "registrationLink",
                        label: "Registration Link",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Event Details Body",
                        isBody: true,
                    },
                ]
            }
        ],
    },
});
