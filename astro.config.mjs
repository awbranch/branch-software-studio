import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  integrations: [tailwind(), mdx(), react()],
});
