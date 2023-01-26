export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export const enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}
