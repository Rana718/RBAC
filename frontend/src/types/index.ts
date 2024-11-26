export interface MenuItems {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
  description: string;
}
