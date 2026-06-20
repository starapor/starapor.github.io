import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://sarahtaraporewalla.com/",
    title: "Sarah Taraporewalla",
    description:
      "Building strategic options through technology, engineering, and organisational design.",
    author: "Sarah Taraporewalla",
    profile: "https://www.linkedin.com/in/sarahtaraporewalla/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Australia/Brisbane",
    dir: "ltr",
  },
  posts: {
    perPage: 5,
    perIndex: 5,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/starapor" },
    { name: "x", url: "https://x.com/sarahtarap" },
    { name: "linkedin", url: "https://www.linkedin.com/in/sarahtaraporewalla/" },
    { name: "mail", url: "mailto:me@sarahtaraporewalla.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
