import { Bookmark, Copy, Flag, MoreHorizontal, EyeOff } from "lucide-react";

import DropDownMenu from "../../../../../../ui/DropDownMenu";

import type { DropdownMenuItem } from "../../../../../../ui/DropDownMenu/DropDownMenu.types";
import type { PostMenuProps } from "./PostMenu.types";

const PostMenu = ({ postId }: PostMenuProps) => {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/posts/${postId}`,
      );

      console.log("Link copied!");
    } catch {
      console.error("Failed to copy link.");
    }
  };

  const items: DropdownMenuItem[] = [
    {
      id: "copy",
      label: "Copy Link",
      icon: <Copy size={16} />,
      onClick: copyLink,
    },
    {
      id: "bookmark",
      label: "Bookmark",
      icon: <Bookmark size={16} />,
      onClick: () => console.log("Bookmark"),
    },
    {
      id: "hide",
      label: "Hide Post",
      icon: <EyeOff size={16} />,
      onClick: () => console.log("Hide"),
    },
    {
      id: "report",
      label: "Report",
      icon: <Flag size={16} />,
      danger: true,
      onClick: () => console.log("Report"),
    },
  ];

  return <DropDownMenu trigger={<MoreHorizontal size={18} />} items={items} />;
};

export default PostMenu;
