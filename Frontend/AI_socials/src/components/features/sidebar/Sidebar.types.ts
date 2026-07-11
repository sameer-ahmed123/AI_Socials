import type { IconName } from "../../features/sidebar/components/Icons/Icon.types";

export interface SidebarItem {
  id: string;

  label: string;

  icon: IconName;
  to: string;
}
