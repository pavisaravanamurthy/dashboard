export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface Profile extends Omit<User, 'token'> {
  gender: string;
  image: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  tags: string[];
  meta: {
    updatedAt: string;
  };
}

export interface ProductBoard {
  totalProducts: number;
  totalCategories: number;
  averagePrice: number;
  topRatedProducts: Product[];
}

export interface BoardItem {
  id: number;
  todo: string;
  completed: boolean;
  inProgress?: boolean;
  userId: number;
}

export const COLUMN_KEYS = ["pending", "inProgress", "completed"] as const;
export type ColumnKey = typeof COLUMN_KEYS[number];

export const COLUMN_TITLES: Record<ColumnKey, string> = {
  pending: "Pending",
  inProgress: "In Progress",
  completed: "Completed",
} as const;

export const COLUMN_COLORS: Record<ColumnKey, string> = {
  pending: "bg-yellow-50",
  inProgress: "bg-blue-50",
  completed: "bg-green-50",
} as const;
