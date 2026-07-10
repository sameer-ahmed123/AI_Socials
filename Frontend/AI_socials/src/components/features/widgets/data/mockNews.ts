import type { NewsArticle } from "../models";

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "1",

    headline: "Local Design Meetup Announces Spring Workshop Schedule",

    source: "News",

    publishedAt: "15 hours ago",

    posts: "486 Posts",

    dotColors: ["#ffc9c9", "#b8d8ff", "#c8f7c5"],
  },

  {
    id: "2",

    headline: "New CSS Demo Shows Hand-Drawn Borders with Custom Properties",

    source: "Web",

    publishedAt: "23 hours ago",

    posts: "9,947 Posts",

    dotColors: ["#ffd9a8", "#b8d8ff", "#c8f7c5"],
  },

  {
    id: "3",

    headline: "Sketchy UI Trend Brings Notebook Energy to Dashboards",

    source: "Design",

    publishedAt: "Trending now",

    posts: "148 Posts",

    dotColors: ["#ffd9a8", "#b8d8ff", "#ffc9c9"],
  },
];
