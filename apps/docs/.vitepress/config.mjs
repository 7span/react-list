import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "ReactList",
  description:
    "Simplified API-based list rendering. Build listing layouts faster by abstracting away the boilerplate of API calls, pagination, and state management.",
  base: "/open-source/react-list/",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Why React List?", link: "/introduction/why-react-list" },
          {
            text: "Getting Started",
            link: "/introduction/getting-started",
          },
        ],
      },
      {
        text: "Configuration",
        items: [
          { text: "Options", link: "/configuration/options" },
          { text: "Request Handler", link: "/configuration/request-handler" },
          { text: "State Manager", link: "/configuration/state-manager" },
          { text: "Context Object", link: "/configuration/context-object" },
        ],
      },
      {
        text: "Components",
        items: [
          {
            text: "Introduction",
            link: "/components/intro",
          },
          { text: "ReactList", link: "/components/react-list" },
          { text: "ReactListItems", link: "/components/items" },
          { text: "ReactListPagination", link: "/components/pagination" },
          { text: "ReactListLoadMore", link: "/components/load-more" },
          {
            text: "ReactListInitialLoader",
            link: "/components/initial-loader",
          },
          { text: "ReactListLoader", link: "/components/loader" },
          { text: "ReactListSummary", link: "/components/summary" },
          { text: "ReactListGoTo", link: "/components/go-to" },
          { text: "ReactListPerPage", link: "/components/per-page" },
          { text: "ReactListSearch", link: "/components/search" },
          { text: "ReactListEmpty", link: "/components/empty" },
          { text: "ReactListError", link: "/components/error" },
          { text: "ReactListRefresh", link: "/components/refresh" },
          { text: "ReactListAttributes", link: "/components/attributes" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/7span/react-list" },
    ],
  },
});
