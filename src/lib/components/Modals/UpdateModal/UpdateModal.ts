export interface UpdateProfileFormResponse {
  data?: {
    name?: string;
    email?: string;
    username?: string;
    message?: string;
    success?: boolean;
  };
}
