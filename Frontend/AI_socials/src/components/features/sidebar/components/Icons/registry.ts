import type { IconName } from "./Icon.types";

import {
  HomeIcon,
  ExploreIcon,
  NotificationIcon,
  ChatIcon,
  AIIcon,
  BookmarkIcon,
  ProfileIcon,
  MoreIcon,
} from ".";

export const ICONS: Record<IconName, React.ComponentType<any>> = {
  home: HomeIcon,
  explore: ExploreIcon,
  notifications: NotificationIcon,
  chat: ChatIcon,
  ai: AIIcon,
  bookmarks: BookmarkIcon,
  profile: ProfileIcon,
  more: MoreIcon,
};
