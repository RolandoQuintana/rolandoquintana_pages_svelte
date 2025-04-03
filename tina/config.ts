import { defineConfig } from "tinacms";

const isProduction = process.env.NODE_ENV === 'production';
const branch = isProduction ? 'main' : 'dev';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  media: {
    tina: {
      publicFolder: "static",
      mediaRoot: "uploads"
    }
  },

  build: {
    outputFolder: "static/admin",
    publicFolder: "static",
    basePath: isProduction ? "/rolandoquintana_pages_svelte" : ""
  },

  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "project",
        label: "Projects",
        path: "src/content/projects",
        format: "md",
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
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
            required: false,
          },
          {
            type: "string",
            name: "technologies",
            label: "Technologies",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "githubUrl",
            label: "GitHub URL",
            required: false,
          },
          {
            type: "string",
            name: "liveUrl",
            label: "Live URL",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: false,
          },
        ],
      },
      {
        name: "skill",
        label: "Skills",
        path: "src/content/skills",
        format: "md",
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
            required: true,
          },
          {
            type: "number",
            name: "proficiency",
            label: "Proficiency (0-100)",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon",
          },
        ],
      },
    ],
  },
});