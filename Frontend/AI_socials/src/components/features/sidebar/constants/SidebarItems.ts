import type { SidebarItem } from "../Sidebar.types";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "home",
    to: "/",
    requiresAuth: false,
  },

  {
    id: "explore",
    label: "Explore",
    icon: "explore",
    to: "/explore",
    requiresAuth: false,
  },

  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
    to: "/notifications",
    requiresAuth: true,
  },

  {
    id: "chat",
    label: "Chat",
    icon: "chat",
    to: "/messages",
    requiresAuth: true,
  },

  // {
  //   id: "bookmarks",
  //   label: "Bookmarks",
  //   icon: "bookmarks",
  //   to:"/bookmarks",
  // requiresAuth:true

  // },

  {
    id: "profile",
    label: "Profile",
    icon: "profile",
    to: "/profile/:username",
    requiresAuth: true,
  },

  // {
  //   id: "more",
  //   label: "More",
  //   icon: "more",
  //   to:"/more"

  // },
];
