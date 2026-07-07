export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];

  activeTab: string;

  onChange: (id: string) => void;

  fullWidth?: boolean;
}