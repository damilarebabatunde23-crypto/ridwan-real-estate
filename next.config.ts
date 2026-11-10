import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_ACTIONS === "1";
let basePath = "";
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "ridwan-real-estate";
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
