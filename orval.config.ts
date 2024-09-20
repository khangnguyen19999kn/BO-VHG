import { defineConfig } from "orval";

export default defineConfig({
  vhg: {
    output: {
      mode: "tags-split",
      target: "./src/api/endpoints",
      schemas: "./src/api/model",
      client: "react-query",
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        paramsSerializerOptions: {
          qs: { arrayFormat: "none" },
        },
      },
      urlEncodeParameters: true,
    },
    input: {
      target: "http://localhost:6969/api/document.json",
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});

