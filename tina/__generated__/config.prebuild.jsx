// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: false ? "main" : "dev",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  media: {
    tina: {
      publicFolder: "static",
      mediaRoot: "uploads"
    }
  },
  build: {
    outputFolder: "admin",
    publicFolder: "static"
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
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
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
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
            required: true
          },
          {
            type: "string",
            name: "technologies",
            label: "Technologies",
            list: true
          },
          {
            type: "string",
            name: "githubUrl",
            label: "GitHub URL"
          },
          {
            type: "string",
            name: "liveUrl",
            label: "Live URL"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
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
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true
          },
          {
            type: "number",
            name: "proficiency",
            label: "Proficiency (0-100)",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icon"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
