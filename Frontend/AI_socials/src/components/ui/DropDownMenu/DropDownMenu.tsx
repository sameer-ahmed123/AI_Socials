import { useEffect, useRef, useState } from "react";

import "./DropDownMenu.css";

import type { DropdownMenuItem, DropdownMenuProps } from "./DropDownMenu.types";

const DropdownMenu = ({
  trigger,
  items,
  className = "",
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return;

    item.onClick();

    closeMenu();
  };

  return (
    <div className={`dropdown-menu ${className}`} ref={menuRef}>
      <button
        type="button"
        className="dropdown-menu__trigger"
        onClick={toggleMenu}
        aria-expanded={open}
      >
        {trigger}
      </button>

      {open && (
        <div className="dropdown-menu__content">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`
                dropdown-menu__item
                ${item.danger ? "dropdown-menu__item--danger" : ""}
                ${item.disabled ? "dropdown-menu__item--disabled" : ""}
              `}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className="dropdown-menu__icon">{item.icon}</span>
              )}

              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
