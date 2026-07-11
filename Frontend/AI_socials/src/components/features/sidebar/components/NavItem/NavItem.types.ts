import type { IconName } from "../../../sidebar/components/Icons/Icon.types";

export interface NavItemProps {
  icon: IconName;
  label: string;
  to: string;
  collapsed: boolean;
}
