import type { IconName } from "../../../sidebar/components/Icons/Icon.types";

export interface NavItemProps {
  label: string;

  icon: IconName;

  active?: boolean;
}