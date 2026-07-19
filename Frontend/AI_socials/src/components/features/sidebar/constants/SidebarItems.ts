import type { SidebarItem } from "../Sidebar.types";

// Change this from an array to a function that returns the array
export const getSidebarItems = (username?: string): SidebarItem[] => [
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
  {
    id: "profile",
    label: "Profile",
    icon: "profile",
    to: username ? `/profile/${username}` : "/login",
    requiresAuth: true,
  },
];