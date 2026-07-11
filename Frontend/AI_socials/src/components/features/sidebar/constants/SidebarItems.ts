import type { SidebarItem } from "../Sidebar.types";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "home",
    to:"/"
  },

  {
    id: "explore",
    label: "Explore",
    icon: "explore",
    to:"/explore"
  },

  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
    to:"/notifications"

  },

  {
    id: "chat",
    label: "Chat",
    icon: "chat",
    to:"/messages"

  },

  {
    id: "ai",
    label: "AI Video",
    icon: "ai",
    to:"*"

  },


  {
    id: "bookmarks",
    label: "Bookmarks",
    icon: "bookmarks",
    to:"/bookmarks"

  },

  {
    id: "profile",
    label: "Profile",
    icon: "profile",
    to:"/profile/:username"

  },

  {
    id: "more",
    label: "More",
    icon: "more",
    to:"/more"

  },
];